/* Inventory Management System (IMS) — Vanilla JS (ES6)
 * Requirements covered:
 *  - Array of item objects (name, type, price, quantity, description)
 *  - Functions: addItem, removeItem, getItem, listItems, searchItems, calculateTotalValue
 *  - DOM interaction for display and user inputs
 *  - Control flow (conditionals/loops)
 * Bonus:
 *  - groupByCategory (Map/Object)
 *  - findDuplicates (via Set)
 *  - applyDiscount(discountPercentage)
 */

// ---------- Data Model ----------
let inventory = [];

// Sample data (8–12 items)
const SAMPLE_ITEMS = [
  { name: "Moonlight Wand", type: "wand", price: 79.99, quantity: 5, description: "Ash wood, silver core, balanced for precision." },
  { name: "Starlight Potion", type: "potion", price: 24.5, quantity: 12, description: "Mild restorative brew. Best before full moon." },
  { name: "Phoenix Feather Pick", type: "accessory", price: 9.99, quantity: 30, description: "Guitar pick—mythic tone, excellent grip." },
  { name: "Seafarer Guitar", type: "guitar", price: 399.0, quantity: 2, description: "Warm mids, bright highs, great for folk." },
  { name: "Harmonia Harmonica", type: "harmonica", price: 59.99, quantity: 4, description: "Key of C, airtight reeds for smooth bends." },
  { name: "Arcane Strings", type: "accessory", price: 12.0, quantity: 18, description: "Long-life coated strings, medium gauge." },
  { name: "Aegis Shield Polish", type: "potion", price: 14.5, quantity: 10, description: "Restores luster; not for ingestion." },
  { name: "Nightfall Wand", type: "wand", price: 89.0, quantity: 3, description: "Darkwood, responsive, suited for duets and duels." },
  { name: "Star Chimes", type: "accessory", price: 19.5, quantity: 7, description: "Ambient sparkle for recordings." },
  { name: "Meridian Metronome", type: "tool", price: 34.25, quantity: 6, description: "Solid tempo with tap function." }
];

// Utility: format currency
const fmt = (n) => new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(n);

// ---------- Core Functions ----------
function addItem(item) {
  if (!item || !item.name) return;
  const idx = inventory.findIndex(i => i.name.toLowerCase() === item.name.toLowerCase());
  if (idx >= 0) {
    // Update existing item
    inventory[idx] = { ...inventory[idx], ...item };
  } else {
    inventory.push(item);
  }
  listItems();
}

function removeItem(itemName) {
  if (!itemName) return;
  inventory = inventory.filter(i => i.name.toLowerCase() !== itemName.toLowerCase());
  listItems();
}

function getItem(itemName) {
  if (!itemName) return null;
  return inventory.find(i => i.name.toLowerCase() === itemName.toLowerCase()) || null;
}

function listItems(list = inventory) {
  const container = document.getElementById("inventory-list");
  container.innerHTML = "";
  if (!Array.isArray(list) || list.length === 0) {
    container.innerHTML = `<p class="hint">No items to display.</p>`;
  } else {
    list.forEach(item => {
      const card = document.createElement("div");
      card.className = "item";
      card.innerHTML = `
        <div>
          <h3>${item.name} <span class="badge">${item.type}</span></h3>
          <div class="meta">Qty: <strong>${item.quantity}</strong></div>
          <div class="price">${fmt(item.price)}</div>
          <p class="desc">${item.description || ""}</p>
        </div>
        <div class="controls">
          <button data-edit="${item.name}">Edit</button>
          <button class="danger" data-remove="${item.name}">Remove</button>
        </div>
      `;
      container.appendChild(card);
    });
  }
  document.getElementById("inventory-count").textContent = `${list.length} item${list.length !== 1 ? "s" : ""}`;
  calculateTotalValue(list);
}

function searchItems(query) {
  if (!query) { listItems(); return; }
  const q = query.trim().toLowerCase();
  const results = inventory.filter(i =>
    i.name.toLowerCase().includes(q) ||
    i.type.toLowerCase().includes(q)
  );
  listItems(results);
}

function calculateTotalValue(list = inventory) {
  const total = list.reduce((sum, i) => sum + (Number(i.price) * Number(i.quantity)), 0);
  document.getElementById("total-value").textContent = fmt(total);
  return total;
}

// ---------- Bonus Functions ----------
function groupByCategory() {
  // Using Map for explicitness, could also be a plain object
  const byType = new Map();
  inventory.forEach(item => {
    const key = item.type.toLowerCase();
    if (!byType.has(key)) byType.set(key, []);
    byType.get(key).push(item);
  });

  const out = document.getElementById("grouped-output");
  out.innerHTML = "";
  if (byType.size === 0) {
    out.innerHTML = `<p class="hint">No categories to show.</p>`;
    return byType;
  }
  for (const [type, items] of byType.entries()) {
    const div = document.createElement("div");
    div.className = "group";
    div.innerHTML = `
      <h4>${type} (${items.length})</h4>
      <ul>${items.map(i => `<li>${i.name} — ${fmt(i.price)} × ${i.quantity}</li>`).join("")}</ul>
    `;
    out.appendChild(div);
  }
  return byType;
}

function findDuplicates() {
  const names = new Set();
  const dups = new Set();
  inventory.forEach(i => {
    const key = i.name.toLowerCase();
    if (names.has(key)) dups.add(key);
    else names.add(key);
  });

  const out = document.getElementById("duplicates-output");
  out.innerHTML = "";
  if (dups.size === 0) {
    out.innerHTML = `<p class="hint">No duplicate item names found.</p>`;
    return [];
  }
  const list = Array.from(dups);
  out.innerHTML = `<ul>${list.map(n => `<li><strong>${n}</strong></li>`).join("")}</ul>`;
  return list;
}

function applyDiscount(discountPercentage) {
  const d = Number(discountPercentage);
  if (Number.isNaN(d) || d <= 0) return;
  inventory = inventory.map(i => ({
    ...i,
    price: Number((i.price * (1 - d / 100)).toFixed(2))
  }));
  listItems();
}

// ---------- DOM Wiring ----------
function resetToSample() {
  inventory = JSON.parse(JSON.stringify(SAMPLE_ITEMS));
  listItems();
  document.getElementById("grouped-output").innerHTML = "";
  document.getElementById("duplicates-output").innerHTML = "";
}

window.addEventListener("DOMContentLoaded", () => {
  // init data/UI
  resetToSample();

  const form = document.getElementById("item-form");
  const inputs = {
    name: document.getElementById("name"),
    type: document.getElementById("type"),
    price: document.getElementById("price"),
    quantity: document.getElementById("quantity"),
    description: document.getElementById("description"),
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const item = {
      name: inputs.name.value.trim(),
      type: inputs.type.value.trim(),
      price: Number(inputs.price.value),
      quantity: Number(inputs.quantity.value),
      description: inputs.description.value.trim(),
    };
    // Basic validation / error handling
    if (!item.name || !item.type || isNaN(item.price) || isNaN(item.quantity)) {
      alert("Please fill name, type, price, and quantity correctly.");
      return;
    }
    addItem(item);
    form.reset();
    inputs.name.focus();
  });

  document.getElementById("btn-clear-form").addEventListener("click", () => form.reset());

  // Listeners
  document.getElementById("btn-list-all").addEventListener("click", () => listItems());
  document.getElementById("btn-search").addEventListener("click", () => {
    const q = document.getElementById("search").value;
    searchItems(q);
  });
  document.getElementById("btn-discount").addEventListener("click", () => {
    const d = document.getElementById("discount").value;
    applyDiscount(d);
  });
  document.getElementById("btn-group").addEventListener("click", groupByCategory);
  document.getElementById("btn-find-duplicates").addEventListener("click", findDuplicates);
  document.getElementById("btn-reset").addEventListener("click", resetToSample);

  // Delegate edit/remove buttons
  document.getElementById("inventory-list").addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    const removeName = btn.getAttribute("data-remove");
    const editName = btn.getAttribute("data-edit");

    if (removeName) {
      if (confirm(`Remove "${removeName}"?`)) removeItem(removeName);
      return;
    }
    if (editName) {
      const item = getItem(editName);
      if (!item) return;
      inputs.name.value = item.name;
      inputs.type.value = item.type;
      inputs.price.value = item.price;
      inputs.quantity.value = item.quantity;
      inputs.description.value = item.description || "";
      inputs.name.focus();
    }
  });

  // Live search on enter
  document.getElementById("search").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      searchItems(e.currentTarget.value);
    }
  });
});
