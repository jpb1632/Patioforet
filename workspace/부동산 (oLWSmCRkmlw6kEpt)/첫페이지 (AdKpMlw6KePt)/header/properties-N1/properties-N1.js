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

      function getConsultationTarget() {
        return document.querySelector(".properties-N9 .consultation-anchor");
      }

      function scrollToConsultation(behavior) {
        const target = getConsultationTarget();
        if (!target) return false;

        const headerHeight = $block.outerHeight() || 96;
        const targetRect = target.getBoundingClientRect();
        const extraOffset = window.innerWidth <= 992 ? 10 : 18;
        const targetTop = targetRect.top + window.scrollY - headerHeight - extraOffset;

        window.scrollTo({
          top: Math.max(0, targetTop),
          behavior: behavior || "smooth"
        });

        return true;
      }

      function clearConsultationLocation() {
        const params = new URLSearchParams(window.location.search);
        params.delete("consultation");

        const nextSearch = params.toString();
        const nextHash = window.location.hash === "#consultation" ? "" : window.location.hash;
        const nextUrl = `${window.location.pathname}${nextSearch ? `?${nextSearch}` : ""}${nextHash}`;

        history.replaceState(null, "", nextUrl);
      }

      function handleInitialConsultationRequest() {
        const params = new URLSearchParams(window.location.search);
        const shouldScroll = params.get("consultation") === "1" || window.location.hash === "#consultation";
        if (!shouldScroll) return;

        let attempts = 0;

        const run = function() {
          attempts += 1;

          if (scrollToConsultation(attempts === 1 ? "auto" : "smooth")) {
            clearConsultationLocation();
            return;
          }

          if (attempts < 6) {
            window.setTimeout(run, 180);
          }
        };

        window.setTimeout(run, 180);
      }

      function bindConsultationShortcut() {
        const $consultationLinks = $block.find(".header-reserve-link[href='#consultation']");
        if (!$consultationLinks.length) return;

        $consultationLinks.off("click.consultationShortcut").on("click.consultationShortcut", function(event) {
          event.preventDefault();
          if (!scrollToConsultation("smooth")) return;

          $block.removeClass("block-active");
          $block.find(".header-fullmenu").removeClass("fullmenu-active");
          clearConsultationLocation();
        });
      }

      handleFullMenu();
      bindConsultationShortcut();
      handleInitialConsultationRequest();
      // 리사이즈 시마다 메뉴 동작 초기화
      $(window).on("resize", function() {
        handleResize();
      });
      handleResize();
    });
  });
})();

