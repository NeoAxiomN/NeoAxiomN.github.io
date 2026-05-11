// Keep tracker-specific filtering isolated from the global script entry.
let initEfmTracker = () => {
  const tracker = document.querySelector("[data-efm-tracker]");
  if (!tracker) {
    return;
  }

  const resetButton = tracker.querySelector("[data-efm-reset]");
  const countNode = tracker.querySelector("[data-efm-count]");
  const emptyNode = tracker.querySelector("[data-efm-empty]");
  const filterNodes = {
    modality: tracker.querySelector('[data-efm-filter="modality"]'),
    category: tracker.querySelector('[data-efm-filter="category"]'),
    status: tracker.querySelector('[data-efm-filter="status"]'),
    year: tracker.querySelector('[data-efm-filter="year"]'),
    open: tracker.querySelector('[data-efm-filter="open"]'),
  };
  const cards = Array.from(tracker.querySelectorAll("[data-efm-card]"));
  const groups = Array.from(tracker.querySelectorAll("[data-efm-group]"));
  const categorySections = Array.from(tracker.querySelectorAll("[data-efm-category-section]"));
  const totalCount = cards.length;

  const normalize = (value) => (value || "").toString().trim().toLowerCase();

  // Keep counters, group headings and empty states consistent with the current visibility.
  const updateVisibility = () => {
    const filters = Object.fromEntries(
      Object.entries(filterNodes).map(([key, node]) => [key, normalize(node ? node.value : "")])
    );

    let visibleCount = 0;

    cards.forEach((card) => {
      const matchesFilters =
        (!filters.modality || card.dataset.modality === filters.modality) &&
        (!filters.category || card.dataset.category === filters.category) &&
        (!filters.status || card.dataset.status === filters.status) &&
        (!filters.year || card.dataset.year === filters.year) &&
        (!filters.open || card.dataset.openSource === filters.open);
      const shouldShow = matchesFilters;

      card.hidden = !shouldShow;
      if (!shouldShow) {
        card.removeAttribute("open");
      } else {
        visibleCount += 1;
      }
    });

    categorySections.forEach((section) => {
      section.hidden = section.querySelectorAll("[data-efm-card]:not([hidden])").length === 0;
    });

    groups.forEach((group) => {
      group.hidden = group.querySelectorAll("[data-efm-card]:not([hidden])").length === 0;
    });

    if (countNode) {
      countNode.textContent = `Showing ${visibleCount} / ${totalCount} models`;
    }

    if (emptyNode) {
      emptyNode.hidden = visibleCount !== 0;
    }
  };

  Object.values(filterNodes).forEach((node) => {
    if (node) {
      node.addEventListener("change", updateVisibility);
    }
  });

  if (resetButton) {
    resetButton.addEventListener("click", () => {
      Object.values(filterNodes).forEach((node) => {
        if (node) {
          node.value = "";
        }
      });
      updateVisibility();
    });
  }

  updateVisibility();
};

export { initEfmTracker };
