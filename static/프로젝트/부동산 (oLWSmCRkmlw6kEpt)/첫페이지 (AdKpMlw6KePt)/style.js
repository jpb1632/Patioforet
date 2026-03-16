(function() {
  $(function() {
    $(".properties-N1[id=\'gmmlW6kdpj\']").each(function() {
      const $block = $(this);
      let isMobileMenuInitialized = false;
      let isDesktopMenuInitialized = false;
      const BASE_HEADER_TOP = -4;
      const DESKTOP_SECTION_SHIFT = -26;
      const MOBILE_SECTION_SHIFT = -26;
      const COMPLEX_REMOVE_TABS = ["design", "system"];

      function pruneComplexSubMenus() {
        COMPLEX_REMOVE_TABS.forEach(function(tabKey) {
          const href = `./menu-page.html?group=complex&tab=${tabKey}`;
          $block
            .find(`.header-subitem > .header-sublink[href="${href}"]`)
            .closest(".header-subitem")
            .remove();
          $block
            .find(`.fullmenu-subitem > .fullmenu-sublink[href="${href}"]`)
            .closest(".fullmenu-subitem")
            .remove();
        });
      }

      function getBaseSectionShift() {
        return window.innerWidth <= 992 ? MOBILE_SECTION_SHIFT : DESKTOP_SECTION_SHIFT;
      }

      function forceTopGapFix() {
        const html = document.documentElement;
        const body = document.body;
        if (html) {
          html.style.setProperty("margin-top", "0px", "important");
          html.style.setProperty("padding-top", "0px", "important");
        }
        if (body) {
          body.style.setProperty("margin-top", "0px", "important");
          body.style.setProperty("padding-top", "0px", "important");
        }
        $block[0].style.setProperty("top", BASE_HEADER_TOP + "px", "important");
        const firstSection = document.querySelector(".properties-N4");
        if (firstSection) {
          firstSection.style.setProperty("margin-top", getBaseSectionShift() + "px", "important");
        }
      }
      // 모바일 메뉴 초기화
      function initMobileMenu() {
        if (isMobileMenuInitialized) return;
        const $btnMomenu = $block.find(".btn-momenu");
        $btnMomenu.off("click").on("click", function() {
          if ($block.hasClass("block-active")) {
            $block.removeClass("block-active");
          } else {
            $block.addClass("block-active");
          }
          $block.find(".header-gnbitem").removeClass("item-active");
          $block.find(".header-sublist").removeAttr("style");
        });
        // header-gnbitem 클릭 이벤트
        $block.find(".header-gnbitem").each(function() {
          const $this = $(this);
          const $thisLink = $this.find(".header-gnblink");
          const $sublist = $this.find(".header-sublist");
          if ($sublist.length) {
            $thisLink.off("click").on("click", function(event) {
              event.preventDefault();
              const $clickedItem = $(this).parents(".header-gnbitem");
              if (!$clickedItem.hasClass("item-active")) {
                $block.find(".header-gnbitem").removeClass("item-active");
                $block.find(".header-sublist").stop().slideUp(300);
              }
              $clickedItem.toggleClass("item-active");
              $sublist.stop().slideToggle(300);
            });
          }
        });
        isMobileMenuInitialized = true;
      }
      // 데스크탑 메뉴 초기화
      function initDesktopMenu() {
        if (isDesktopMenuInitialized) return;
        $block.find(".header-gnbitem").each(function() {
          const $this = $(this);
          const $thisLink = $this.find(".header-gnblink");
          $thisLink.off("click");
        });
        isDesktopMenuInitialized = true;
      }
      // 해상도에 따른 메뉴 처리
      function handleResize() {
        if (window.innerWidth <= 992) {
          if (!isMobileMenuInitialized) {
            initMobileMenu();
          }
          isDesktopMenuInitialized = false;
        } else {
          if (!isDesktopMenuInitialized) {
            initDesktopMenu();
          }
          isMobileMenuInitialized = false;
        }
      }
      // 스크롤 시 메뉴 처리
      function handleScroll() {
        $block.removeClass("top-menu-active");
        if ($(window).scrollTop() === 0) {
          $block.addClass("header-top-active");
        }
        $(window).scroll(function() {
          if ($(window).scrollTop() > 0) {
            $block.removeClass("header-top-active");
          } else {
            $block.addClass("header-top-active");
          }
        });
      }
      handleScroll();
      forceTopGapFix();
      pruneComplexSubMenus();
      $(window).on("load resize orientationchange", forceTopGapFix);
      // 전체 메뉴 열기/닫기 처리
      function handleFullMenu() {
        $block.find(".btn-allmenu").on("click", function() {
          $block.find(".header-fullmenu").addClass("fullmenu-active");
        });
        $block.find(".fullmenu-close").on("click", function() {
          $block.find(".header-fullmenu").removeClass("fullmenu-active");
        });
        $block.find(".fullmenu-gnbitem").each(function() {
          const $this = $(this);
          $this.on("mouseover", function() {
            if (window.innerWidth > 992) {
              $this.find(".fullmenu-gnblink").addClass("on");
            }
          });
          $this.on("mouseout", function() {
            if (window.innerWidth > 992) {
              $this.find(".fullmenu-gnblink").removeClass("on");
            }
          });
        });
      }
      handleFullMenu();
      // 리사이즈 시마다 메뉴 동작 초기화
      $(window).on("resize", function() {
        handleResize();
      });
      handleResize();
    });
  });
})();


(function() {
  const POPUP_HIDE_KEY = "sclass_popup_hide_until";

  function initBasicContentGuard() {
    if (window.__basicContentGuardInitialized) return;
    window.__basicContentGuardInitialized = true;
    document.documentElement.classList.add("content-guard-on");

    const editableSelector = "input, textarea, [contenteditable='true']";
    const isEditable = function(target) {
      return !!(target && target.closest && target.closest(editableSelector));
    };

    document.addEventListener(
      "contextmenu",
      function(event) {
        if (isEditable(event.target)) return;
        event.preventDefault();
      },
      { capture: true }
    );

    document.addEventListener(
      "selectstart",
      function(event) {
        if (isEditable(event.target)) return;
        event.preventDefault();
      },
      { capture: true }
    );

    document.addEventListener(
      "copy",
      function(event) {
        if (isEditable(event.target)) return;
        event.preventDefault();
      },
      { capture: true }
    );

    document.addEventListener(
      "cut",
      function(event) {
        if (isEditable(event.target)) return;
        event.preventDefault();
      },
      { capture: true }
    );

    document.addEventListener(
      "dragstart",
      function(event) {
        const target = event.target;
        if (!target) return;
        if (target.tagName === "IMG" || target.closest("img")) {
          event.preventDefault();
        }
      },
      { capture: true }
    );

    document.addEventListener(
      "keydown",
      function(event) {
        const key = String(event.key || "").toLowerCase();
        const ctrlOrMeta = event.ctrlKey || event.metaKey;

        if (key === "f12" || event.keyCode === 123) {
          event.preventDefault();
          return;
        }

        if (ctrlOrMeta && event.shiftKey && (key === "i" || key === "j" || key === "c" || key === "k")) {
          event.preventDefault();
          return;
        }

        if (ctrlOrMeta && (key === "u" || key === "s")) {
          event.preventDefault();
        }
      },
      { capture: true }
    );
  }

  function ensureLeadSubmitLoaded() {
    if (window.__leadSubmitBootstrapLoaded) return;
    window.__leadSubmitBootstrapLoaded = true;

    var loaded = document.querySelector("script[src$='lead-submit.js'], script[src*='lead-submit.js?']");
    if (loaded) return;

    var script = document.createElement("script");
    script.src = "./lead-submit.js";
    script.defer = true;
    document.body.appendChild(script);
  }

  function getTomorrowMidnight() {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime();
  }

  function isPopupHidden() {
    try {
      const value = Number(localStorage.getItem(POPUP_HIDE_KEY) || 0);
      return value > Date.now();
    } catch (_) {
      return false;
    }
  }

  function hidePopup($overlay) {
    $overlay.addClass("is-hidden");
  }

  $(function() {
    initBasicContentGuard();
    ensureLeadSubmitLoaded();

    const skipPopupForConsultation = window.location.hash === "#consultation";

    $(".properties-N4[id='pGmlW6KDwI']").each(function() {
      const $block = $(this);
      const $overlay = $block.find(".popup-overlay");
      const $stage = $block.find(".popup-stage");
      const $popupArea = $block.find(".popup-area");
      const $popupTrack = $block.find(".popup-track");
      const $cards = $popupTrack.find(".popup-card");
      const $dots = $block.find(".popup-dots");
      const $prev = $block.find(".popup-prev");
      const $next = $block.find(".popup-next");
      const $close = $block.find(".popup-close-btn");
      const $dayoff = $block.find(".popup-dayoff-check");
      const MOBILE_POPUP_AUTOPLAY_MS = 3200;
      let currentIndex = 0;
      let touchStartX = 0;
      let touchStartY = 0;
      let autoplayTimer = null;
      let onVisibilityChange = null;
      let fitRaf = null;

      $block.find(".popup-card img").attr("draggable", "false");

      function isMobilePopup() {
        return window.matchMedia("(max-width: 992px)").matches;
      }

      function normalizeIndex(index) {
        const len = $cards.length;
        if (!len) return 0;
        return (index + len) % len;
      }

      function renderPopupSlider() {
        if (!$cards.length) return;
        if (isMobilePopup()) {
          $popupTrack.css("transform", "translateX(-" + (currentIndex * 100) + "%)");
          $dots.find(".popup-dot").removeClass("is-active")
            .eq(currentIndex).addClass("is-active");
        } else {
          $popupTrack.css("transform", "");
        }
      }

      function goTo(index) {
        currentIndex = normalizeIndex(index);
        renderPopupSlider();
      }

      function stopAutoplay() {
        if (!autoplayTimer) return;
        window.clearInterval(autoplayTimer);
        autoplayTimer = null;
      }

      function startAutoplay() {
        stopAutoplay();
        if (!isMobilePopup() || $cards.length < 2 || $overlay.hasClass("is-hidden")) return;
        autoplayTimer = window.setInterval(function() {
          goTo(currentIndex + 1);
        }, MOBILE_POPUP_AUTOPLAY_MS);
      }

      function restartAutoplay() {
        startAutoplay();
      }

      function fitDesktopPopup() {
        if (!$stage.length) return;
        const stageEl = $stage.get(0);
        if (!stageEl) return;

        if (isMobilePopup()) {
          stageEl.style.removeProperty("--popup-desktop-scale");
          return;
        }

        stageEl.style.setProperty("--popup-desktop-scale", "0.9");
        const viewportHeight = window.visualViewport ? window.visualViewport.height : window.innerHeight;
        const availableHeight = Math.max(240, viewportHeight - 32);
        const measuredHeight = stageEl.getBoundingClientRect().height;
        if (!measuredHeight || measuredHeight <= availableHeight) return;

        const fitScale = Math.max(0.55, Math.min(0.9, 0.9 * (availableHeight / measuredHeight)));
        stageEl.style.setProperty("--popup-desktop-scale", fitScale.toFixed(3));
      }

      function scheduleFitDesktopPopup() {
        if (fitRaf) window.cancelAnimationFrame(fitRaf);
        fitRaf = window.requestAnimationFrame(function() {
          fitDesktopPopup();
          fitRaf = null;
        });
      }

      function buildDots() {
        if (!$cards.length) return;
        $dots.empty();
        for (let i = 0; i < $cards.length; i += 1) {
          const $dot = $("<button/>", {
            type: "button",
            class: "popup-dot" + (i === 0 ? " is-active" : ""),
            "aria-label": "팝업 " + (i + 1) + "번 보기",
            "data-index": i
          });
          $dots.append($dot);
        }
      }

      buildDots();
      $popupTrack.find("img").on("load", scheduleFitDesktopPopup);

      $prev.on("click", function() {
        if (!isMobilePopup()) return;
        goTo(currentIndex - 1);
        restartAutoplay();
      });

      $next.on("click", function() {
        if (!isMobilePopup()) return;
        goTo(currentIndex + 1);
        restartAutoplay();
      });

      $dots.on("click", ".popup-dot", function() {
        if (!isMobilePopup()) return;
        const index = Number($(this).data("index") || 0);
        goTo(index);
        restartAutoplay();
      });

      $popupArea.on("touchstart", function(event) {
        if (!isMobilePopup()) return;
        const touch = event.originalEvent.touches && event.originalEvent.touches[0];
        if (!touch) return;
        touchStartX = touch.clientX;
        touchStartY = touch.clientY;
      });

      $popupArea.on("touchend", function(event) {
        if (!isMobilePopup()) return;
        const touch = event.originalEvent.changedTouches && event.originalEvent.changedTouches[0];
        if (!touch) return;
        const diffX = touch.clientX - touchStartX;
        const diffY = touch.clientY - touchStartY;
        if (Math.abs(diffX) < 40 || Math.abs(diffX) < Math.abs(diffY)) return;
        if (diffX < 0) {
          goTo(currentIndex + 1);
        } else {
          goTo(currentIndex - 1);
        }
        restartAutoplay();
      });

      $(window).on("resize orientationchange", function() {
        renderPopupSlider();
        scheduleFitDesktopPopup();
        startAutoplay();
      });

      if (isPopupHidden() || skipPopupForConsultation) {
        stopAutoplay();
        hidePopup($overlay);
        return;
      }

      goTo(0);
      scheduleFitDesktopPopup();
      startAutoplay();

      onVisibilityChange = function() {
        if ($overlay.hasClass("is-hidden")) {
          stopAutoplay();
          return;
        }
        if (document.hidden) {
          stopAutoplay();
        } else {
          startAutoplay();
        }
      };
      document.addEventListener("visibilitychange", onVisibilityChange);

      $close.on("click", function() {
        stopAutoplay();
        if (onVisibilityChange) {
          document.removeEventListener("visibilitychange", onVisibilityChange);
        }
        if ($dayoff.is(":checked")) {
          try {
            localStorage.setItem(POPUP_HIDE_KEY, String(getTomorrowMidnight()));
          } catch (_) {}
        }
        hidePopup($overlay);
      });
    });
  });
})();

﻿(function() {
  function initN5MobileZoom(sectionEl) {
    if (!sectionEl || sectionEl.querySelector(".n5-lightbox")) return;
    var coarseMq = window.matchMedia("(pointer: coarse)");
    var mobileMq = window.matchMedia("(max-width: 992px)");
    var canOpen = function() {
      return coarseMq.matches || mobileMq.matches;
    };

    var overlay = document.createElement("div");
    overlay.className = "n5-lightbox";
    overlay.setAttribute("aria-hidden", "true");
    overlay.innerHTML = [
      '<div class="n5-lightbox-inner" role="dialog" aria-modal="true" aria-label="프리미엄 이미지 상세보기">',
      '  <img class="n5-lightbox-image" alt="프리미엄 이미지 상세보기">',
      '  <button type="button" class="n5-lightbox-close" aria-label="닫기">&times;</button>',
      "</div>"
    ].join("");
    sectionEl.appendChild(overlay);

    var lightboxImage = overlay.querySelector(".n5-lightbox-image");
    var closeButton = overlay.querySelector(".n5-lightbox-close");
    var images = Array.prototype.slice.call(sectionEl.querySelectorAll(".n5-card-thumb img"));
    var currentIndex = -1;
    var scrollBackup = "";
    var touchStartX = 0;
    var touchStartY = 0;
    var touchDeltaX = 0;
    var touchDeltaY = 0;
    var touchTracking = false;

    var close = function() {
      overlay.classList.remove("is-open");
      overlay.setAttribute("aria-hidden", "true");
      lightboxImage.removeAttribute("src");
      document.body.style.overflow = scrollBackup;
      currentIndex = -1;
    };

    var renderIndex = function(index) {
      if (!images.length) return;
      var count = images.length;
      currentIndex = ((index % count) + count) % count;
      var target = images[currentIndex];
      lightboxImage.src = target.getAttribute("src") || "";
      lightboxImage.alt = target.getAttribute("alt") || "프리미엄 이미지 상세보기";
    };

    var openByIndex = function(index) {
      if (!images.length || !canOpen()) return;
      scrollBackup = document.body.style.overflow || "";
      renderIndex(index);
      overlay.classList.add("is-open");
      overlay.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    };

    var showPrev = function() {
      if (!overlay.classList.contains("is-open")) return;
      renderIndex(currentIndex - 1);
    };

    var showNext = function() {
      if (!overlay.classList.contains("is-open")) return;
      renderIndex(currentIndex + 1);
    };

    overlay.addEventListener("click", function(evt) {
      if (evt.target === overlay || evt.target === closeButton) {
        close();
      }
    });

    document.addEventListener("keydown", function(evt) {
      if (!overlay.classList.contains("is-open")) return;
      if (evt.key === "Escape") {
        close();
      } else if (evt.key === "ArrowLeft") {
        showPrev();
      } else if (evt.key === "ArrowRight") {
        showNext();
      }
    });

    overlay.addEventListener(
      "touchstart",
      function(evt) {
        if (!overlay.classList.contains("is-open")) return;
        var touch = evt.touches && evt.touches[0];
        if (!touch) return;
        touchTracking = true;
        touchStartX = touch.clientX;
        touchStartY = touch.clientY;
        touchDeltaX = 0;
        touchDeltaY = 0;
      },
      { passive: true, capture: true }
    );

    overlay.addEventListener(
      "touchmove",
      function(evt) {
        if (!overlay.classList.contains("is-open") || !touchTracking) return;
        var touch = evt.touches && evt.touches[0];
        if (!touch) return;
        touchDeltaX = touch.clientX - touchStartX;
        touchDeltaY = touch.clientY - touchStartY;

        // In lightbox, prioritize horizontal swipe for next/prev.
        if (Math.abs(touchDeltaX) > Math.abs(touchDeltaY)) {
          evt.preventDefault();
        }
      },
      { passive: false, capture: true }
    );

    overlay.addEventListener(
      "touchend",
      function(evt) {
        if (!overlay.classList.contains("is-open") || !touchTracking) return;
        var touch = evt.changedTouches && evt.changedTouches[0];
        if (touch) {
          touchDeltaX = touch.clientX - touchStartX;
          touchDeltaY = touch.clientY - touchStartY;
        }

        if (Math.abs(touchDeltaX) > 42 && Math.abs(touchDeltaX) > Math.abs(touchDeltaY) * 1.2) {
          if (touchDeltaX < 0) {
            showNext();
          } else {
            showPrev();
          }
        }

        touchTracking = false;
        touchDeltaX = 0;
        touchDeltaY = 0;
      },
      { passive: true, capture: true }
    );

    images.forEach(function(img, index) {
      img.classList.add("n5-zoomable");
      img.addEventListener("click", function() {
        openByIndex(index);
      });
    });
  }

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
        slidesPerView: 3,
        spaceBetween: 24,
        loop: true,
        speed: 700,
        autoplay: {
          delay: 3500,
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
          0: { slidesPerView: 1, spaceBetween: 16 },
          640: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 24 }
        }
      });

      initN5MobileZoom(this);
      initN5Reveal(this);
    });
  });
})();

(function() {
  function initN6Reveal() {
    var section = document.querySelector('.properties-N6[id="Wtmlw6KE6z"]');
    if (!section) return;

    var items = section.querySelectorAll(".n6-image-item");
    if (!items.length) return;

    section.classList.add("reveal-ready");

    var revealItem = function(item) {
      if (!item) return;
      item.classList.add("in-view");
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
      rootMargin: "0px 0px -12% 0px"
    });

    items.forEach(function(item) {
      observer.observe(item);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initN6Reveal);
  } else {
    initN6Reveal();
  }
})();

(function() {
  function initN7ThumbReveal(sectionEl) {
    if (!sectionEl) return;
    var thumb = sectionEl.querySelector(".thumb");
    if (!thumb) return;

    sectionEl.classList.add("reveal-ready");

    var show = function() {
      thumb.classList.add("in-view");
    };

    if (!("IntersectionObserver" in window)) {
      show();
      return;
    }

    var observer = new IntersectionObserver(function(entries, obs) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          show();
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.18,
      rootMargin: "0px 0px -8% 0px"
    });

    observer.observe(sectionEl);
  }

  $(function() {
    $(".properties-N7[id='FgMLw6KEAS']").each(function() {
      const $block = $(this);

      $block.find(".tabset-link").click(function() {
        const $idx = $(this).parent().index();
        $block
          .find(".info .item")
          .eq($idx)
          .addClass("active")
          .siblings()
          .removeClass("active");
        $block
          .find(".thumb .item")
          .eq($idx)
          .addClass("active")
          .siblings()
          .removeClass("active");
      });

      initN7ThumbReveal(this);
    });
  });
})();

﻿(function() {
  function initN8Reveal() {
    var section = document.querySelector('.properties-N8[id="ciMLW6keFd"]');
    if (!section) return;

    var items = section.querySelectorAll('.addr');
    if (!items.length) return;

    section.classList.add('reveal-ready');

    var showItems = function() {
      items.forEach(function(item, idx) {
        window.setTimeout(function() {
          item.classList.add('in-view');
        }, idx * 280);
      });
    };

    if (!('IntersectionObserver' in window)) {
      showItems();
      return;
    }

    var observer = new IntersectionObserver(function(entries, obs) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          showItems();
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: '0px 0px -10% 0px'
    });

    observer.observe(section);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initN8Reveal);
  } else {
    initN8Reveal();
  }
})();

(function() {
  $(function() {
    $(".properties-N9[id='vzMlw6KehW']").each(function() {
      const $block = $(this);
      const $checksetWrap = $block.find(".checkset-wrap");
      const NAME_PATTERN = /^[A-Za-z\uAC00-\uD7A3]+$/;
      const PHONE_PATTERN = /^010\d{8}$/;
      const sanitizeName = (value) => String(value || "").replace(/[^A-Za-z\uAC00-\uD7A3]/g, "");
      const sanitizePhone = (value) => String(value || "").replace(/\D/g, "").slice(0, 11);

      if ($checksetWrap.length) {
        const $validator = $("<input>", {
          type: "text",
          required: true,
          style: "position: absolute; opacity: 0; pointer-events: none;",
          tabindex: -1
        }).insertBefore($checksetWrap.find(".checkset-input").first());

        const $groupChecks = $checksetWrap.find(".checkset-input");
        $groupChecks.prop("required", false);

        $groupChecks.on("change", function() {
          if ($groupChecks.is(":checked")) {
            $validator.val("checked");
            $validator[0].setCustomValidity("");
          } else {
            $validator.val("");
            $validator[0].setCustomValidity("\uBAA9\uC801\uC740 \uCD5C\uC18C \uD558\uB098 \uC774\uC0C1 \uC120\uD0DD\uD574 \uC8FC\uC138\uC694.");
          }
        });

        $validator.val("");
        $validator[0].setCustomValidity("\uBAA9\uC801\uC740 \uCD5C\uC18C \uD558\uB098 \uC774\uC0C1 \uC120\uD0DD\uD574 \uC8FC\uC138\uC694.");
      }

      const $form = $block.find(".form-group form").first();
      const $nameInput = $form.find("#properties-N9-inputset-a-1, input[name='성함'], input[type='text']").first();
      const $privacyCheck = $block.find(".contents-agree .checkset-input[type='checkbox']").first();
      const $phoneInput = $form.find("#properties-N9-inputset-a-2, input[type='tel']").first();

      if ($nameInput.length) {
        let isComposing = false;
        $nameInput.attr({ pattern: "[A-Za-z가-힣]+" });
        $nameInput.off("compositionstart.nameSanitize compositionend.nameSanitize input.nameSanitize");

        $nameInput.on("compositionstart.nameSanitize", function() {
          isComposing = true;
        });

        $nameInput.on("compositionend.nameSanitize", function() {
          isComposing = false;
          const normalized = sanitizeName($(this).val());
          if ($(this).val() !== normalized) {
            $(this).val(normalized);
          }
        });

        $nameInput.on("input.nameSanitize", function(event) {
          if (isComposing || (event.originalEvent && event.originalEvent.isComposing)) return;
          const normalized = sanitizeName($(this).val());
          if ($(this).val() !== normalized) {
            $(this).val(normalized);
          }
        });
      }

      if ($phoneInput.length) {
        $phoneInput.attr({
          inputmode: "numeric",
          maxlength: "11",
          pattern: "010[0-9]{8}"
        });

        $phoneInput.off("input.phoneSanitize").on("input.phoneSanitize", function() {
          const normalized = sanitizePhone($(this).val());
          if ($(this).val() !== normalized) {
            $(this).val(normalized);
          }
        });
      }

      if ($form.length && $privacyCheck.length) {
        $privacyCheck.prop("required", false);
        $form.off("submit.privacyConsentGuard").on("submit.privacyConsentGuard", function(event) {
          if ($nameInput.length) {
            const name = sanitizeName($nameInput.val());
            $nameInput.val(name);
            if (!name) {
              event.preventDefault();
              alert("\uC774\uB984\uC744 \uC785\uB825\uD574 \uC8FC\uC138\uC694.");
              $nameInput.trigger("focus");
              return false;
            }
            if (!NAME_PATTERN.test(name)) {
              event.preventDefault();
              alert("\uC774\uB984\uC740 \uD55C\uAE00 \uB610\uB294 \uC601\uC5B4\uB9CC \uC785\uB825\uD574 \uC8FC\uC138\uC694.");
              $nameInput.trigger("focus");
              return false;
            }
          }

          if ($phoneInput.length) {
            const phone = sanitizePhone($phoneInput.val());
            $phoneInput.val(phone);
            if (!PHONE_PATTERN.test(phone)) {
              event.preventDefault();
              alert("\uD734\uB300\uD3F0 \uBC88\uD638\uB294 010\uC73C\uB85C \uC2DC\uC791\uD558\uB294 11\uC790\uB9AC \uC22B\uC790\uB9CC \uC785\uB825\uD574 \uC8FC\uC138\uC694.");
              $phoneInput.trigger("focus");
              return false;
            }
          }

          if (!$privacyCheck.is(":checked")) {
            event.preventDefault();
            alert("\uAC1C\uC778\uC815\uBCF4 \uC218\uC9D1/\uC774\uC6A9\uB3D9\uC758\uC5D0 \uCCB4\uD06C\uD574 \uC8FC\uC138\uC694.");
            $privacyCheck.trigger("focus");
            return false;
          }

          return true;
        });
      }
    });
  });
})();
(function() {
  $(function() {
    var NAME_PATTERN = /^[A-Za-z\uAC00-\uD7A3]+$/;
    var PHONE_PATTERN = /^010\d{8}$/;

    function sanitizeName(value) {
      return String(value || "").replace(/[^A-Za-z\uAC00-\uD7A3]/g, "");
    }

    function sanitizePhone(value) {
      return String(value || "").replace(/\D/g, "").slice(0, 11);
    }

    function hoistFixedConsultBar($bar) {
      const node = $bar && $bar[0];
      if (!node || node.dataset.fixedHoisted === "true") return;
      node.dataset.fixedHoisted = "true";
      document.body.appendChild(node);
    }

    $(".fixed-consult-bar.is-split").each(function() {
      const $block = $(this);
      hoistFixedConsultBar($block);
      const $nameInput = $block.find(".consult-form input[type='text']").first();
      const $phoneInput = $block.find(".consult-form input[type='tel']").first();
      const $privacyCheck = $block.find(".consult-privacy-check").first();
      const $submitBtn = $block.find(".consult-submit").first();

      if ($nameInput.length) {
        let isComposing = false;
        $nameInput.attr({ pattern: "[A-Za-z가-힣]+" });
        $nameInput.off("compositionstart.nameSanitize compositionend.nameSanitize input.nameSanitize");

        $nameInput.on("compositionstart.nameSanitize", function() {
          isComposing = true;
        });

        $nameInput.on("compositionend.nameSanitize", function() {
          isComposing = false;
          const normalized = sanitizeName($(this).val());
          if ($(this).val() !== normalized) {
            $(this).val(normalized);
          }
        });

        $nameInput.on("input.nameSanitize", function(event) {
          if (isComposing || (event.originalEvent && event.originalEvent.isComposing)) return;
          const normalized = sanitizeName($(this).val());
          if ($(this).val() !== normalized) {
            $(this).val(normalized);
          }
        });
      }

      if ($phoneInput.length) {
        $phoneInput.attr({
          inputmode: "numeric",
          maxlength: "11",
          pattern: "010[0-9]{8}"
        });

        $phoneInput.off("input.phoneSanitize").on("input.phoneSanitize", function() {
          const normalized = sanitizePhone($(this).val());
          if ($(this).val() !== normalized) {
            $(this).val(normalized);
          }
        });
      }

      if (!$privacyCheck.length || !$submitBtn.length) return;

      $submitBtn.off("click.privacyConsentGuard").on("click.privacyConsentGuard", function(event) {
        if ($nameInput.length) {
          const name = sanitizeName($nameInput.val());
          $nameInput.val(name);
          if (!name) {
            event.preventDefault();
            alert("\uC774\uB984\uC744 \uC785\uB825\uD574 \uC8FC\uC138\uC694.");
            $nameInput.trigger("focus");
            return;
          }
          if (!NAME_PATTERN.test(name)) {
            event.preventDefault();
            alert("\uC774\uB984\uC740 \uD55C\uAE00 \uB610\uB294 \uC601\uC5B4\uB9CC \uC785\uB825\uD574 \uC8FC\uC138\uC694.");
            $nameInput.trigger("focus");
            return;
          }
        }

        if ($phoneInput.length) {
          const phone = sanitizePhone($phoneInput.val());
          $phoneInput.val(phone);
          if (!PHONE_PATTERN.test(phone)) {
            event.preventDefault();
            alert("\uD734\uB300\uD3F0 \uBC88\uD638\uB294 010\uC73C\uB85C \uC2DC\uC791\uD558\uB294 11\uC790\uB9AC \uC22B\uC790\uB9CC \uC785\uB825\uD574 \uC8FC\uC138\uC694.");
            $phoneInput.trigger("focus");
            return;
          }
        }

        if ($privacyCheck.is(":checked")) return;
        event.preventDefault();
        alert("\uAC1C\uC778\uC815\uBCF4 \uC218\uC9D1/\uC774\uC6A9\uB3D9\uC758\uC5D0 \uCCB4\uD06C\uD574 \uC8FC\uC138\uC694.");
        $privacyCheck.trigger("focus");
      });
    });
  });
})();