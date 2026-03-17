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

      function bindConsultationShortcut() {
        const $consultationLinks = $block.find(".header-reserve-link[href='#consultation']");
        if (!$consultationLinks.length) return;

        $consultationLinks.off("click.consultationShortcut").on("click.consultationShortcut", function(event) {
          event.preventDefault();

          const target = document.querySelector(".properties-N9 .consultation-anchor");
          if (!target) return;

          const headerHeight = $block.outerHeight() || 96;
          const targetRect = target.getBoundingClientRect();
          const extraOffset = window.innerWidth <= 992 ? 10 : 18;
          const targetTop = targetRect.top + window.scrollY - headerHeight - extraOffset;

          window.scrollTo({
            top: Math.max(0, targetTop),
            behavior: "smooth"
          });

          $block.removeClass("block-active");
          $block.find(".header-fullmenu").removeClass("fullmenu-active");
          history.replaceState(null, "", window.location.pathname + window.location.search);
        });
      }

      handleFullMenu();
      bindConsultationShortcut();
      // 리사이즈 시마다 메뉴 동작 초기화
      $(window).on("resize", function() {
        handleResize();
      });
      handleResize();
    });
  });
})();


(function() {
  const POPUP_HIDE_KEY = "patioforet_popup_hide_until_v2";

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

    const searchParams = new URLSearchParams(window.location.search || "");
    const skipPopupForConsultation =
      window.location.hash === "#consultation" ||
      searchParams.get("consultation") === "1";

    $(".properties-N4[id='pGmlW6KDwI']").each(function() {
      const $block = $(this);
      const $overlay = $block.find(".popup-overlay");
      const $heroSlider = $block.find(".hero-slider");
      const $heroBackdropPrimary = $block.find(".hero-backdrop-primary");
      const $heroBackdropSecondary = $block.find(".hero-backdrop-secondary");
      const $heroSlides = $block.find(".hero-slide");
      const $heroDots = $block.find(".hero-dots");
      const $heroPrev = $block.find(".hero-prev");
      const $heroNext = $block.find(".hero-next");
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
      const HERO_SLIDE_MS = 5200;
      let currentIndex = 0;
      let heroIndex = 0;
      let touchStartX = 0;
      let touchStartY = 0;
      let heroTouchStartX = 0;
      let heroTouchStartY = 0;
      let heroMouseDown = false;
      let heroDragMoved = false;
      let heroMouseStartX = 0;
      let heroMouseStartY = 0;
      let heroMouseCurrentX = 0;
      let heroMouseCurrentY = 0;
      let heroIsAnimating = false;
      let heroReleaseTimer = null;
      let autoplayTimer = null;
      let heroAutoplayTimer = null;
      let onVisibilityChange = null;
      let fitRaf = null;

      function hoistPopupOverlay() {
        const node = $overlay && $overlay[0];
        if (!node || node.dataset.popupHoisted === "true") return;
        node.dataset.popupHoisted = "true";
        node.classList.add("popup-overlay-hoisted");
        document.body.appendChild(node);
      }

      $block.find(".popup-card img").attr("draggable", "false");
      hoistPopupOverlay();

      function isMobilePopup() {
        return window.matchMedia("(max-width: 992px)").matches;
      }

      function normalizeIndex(index) {
        const len = $cards.length;
        if (!len) return 0;
        return (index + len) % len;
      }

      function normalizeHeroIndex(index) {
        const len = $heroSlides.length;
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

      function renderHeroSlides() {
        if (!$heroSlides.length) return;
        if (heroReleaseTimer) {
          window.clearTimeout(heroReleaseTimer);
          heroReleaseTimer = null;
        }
        heroIsAnimating = false;
        $heroSlides.removeAttr("style");
        $heroSlider.removeClass("is-dragging is-snapping");
        $heroSlides.removeClass("is-active").eq(heroIndex).addClass("is-active");
        $heroDots.find(".hero-dot").removeClass("is-active")
          .eq(heroIndex).addClass("is-active");
        syncHeroBackdrop(heroIndex);
        syncHeroTheme(heroIndex);
      }

      function goHero(index) {
        if (!$heroSlides.length) return;
        heroIndex = normalizeHeroIndex(index);
        renderHeroSlides();
      }

      function getHeroSlideImage(index) {
        const slide = $heroSlides.get(index);
        if (!slide) return "";
        const img = slide.querySelector("img");
        if (!img) return "";
        return img.currentSrc || img.getAttribute("src") || "";
      }

      function syncHeroBackdrop(index) {
        const src = getHeroSlideImage(index);
        if (!src) return;
        $heroBackdropPrimary.css({
          backgroundImage: 'url("' + src + '")',
          opacity: 0.88
        });
        $heroBackdropSecondary.css({
          backgroundImage: "",
          opacity: 0
        });
      }

      function syncHeroTheme(index) {
        $block.removeClass("hero-theme-gold hero-theme-navy hero-theme-bright");
        if (index === 0) {
          $block.addClass("hero-theme-gold");
        } else if (index === 2) {
          $block.addClass("hero-theme-bright");
        } else {
          $block.addClass("hero-theme-navy");
        }
      }

      function handleHeroGesture(diffX, diffY) {
        if (heroIsAnimating || Math.abs(diffY) > Math.abs(diffX)) return false;

        const sliderWidth = $block.outerWidth() || $heroSlider.outerWidth() || 1;
        const threshold = Math.max(70, sliderWidth * 0.14);
        const direction = diffX < 0 ? 1 : -1;
        const adjacentIndex = normalizeHeroIndex(heroIndex + direction);
        const $current = $heroSlides.eq(heroIndex);
        const $adjacent = $heroSlides.eq(adjacentIndex);

        $heroSlider.removeClass("is-dragging").addClass("is-snapping");
        heroIsAnimating = true;

        if (Math.abs(diffX) >= threshold) {
          $current.css({
            opacity: 1,
            transform: "translateX(" + (-direction * sliderWidth) + "px) scale(1)",
            zIndex: 3
          });
          $adjacent.css({
            opacity: 1,
            transform: "translateX(0px) scale(1)",
            zIndex: 2
          });

          heroReleaseTimer = window.setTimeout(function() {
            heroIndex = adjacentIndex;
            renderHeroSlides();
            restartHeroAutoplay();
          }, 360);
          return true;
        }

        $current.css({
          opacity: 1,
          transform: "translateX(0px) scale(1)",
          zIndex: 3
        });
        $adjacent.css({
          opacity: 1,
          transform: "translateX(" + (direction > 0 ? sliderWidth : -sliderWidth) + "px) scale(1)",
          zIndex: 2
        });

        heroReleaseTimer = window.setTimeout(function() {
          renderHeroSlides();
          startHeroAutoplay();
        }, 320);
        return false;
      }

      function resetHeroDragState() {
        heroMouseDown = false;
        heroDragMoved = false;
        heroMouseStartX = 0;
        heroMouseStartY = 0;
        heroMouseCurrentX = 0;
        heroMouseCurrentY = 0;
        $heroSlider.removeClass("is-dragging");
        $heroSlides.removeAttr("style");
      }

      function applyHeroDrag(diffX) {
        if (!$heroSlides.length) return;

        const sliderWidth = $block.outerWidth() || $heroSlider.outerWidth() || 1;
        const clamped = Math.max(-sliderWidth, Math.min(sliderWidth, diffX));
        const progress = Math.min(1, Math.abs(clamped) / sliderWidth);
        const direction = clamped < 0 ? 1 : -1;
        const adjacentIndex = normalizeHeroIndex(heroIndex + direction);
        const $current = $heroSlides.eq(heroIndex);
        const $adjacent = $heroSlides.eq(adjacentIndex);
        const currentSrc = getHeroSlideImage(heroIndex);
        const adjacentSrc = getHeroSlideImage(adjacentIndex);

        if (currentSrc) {
          $heroBackdropPrimary.css({
            backgroundImage: 'url("' + currentSrc + '")',
            opacity: 0.88 - progress * 0.28
          });
        }
        if (adjacentSrc) {
          $heroBackdropSecondary.css({
            backgroundImage: 'url("' + adjacentSrc + '")',
            opacity: Math.min(0.88, progress * 0.72)
          });
        }

        $heroSlider.addClass("is-dragging");
        $heroSlides.each(function(index) {
          const $slide = $(this);
          if (index === heroIndex) {
            $slide.css({
              opacity: 1,
              transform: "translateX(" + clamped + "px) scale(1)",
              zIndex: 3
            });
          } else if (index === adjacentIndex) {
            const incoming = direction > 0 ? sliderWidth + clamped : -sliderWidth + clamped;
            $slide.css({
              opacity: 1,
              transform: "translateX(" + incoming + "px) scale(1)",
              zIndex: 2
            });
          } else {
            $slide.css({
              opacity: 0,
              transform: "translateX(0) scale(1)",
              zIndex: 1
            });
          }
        });
      }

      function canStartHeroDrag(target) {
        if (!target) return false;
        if ($(target).closest(".hero-controls, .popup-overlay, a, button, input, textarea, select, label").length) {
          return false;
        }
        return true;
      }

      function stopHeroAutoplay() {
        if (!heroAutoplayTimer) return;
        window.clearInterval(heroAutoplayTimer);
        heroAutoplayTimer = null;
      }

      function startHeroAutoplay() {
        stopHeroAutoplay();
        if ($heroSlides.length < 2) return;
        heroAutoplayTimer = window.setInterval(function() {
          goHero(heroIndex + 1);
        }, HERO_SLIDE_MS);
      }

      function restartHeroAutoplay() {
        startHeroAutoplay();
      }

      function isMobileHero() {
        return window.matchMedia("(max-width: 992px)").matches;
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

      function buildHeroDots() {
        if (!$heroSlides.length) return;
        $heroDots.empty();
        for (let i = 0; i < $heroSlides.length; i += 1) {
          const $dot = $("<button/>", {
            type: "button",
            class: "hero-dot" + (i === 0 ? " is-active" : ""),
            "aria-label": "메인 이미지 " + (i + 1) + "번 보기",
            "data-index": i
          });
          $heroDots.append($dot);
        }
      }

      function buildDots() {
        if (!$cards.length) return;
        $dots.empty();
        for (let i = 0; i < $cards.length; i += 1) {
          const $dot = $("<button/>", {
            type: "button",
            class: "popup-dot" + (i === 0 ? " is-active" : ""),
            "aria-label": "?앹뾽 " + (i + 1) + "踰?蹂닿린",
            "data-index": i
          });
          $dots.append($dot);
        }
      }

      buildHeroDots();
      buildDots();
      $popupTrack.find("img").on("load", scheduleFitDesktopPopup);
      $block.find(".hero-slide img").attr("draggable", "false");
      goHero(0);
      startHeroAutoplay();

      $heroPrev.on("click", function() {
        goHero(heroIndex - 1);
        restartHeroAutoplay();
      });

      $heroNext.on("click", function() {
        goHero(heroIndex + 1);
        restartHeroAutoplay();
      });

      $heroDots.on("click", ".hero-dot", function() {
        const index = Number($(this).data("index") || 0);
        goHero(index);
        restartHeroAutoplay();
      });

      $heroSlider.on("touchstart", function(event) {
        const touch = event.originalEvent.touches && event.originalEvent.touches[0];
        if (!touch || heroIsAnimating) return;
        heroTouchStartX = touch.clientX;
        heroTouchStartY = touch.clientY;
      });

      $heroSlider.on("touchend", function(event) {
        const touch = event.originalEvent.changedTouches && event.originalEvent.changedTouches[0];
        if (!touch) return;
        const diffX = touch.clientX - heroTouchStartX;
        const diffY = touch.clientY - heroTouchStartY;
        if (isMobileHero()) {
          if (Math.abs(diffX) < 40 || Math.abs(diffX) < Math.abs(diffY)) return;
          if (diffX < 0) {
            goHero(heroIndex + 1);
          } else {
            goHero(heroIndex - 1);
          }
          restartHeroAutoplay();
          return;
        }
        handleHeroGesture(diffX, diffY);
      });

      $block.on("mousedown", function(event) {
        if (event.button !== 0 || heroIsAnimating) return;
        if (!canStartHeroDrag(event.target)) return;
        heroMouseDown = true;
        heroDragMoved = false;
        heroMouseStartX = event.clientX;
        heroMouseStartY = event.clientY;
        heroMouseCurrentX = event.clientX;
        heroMouseCurrentY = event.clientY;
        stopHeroAutoplay();
        $heroSlider.addClass("is-dragging");
      });

      $(window).on("mousemove", function(event) {
        if (!heroMouseDown) return;
        heroMouseCurrentX = event.clientX;
        heroMouseCurrentY = event.clientY;

        const diffX = heroMouseCurrentX - heroMouseStartX;
        const diffY = heroMouseCurrentY - heroMouseStartY;

        if (!heroDragMoved && Math.abs(diffX) < 6 && Math.abs(diffY) < 6) return;
        if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > 12) {
          resetHeroDragState();
          startHeroAutoplay();
          renderHeroSlides();
          return;
        }

        heroDragMoved = true;
        applyHeroDrag(diffX);
      });

      $(window).on("mouseup", function(event) {
        if (!heroMouseDown) return;
        const diffX = (heroDragMoved ? heroMouseCurrentX : event.clientX) - heroMouseStartX;
        const diffY = (heroDragMoved ? heroMouseCurrentY : event.clientY) - heroMouseStartY;
        resetHeroDragState();
        if (!handleHeroGesture(diffX, diffY)) {
          renderHeroSlides();
          startHeroAutoplay();
        }
      });

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
      }
      else {
        goTo(0);
        scheduleFitDesktopPopup();
        startAutoplay();
      }

      onVisibilityChange = function() {
        if (document.hidden) {
          stopAutoplay();
          stopHeroAutoplay();
        } else {
          startHeroAutoplay();
          if (!$overlay.hasClass("is-hidden")) {
            startAutoplay();
          }
        }
      };
      document.addEventListener("visibilitychange", onVisibilityChange);

      $close.on("click", function() {
        stopAutoplay();
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
        speed: 820,
        grabCursor: true,
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



﻿(function() {
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

(function() {
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