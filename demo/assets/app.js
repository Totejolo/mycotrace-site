(() => {
  function applyFilter(input) {
    const target = document.getElementById(input.dataset.filterTarget);
    if (!target) {
      return;
    }
    const selector = input.dataset.filterSelector || "[data-filterable]";
    const items = target.querySelectorAll(selector);
    const query = input.value.trim().toLowerCase();
    let visible = 0;

    items.forEach((item) => {
      const haystack = (item.dataset.search || item.textContent || "").toLowerCase();
      const show = !query || haystack.includes(query);
      item.hidden = !show;
      if (show) {
        visible += 1;
      }
    });

    const emptyId = input.dataset.emptyId;
    if (emptyId) {
      const empty = document.getElementById(emptyId);
      if (empty) {
        empty.hidden = visible !== 0;
      }
    }
  }

  document.addEventListener("input", (event) => {
    const target = event.target;
    if (target instanceof HTMLInputElement && target.dataset.filterTarget) {
      applyFilter(target);
    }
  });

  document.querySelectorAll("input[data-filter-target]").forEach((input) => {
    applyFilter(input);
  });
})();
