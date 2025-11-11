Lab 4 – Recipe Buddy

This lab implements a simple recipe recommendation web application. Users can enter ingredients they have on hand and optionally choose a dietary preference to receive recipe suggestions. The app fetches data from TheMealDB API to display meals that match the selected filters.

* Date Created: 10 Nov 2025
* Last Modification Date: 11 Nov 2025
* Lab URL: https://recipebuddyap.netlify.app

## Authors

* Sidhantdeep Singh (sidhantdeepsingh@dal.ca) – Developer

## Built With

* Node.js – Backend runtime environment used to run the Express server
* Express.js – Backend framework used for API routing and serving static files
* TheMealDB API – Used to fetch recipe data dynamically
* HTML5 – Frontend markup
* CSS3 – Styling and layout
* JavaScript (ES6) – Frontend logic for API integration and DOM manipulation
* Netlify – Used for static site hosting and deployment

## Sources Used

### server.js

Lines 15 – 30

app.get('/api/recipes', async (req, res) => {
  const ingredients = req.query.ingredients;
  const diet = req.query.diet;

  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});

The above code adapts the example structure from TheMealDB API documentation, demonstrating how to filter recipes by ingredients.

- How: Implemented as a GET route in Express to proxy API requests and handle network errors gracefully.
- Why: Used to manage API calls server-side to avoid exposing API URLs directly in the frontend and to handle CORS issues.
- How (modified): Adjusted to accept both ingredients and diet query parameters and return JSON responses compatible with the frontend UI.

### main.js

Lines 10 – 35

document.getElementById('find-recipes').addEventListener('click', async () => {
  const ingredients = document.getElementById('ingredients').value.trim();
  const diet = document.getElementById('diet').value;

  if (!ingredients) {
    alert('Please enter at least one ingredient.');
    return;
  }

  try {
    const response = await fetch(`/api/recipes?ingredients=${encodeURIComponent(ingredients)}&diet=${encodeURIComponent(diet)}`);
    const data = await response.json();
    displayResults(data);
  } catch (error) {
    document.getElementById('results').innerText = 'Network error while fetching recipes.';
  }
});

This frontend code follows a typical asynchronous fetch pattern described in MDN Web Docs.

- How: Implemented a click event listener to trigger API calls dynamically when the “Find Recipes” button is pressed.
- Why: Used to asynchronously fetch and render recipes without reloading the page.
- How (modified): Added validation and customized UI feedback to match the project’s layout and visual design.

## Acknowledgments

* TheMealDB for providing a free and reliable meal database API.
* Dalhousie University – CSCI 3172 (Web-Centric Computing) for project framework and lab structure.
* Netlify for simplified static deployment and hosting tools.
