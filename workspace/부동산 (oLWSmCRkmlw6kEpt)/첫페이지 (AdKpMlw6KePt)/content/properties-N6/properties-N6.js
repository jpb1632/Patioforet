(function() {
  function initN6Reveal() {
    var section = document.querySelector('.properties-N6[id="Wtmlw6KE6z"]');
    if (!section) return;

    var items = section.querySelectorAll('.n6-image-item');
    if (!items.length) return;

    section.classList.add('reveal-ready');

    var revealItem = function(item) {
      if (!item) return;
      item.classList.add('in-view');
    };

    if (!("IntersectionObserver" in window)) {
      items.forEach(function(item) {
        revealItem(item);
      });
      return;
    }

    var observer = new IntersectionObserver(function(entries, obs) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          revealItem(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: '0px 0px -12% 0px'
    });

    items.forEach(function(item) {
      observer.observe(item);
    });
  }

  function initN6() {
    initN6Reveal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initN6);
  } else {
    initN6();
  }
})();
