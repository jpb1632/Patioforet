(function() {
  function initN7Reveal(sectionEl) {
    if (!sectionEl) return;
    var items = sectionEl.querySelectorAll(".n7-image-item");
    if (!items.length) return;

    sectionEl.classList.add("reveal-ready");

    var showAll = function() {
      items.forEach(function(item) {
        item.classList.add("in-view");
      });
    };

    if (!("IntersectionObserver" in window)) {
      showAll();
      return;
    }

    var observer = new IntersectionObserver(function(entries, obs) {
      entries.forEach(function(entry) {
        if (!entry.isIntersecting) return;
        items.forEach(function(item, index) {
          window.setTimeout(function() {
            item.classList.add("in-view");
          }, index * 120);
        });
        obs.unobserve(entry.target);
      });
    }, {
      threshold: 0.12,
      rootMargin: "0px 0px -8% 0px"
    });

    observer.observe(sectionEl);
  }

  $(function() {
    $(".properties-N7[id='FgMLw6KEAS']").each(function() {
      initN7Reveal(this);
    });
  });
})();
