// tests/server.test.js
// Minimal Node-based test for server helper functions

const { intersectMeals } = require("../server");

function assertEqual(actual, expected, message) {
  const pass = JSON.stringify(actual) === JSON.stringify(expected);
  if (pass) {
    console.log(`✅ ${message}`);
  } else {
    console.error(
      `❌ ${message}\n  Expected: ${JSON.stringify(
        expected
      )}\n  Got:      ${JSON.stringify(actual)}`
    );
  }
}

function runTests() {
  console.log("Running server-side unit tests...");

  const listA = [
    { idMeal: "1", strMeal: "A" },
    { idMeal: "2", strMeal: "B" },
    { idMeal: "3", strMeal: "C" }
  ];
  const listB = [
    { idMeal: "2", strMeal: "B" },
    { idMeal: "3", strMeal: "C" },
    { idMeal: "4", strMeal: "D" }
  ];

  const result = intersectMeals(listA, listB);
  const expected = [
    { idMeal: "2", strMeal: "B" },
    { idMeal: "3", strMeal: "C" }
  ];

  assertEqual(result, expected, "intersectMeals should return overlapping meals by idMeal");
}

runTests();
