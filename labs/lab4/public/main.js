// main.js
// Front-end logic for Recipe Buddy
// Uses TheMealDB API directly on the client (to load categories)
// and talks to our Node back-end (which also uses TheMealDB).

// ------------- DOM Elements -------------

const formEl = document.getElementById("recipe-form");
const ingredientsInput = document.getElementById("ingredients-input");
const dietSelect = document.getElementById("diet-select");
const formErrorEl = document.getElementById("form-error");

const resultsSection = document.getElementById("results-section");
const resultsListEl = document.getElementById("results-list");
const resultsCountEl = document.getElementById("results-count");
const loadingMessageEl = document.getElementById("loading-message");
const globalErrorEl = document.getElementById("global-error");

const detailsSection = document.getElementById("details-section");
const detailsContentEl = document.getElementById("details-content");

// ------------- Helper Functions -------------

/**
 * Basic client-side sanitization for ingredients.
 */
function sanitizeIngredientsInput(raw) {
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .join(", ");
}

/**
 * Create DOM element with classes & text.
 */
function createEl(tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text) el.textContent = text;
  return el;
}

/**
 * Render a list of recipe cards.
 */
function renderResults(results) {
  resultsListEl.innerHTML = "";

  results.forEach((meal) => {
    const card = createEl("article", "result-card");
    card.setAttribute("role", "listitem");

    if (meal.strMealThumb) {
      const img = document.createElement("img");
      img.src = meal.strMealThumb;
      img.alt = `Dish: ${meal.strMeal}`;
      card.appendChild(img);
    }

    const body = createEl("div", "result-card-body");
    const title = createEl("h3", "result-title", meal.strMeal);
    body.appendChild(title);

    const actions = createEl("div", "result-actions");
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = "View details";
    btn.setAttribute("aria-label", `View details for ${meal.strMeal}`);
    btn.addEventListener("click", () => loadMealDetails(meal.idMeal));

    actions.appendChild(btn);
    body.appendChild(actions);
    card.appendChild(body);

    resultsListEl.appendChild(card);
  });
}

/**
 * Render details panel for a single meal.
 */
function renderMealDetails(meal) {
  detailsContentEl.innerHTML = "";

  const layout = createEl("div", "details-layout");

  const left = document.createElement("div");
  if (meal.strMealThumb) {
    const img = document.createElement("img");
    img.src = meal.strMealThumb;
    img.alt = `Photo of ${meal.strMeal}`;
    left.appendChild(img);
  }

  const right = document.createElement("div");
  const title = createEl("h3", "details-title", meal.strMeal);
  const meta = createEl(
    "p",
    "details-meta",
    [
      meal.strCategory ? `Category: ${meal.strCategory}` : "",
      meal.strArea ? `Area: ${meal.strArea}` : ""
    ]
      .filter(Boolean)
      .join(" · ") || "No extra metadata"
  );

  const ingredientsTitle = createEl(
    "p",
    "details-section-title",
    "Ingredients:"
  );
  const ingredientsList = document.createElement("ul");

  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ing && ing.trim() !== "") {
      const li = document.createElement("li");
      li.textContent = `${ing}${measure ? ` – ${measure}` : ""}`;
      ingredientsList.appendChild(li);
    }
  }

  const instructionsTitle = createEl(
    "p",
    "details-section-title",
    "Instructions:"
  );
  const instructions = createEl("p", null, meal.strInstructions || "N/A");

  right.appendChild(title);
  right.appendChild(meta);
  right.appendChild(ingredientsTitle);
  right.appendChild(ingredientsList);
  right.appendChild(instructionsTitle);
  right.appendChild(instructions);

  layout.appendChild(left);
  layout.appendChild(right);
  detailsContentEl.appendChild(layout);
}

/**
 * Set loading / error messages.
 */
function setLoading(isLoading, message = "") {
  loadingMessageEl.textContent = isLoading ? message : "";
}

function setGlobalError(message) {
  globalErrorEl.textContent = message || "";
}

/**
 * Client-side API usage: load TheMealDB categories directly.
 * This satisfies the "use API on client-side" part.
 */
async function loadCategoriesClientSide() {
  try {
    const url = "https://www.themealdb.com/api/json/v1/1/list.php?c=list";
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`Status ${resp.status}`);
    const data = await resp.json();
    const categories = data.meals || [];

    categories.forEach((cat) => {
      const opt = document.createElement("option");
      opt.value = cat.strCategory;
      opt.textContent = cat.strCategory;
      dietSelect.appendChild(opt);
    });
  } catch (err) {
    console.error("Failed to load categories (client-side API call):", err);
    // Fallback: no categories besides "Any"
  }
}

/**
 * Load recipes via our Node backend.
 */
async function loadRecipes(formData) {
  const ingredientsRaw = formData.get("ingredients") || "";
  const diet = formData.get("diet") || "any";

  const sanitizedIngredients = sanitizeIngredientsInput(ingredientsRaw);
  if (!sanitizedIngredients) {
    formErrorEl.textContent = "Please enter at least one ingredient.";
    return;
  }

  formErrorEl.textContent = "";
  setGlobalError("");
  setLoading(true, "Searching for recipes...");

  const params = new URLSearchParams({
    ingredients: sanitizedIngredients,
    diet
  });

  try {
    const resp = await fetch(`/api/recipes?${params.toString()}`);
    const data = await resp.json();

    if (!resp.ok) {
      setGlobalError(data.error || "Something went wrong.");
      resultsListEl.innerHTML = "";
      resultsCountEl.textContent = "";
      setLoading(false);
      return;
    }

    resultsCountEl.textContent = `${data.count} recipe(s) found`;
    renderResults(data.results);
  } catch (err) {
    console.error("Error fetching recipes:", err);
    setGlobalError("Network error while fetching recipes.");
    resultsListEl.innerHTML = "";
    resultsCountEl.textContent = "";
  } finally {
    setLoading(false);
  }
}

/**
 * Load full meal details from our backend.
 */
async function loadMealDetails(mealId) {
  setLoading(true, "Loading recipe details...");
  setGlobalError("");

  try {
    const resp = await fetch(`/api/meal/${mealId}`);
    const data = await resp.json();
    if (!resp.ok) {
      setGlobalError(data.error || "Error loading meal details.");
      detailsContentEl.textContent = "";
      setLoading(false);
      return;
    }
    renderMealDetails(data.meal);
    detailsSection.scrollIntoView({ behavior: "smooth", block: "start" });
  } catch (err) {
    console.error("Error fetching meal details:", err);
    setGlobalError("Network error while loading recipe details.");
  } finally {
    setLoading(false);
  }
}

// ------------- Event Listeners -------------

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(formEl);
  loadRecipes(formData);
});

// ------------- Init -------------

document.addEventListener("DOMContentLoaded", () => {
  loadCategoriesClientSide(); // Client-side API usage (TheMealDB)
});

// Export helper for simple client unit tests (Node-based)
if (typeof module !== "undefined") {
  module.exports = {
    sanitizeIngredientsInput
  };
}
