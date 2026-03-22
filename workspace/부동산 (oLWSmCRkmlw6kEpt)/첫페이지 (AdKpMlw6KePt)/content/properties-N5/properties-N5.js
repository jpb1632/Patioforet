(function() {


function initN5Reveal(sectionEl) {
    if (!sectionEl) return;
    var leadItems = sectionEl.querySelectorAll(".n5-lead-item");
    var topItems = sectionEl.querySelectorAll(".n5-mobile-top-item");
    var cards = sectionEl.querySelectorAll(".swiper-slide .n5-card");
    if (!cards.length && !topItems.length && !leadItems.length) return;

    sectionEl.classList.add("reveal-ready");

    var show = function() {
      var targets = Array.prototype.slice.call(leadItems)
        .concat(Array.prototype.slice.call(topItems))
        .concat(Array.prototype.slice.call(cards));
      targets.forEach(function(card, idx) {
        window.setTimeout(function() {
          card.classList.add("in-view");
        }, (idx + 1) * 120);
      });
    };

    if (!("IntersectionObserver" in window)) {
      show();
      return;
    }

    var observer = new IntersectionObserver(
      function(entries, obs) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            show();
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -8% 0px"
      }
    );

    observer.observe(sectionEl);
  }

  $(function() {
    $(".properties-N5[id='mbmLw6KE2H']").each(function() {
      var blockSelector = ".properties-N5[id='mbmLw6KE2H']";
      new Swiper(blockSelector + " .n5-swiper", {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        speed: 680,
        grabCursor: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        navigation: {
          prevEl: blockSelector + " .n5-btn-prev",
          nextEl: blockSelector + " .n5-btn-next"
        },
        pagination: {
          el: blockSelector + " .n5-pagination",
          clickable: true
        },
        breakpoints: {
          0: { slidesPerView: 1, spaceBetween: 0 },
          640: { slidesPerView: 1, spaceBetween: 0 },
          1024: { slidesPerView: 1, spaceBetween: 0 },
          1440: { slidesPerView: 1, spaceBetween: 0 }
        }
      });

      initN5Reveal(this);
    });
  });
})();



