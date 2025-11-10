// server.js
// CSCI 3172 - Lab 4 Recipe Recommender
// Node.js back-end using TheMealDB API (server-side API usage)

const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Helper: simple logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// ---------------------
// TheMealDB Helper Functions (Server-Side API Calls)
// ---------------------

/**
 * Fetch JSON from a given URL with basic error handling.
 */
async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`API responded with status ${response.status}`);
  }
  return response.json();
}

/**
 * Fetch recipes filtered by main ingredient using TheMealDB.
 */
async function fetchByIngredient(ingredient) {
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(
    ingredient
  )}`;
  const data = await fetchJson(url);
  return data.meals || [];
}

/**
 * Fetch recipes filtered by category (e.g., Vegetarian, Vegan).
 */
async function fetchByCategory(category) {
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(
    category
  )}`;
  const data = await fetchJson(url);
  return data.meals || [];
}

/**
 * Simple intersection of two arrays of meals based on idMeal.
 */
function intersectMeals(listA, listB) {
  const idsB = new Set(listB.map((meal) => meal.idMeal));
  return listA.filter((meal) => idsB.has(meal.idMeal));
}

// ---------------------
// API Routes
// ---------------------

// GET /api/recipes?ingredients=chicken,tomato&diet=Vegetarian
app.get("/api/recipes", async (req, res) => {
  try {
    const ingredientsRaw = (req.query.ingredients || "").trim();
    const dietRaw = (req.query.diet || "").trim();

    if (!ingredientsRaw) {
      return res.status(400).json({
        error: "Missing required query parameter: ingredients"
      });
    }

    const ingredients = ingredientsRaw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const mainIngredient = ingredients[0];

    let mealsByIngredient = await fetchByIngredient(mainIngredient);

    let finalMeals = mealsByIngredient;

    if (dietRaw && dietRaw.toLowerCase() !== "any") {
      const mealsByCategory = await fetchByCategory(dietRaw);
      finalMeals = intersectMeals(mealsByIngredient, mealsByCategory);
    }

    if (!finalMeals || finalMeals.length === 0) {
      return res.status(404).json({
        error: "No recipes found for the given input.",
        suggestions: [
          "Try a more common ingredient (e.g., chicken, beef, rice).",
          "Try changing or removing the dietary restriction."
        ]
      });
    }

    // Limit to first 10 results to keep UI simple
    finalMeals = finalMeals.slice(0, 10);

    res.json({
      ingredients: ingredients,
      diet: dietRaw || "any",
      count: finalMeals.length,
      results: finalMeals
    });
  } catch (err) {
    console.error("Error in /api/recipes:", err);
    res.status(500).json({
      error: "Server error while fetching recipes.",
      details: err.message
    });
  }
});

// GET /api/meal/:id - get full details for one meal
app.get("/api/meal/:id", async (req, res) => {
  try {
    const mealId = req.params.id;
    if (!mealId) {
      return res.status(400).json({ error: "Missing meal ID" });
    }

    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${encodeURIComponent(
      mealId
    )}`;
    const data = await fetchJson(url);

    if (!data.meals || data.meals.length === 0) {
      return res.status(404).json({ error: "Meal not found" });
    }

    res.json({ meal: data.meals[0] });
  } catch (err) {
    console.error("Error in /api/meal/:id:", err);
    res.status(500).json({
      error: "Server error while fetching meal details.",
      details: err.message
    });
  }
});

// Simple health check for tests
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: Date.now() });
});

// 404 for unknown API routes
app.use("/api", (req, res) => {
  res.status(404).json({ error: "API route not found" });
});

// Fallback: send index.html for any other route (for SPA-style)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

module.exports = {
  intersectMeals // exported for server-side unit tests
};
