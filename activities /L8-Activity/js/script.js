// Simple DOM demo: set a friendly greeting
document.addEventListener("DOMContentLoaded", () => {
  const greeting = document.getElementById("greeting");
  if (greeting) {
    const hours = new Date().getHours();
    const msg =
      hours < 12 ? "Good morning!" :
      hours < 18 ? "Good afternoon!" : "Good evening!";
    greeting.textContent = msg + " Welcome to the calculator demo.";
  }

  // Wire up calculator buttons
  const form = document.getElementById("calcForm");
  const n1 = document.getElementById("number1");
  const n2 = document.getElementById("number2");
  const resultEl = document.getElementById("result");

  // Defensive guards if elements are missing
  if (!form || !n1 || !n2 || !resultEl) return;

  // Small DOM nicety: highlight inputs on focus
  [n1, n2].forEach(inp => {
    inp.addEventListener("focus", () => inp.style.background = "#fff");
    inp.addEventListener("blur",  () => inp.style.background = "");
  });

  // Delegated click handling for all four buttons
  form.addEventListener("click", (evt) => {
    const btn = evt.target.closest("button[data-op]");
    if (!btn) return;

    // Parse inputs
    const a = parseFloat(n1.value.trim());
    const b = parseFloat(n2.value.trim());

    // Validate
    if (Number.isNaN(a) || Number.isNaN(b)) {
      showResult("Please enter valid numbers in both boxes.", true);
      return;
    }

    // Compute
    const op = btn.getAttribute("data-op");
    let out;
    switch (op) {
      case "add":      out = a + b; break;
      case "subtract": out = a - b; break;
      case "multiply": out = a * b; break;
      case "divide":
        if (b === 0) {
          showResult("Cannot divide by zero.", true);
          return;
        }
        out = a / b; 
        break;
      default:
        showResult("Unknown operation.", true);
        return;
    }

    showResult(`Result: ${out}`);
  });

  function showResult(text, isError = false) {
    resultEl.textContent = text;
    resultEl.classList.toggle("error", !!isError);
  }
});
