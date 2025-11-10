// tests/client.test.js
// Node-based test importing the helper from main.js

const { sanitizeIngredientsInput } = require("../public/main");

function assertEqual(actual, expected, message) {
  const pass = actual === expected;
  if (pass) {
    console.log(`✅ ${message}`);
  } else {
    console.error(
      `❌ ${message}\n  Expected: "${expected}"\n  Got:      "${actual}"`
    );
  }
}

function runTests() {
  console.log("Running client-side unit tests...");

  assertEqual(
    sanitizeIngredientsInput(" chicken ,  rice,  , tomato "),
    "chicken, rice, tomato",
    "sanitizeIngredientsInput should trim and remove empty items"
  );

  assertEqual(
    sanitizeIngredientsInput("  "),
    "",
    "sanitizeIngredientsInput should return empty string for only spaces"
  );
}

runTests();
