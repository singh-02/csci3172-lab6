// L9 – Focus/Blur demo + light validation
document.addEventListener("DOMContentLoaded", () => {
  // Grab the inputs we care about
  const ids = ["firstName", "lastName", "email"];
  const inputs = ids
    .map(id => document.getElementById(id))
    .filter(Boolean);

  // Attach focus/blur listeners via a loop
  for (const el of inputs) {
    el.addEventListener("focus", () => {
      el.classList.add("active");        // styles come from css/style.css
    });
    el.addEventListener("blur", () => {
      el.classList.remove("active");     // back to default on blur
    });
  }

  // (Optional) small demo: show success message on submit
  const form = document.getElementById("registrationForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      // very light client-side check
      const [firstName, lastName, email] = inputs;
      const ok =
        firstName?.value.trim() &&
        lastName?.value.trim() &&
        email?.value.trim();

      // Create/replace a success box
      let msg = document.getElementById("submitMsg");
      if (!msg) {
        msg = document.createElement("div");
        msg.id = "submitMsg";
        form.appendChild(msg);
      }
      msg.className = "success";
      msg.textContent = ok
        ? "Form submitted (demo). Focus/blur handlers are working!"
        : "Please fill in First Name, Last Name, and Email.";
    });
  }
});
