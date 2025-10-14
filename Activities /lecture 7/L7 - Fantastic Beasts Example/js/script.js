// L7 Example extension: ONLY 'Remove Creature' feature
// Base: Add creatures from form, display list
(function () {
  const form = document.getElementById('addCreatureForm');
  const sanctuary = document.getElementById('creatureSanctuary');
  const countBadge = document.getElementById('creatureCount');

  /** In-memory list of creatures (session-only per page load) */
  let creatures = [];

  /** Utility: render all creatures into the sanctuary div */
  function render() {
    countBadge.textContent = String(creatures.length);
    if (creatures.length === 0) {
      sanctuary.innerHTML = '<p class="text-muted">No creatures yet. Add one above!</p>';
      return;
    }

    // Build cards with a Remove button
    const html = creatures.map(c => {
      return [
        '<div class="card mb-2 creature-card" data-id="' + c.id + '">',
          '<div class="card-body d-flex justify-content-between align-items-center">',
            '<div>',
              '<div class="title">' + escapeHtml(c.name) + ' <small class="text-muted">(' + escapeHtml(c.type) + ')</small></div>',
              '<div class="text-muted">Habitat: ' + escapeHtml(c.habitat) + '</div>',
            '</div>',
            '<button type="button" class="btn btn-outline-danger btn-sm remove-btn" aria-label="Remove ' + escapeHtml(c.name) + '">Remove</button>',
          '</div>',
        '</div>'
      ].join('');
    }).join('');

    sanctuary.innerHTML = html;
  }

  /** Remove by ID and re-render */
  function removeCreatureById(id) {
    creatures = creatures.filter(c => c.id !== id);
    render();
  }

  /** Escape helper to avoid injecting HTML */
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // Form submit -> add creature
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('creatureName').value.trim();
    const type = document.getElementById('creatureType').value.trim();
    const habitat = document.getElementById('creatureHabitat').value.trim();
    if (!name || !type || !habitat) return;

    creatures.push({
      id: String(Date.now()) + Math.random().toString(16).slice(2),
      name,
      type,
      habitat
    });

    form.reset();
    render();
  });

  // Event delegation for Remove buttons
  sanctuary.addEventListener('click', (e) => {
    const btn = e.target.closest('.remove-btn');
    if (!btn) return;
    const card = btn.closest('.creature-card');
    const id = card && card.getAttribute('data-id');
    if (id) removeCreatureById(id);
  });

  // Initial render
  render();
})();
