(function () {
  const SITE_NAME = "양주 백석 모아엘가 그랑데";
  const FIXED_CONTENT_TITLE = "양주 백석 모아엘가 그랑데";
  const CONTENT_TITLE_LOGO_SRC = "../resources/images/logo_on.png";
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
      function (event) {
        if (isEditable(event.target)) return;
        event.preventDefault();
      },
      { capture: true }
    );

    document.addEventListener(
      "selectstart",
      function (event) {
        if (isEditable(event.target)) return;
        event.preventDefault();
      },
      { capture: true }
    );

    document.addEventListener(
      "copy",
      function (event) {
        if (isEditable(event.target)) return;
        event.preventDefault();
      },
      { capture: true }
    );

    document.addEventListener(
      "cut",
      function (event) {
        if (isEditable(event.target)) return;
        event.preventDefault();
      },
      { capture: true }
    );

    document.addEventListener(
      "dragstart",
      function (event) {
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
      function (event) {
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

  const MENU_CONFIG = {
    business: {
      label: "사업안내",
      topIndex: 0,
      tabs: [
        { key: "overview", label: "사업개요" },
        { key: "location", label: "입지환경" },
        { key: "brand", label: "브랜드소개" },
        { key: "premium", label: "프리미엄" },
      ],
    },
    complex: {
      label: "단지안내",
      topIndex: 1,
      tabs: [
        { key: "community", label: "커뮤니티" },
        { key: "siteplan", label: "단지배치도" },
        { key: "unitplan", label: "동 · 호수배치도" },
      ],
    },
    type: {
      label: "타입안내",
      topIndex: 2,
      tabs: [
        { key: "type", label: "타입안내" },
        { key: "interior", label: "인테리어" },
      ],
    },
    route: {
      label: "공공지원 민간임대",
      topIndex: 3,
      tabs: [{ key: "directions", label: "공공지원 민간임대" }],
    },
  };

  const TYPE_VARIANTS = {
    type: [
      { key: "59ac", label: "59m²A/C", image: "../resources/images/c1.png" },
      { key: "59bd", label: "59m²B/D", image: "../resources/images/c2.png" },
      { key: "84ac", label: "84m²A/C", image: "../resources/images/c3.png" },
      { key: "84bd", label: "84m²B/D", image: "../resources/images/c4.png" },
    ],
    interior: [
      { key: "59a", label: "59m²A", image: "../resources/images/d1.jpg" },
      { key: "84a", label: "84m²A", image: "../resources/images/d2.jpg" },
    ],
  };

  const ROUTE_ROUGHMAP = {
    timestamp: "1772015268708",
    key: "ibxtfyhijsi",
    desktopHeight: 460,
    mobileHeight: 360,
  };

  let roughmapLoaderPromise = null;
  let mobileLayoutGuardBound = false;

  const CONTENT_CONFIG = {
    business: {
      overview: {
        title: "양주 백석 모아엘가 그랑데 사업개요",
        subtitle: "양주역세권 '확신의 클래스'",
        copy: "양주역세권의 중심! 자부심을 선점하라!",
        copySub: "",
        image: "../resources/images/a1.png",
        specs: [
          ["사업명", "양주역세권지구 공동2 공동주택 신축공사"],
          ["공급위치", "경기도 양주시 남방동 581번지"],
          ["공급규모", "아파트 지하 최저 2층, 지상 최고 28층 4개동 총 526세대"],
        ],
        notes: [
          "상기 투시도는 소비자의 이해를 돕기 위해 제작된 CG컷으로 측면 그래픽, 분양 및 외부색채, 단지조경, 세부식재, 외관 디테일 등은 실제 시공 시 변경될 수 있습니다.",
          "상기 CG이미지의 조경 및 옹벽 계획 등은 고객의 이해를 돕기 위해 제작된 것으로 실제 시공 시 변경될 수 있습니다."
        ],
      },
      location: {
        title: "양주 백석 모아엘가 그랑데 입지환경",
        subtitle: "기다려온 양주의 새로운 중심,",
        copy: "기다려온 양주역세권 프리미엄",
        copySub: "",
        image: "../resources/images/a2_v1.png",
        specs: [],
        notes: [],
      },
      brand: {
        title: "양주 백석 모아엘가 그랑데 브랜드소개",
        subtitle: "'사는 이의 자부심과 품격이 남다른'",
        copy: "명품 라이프 브랜드",
        copySub: "",
        image: "",
        images: ["../resources/images/a3.png", "../resources/images/a3_v1.png"],
        specs: [],
        notes: [],
      },
      premium: {
        title: "양주 백석 모아엘가 그랑데 프리미엄",
        subtitle: "기다려온 양주의 새로운 중심.",
        copy: "기다려온 양주역세권 프리미엄",
        copySub: "",
        image: "../resources/images/a4.png",
        specs: [],
        notes: [],
      },
      default: {
        title: "양주 백석 모아엘가 그랑데",
        subtitle: "프로젝트 정보",
        copy: "해당 메뉴의 상세 이미지를 이 영역에 배치합니다.",
        copySub: "",
        image: "",
        specs: [],
        notes: [],
      },
    },
    complex: {
      design: {
        subtitle: "단지설계",
        copy: "양주의 새로운 중심에서 만나는",
        copySub: "모아엘가 그랑데의 프리미엄 라이프!",
        image: "../resources/images/complex guide1.jpg",
      },
      community: {
        subtitle: "커뮤니티",
        copy: "온 가족이 함께 즐기는 고품격 커뮤니티 라이프",
        copySub: "",
        image: "../resources/images/b1.jpg",
      },
      siteplan: {
        subtitle: "단지배치도",
        copy: "즐거움과 휴식을 선사하는 쾌적한 힐링 단지",
        copySub: "",
        image: "",
        images: ["../resources/images/b2.jpg", "../resources/images/b2_1.jpg"],
      },
      unitplan: {
        subtitle: "동호수배치도",
        copy: "즐거움과 휴식을 선사하는 쾌적한 힐링 단지",
        copySub: "",
        image: "../resources/images/b3.jpg",
      },
      system: {
        subtitle: "시스템",
        copy: "스마트하고 안전한 시스템 최첨단 생활에 윤택함을 더하다!",
        copySub: "",
        image: "../resources/images/complex guide5.jpg",
      },
      default: {
        title: "양주 백석 모아엘가 그랑데",
        subtitle: "단지 안내",
        copy: "해당 메뉴의 상세 이미지를 이 영역에 배치합니다.",
        copySub: "",
        image: "",
        specs: [],
        notes: [],
      },
    },
    type: {
      type: {
        title: "양주 백석 모아엘가 그랑데",
        subtitle: "중소형 특화 총 526세대 브랜드 단지",
        copy: "선호도 높은 평형(59㎡/84㎡)",
        copySub: "",
        image: "",
        specs: [],
        notes: [],
      },
      interior: {
        title: "양주 백석 모아엘가 그랑데",
        subtitle: "중소형 특화 총 526세대 브랜드 단지",
        copy: "선호도 높은 평형(59㎡/84㎡)",
        copySub: "",
        image: "",
        specs: [],
        notes: [],
      },
      default: {
        title: "양주 백석 모아엘가 그랑데",
        subtitle: "타입 안내",
        copy: "해당 메뉴의 상세 이미지를 이 영역에 배치합니다.",
        copySub: "",
        image: "",
        specs: [],
        notes: [],
      },
    },
    route: {
      default: {
        title: "양주 백석 모아엘가 그랑데",
        subtitle: "주거의 새로운 패러다임",
        copy: "합리적인 임대료로 10년까지 보장!",
        copySub: "",
        image: "../resources/images/m1.png",
        specs: [],
        notes: [],
      },
    },
  };

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function renderSpecs(specs) {
    const wrapEl = document.getElementById("menupage-spec");
    const bodyEl = document.getElementById("menupage-spec-body");
    if (!wrapEl || !bodyEl) return;

    if (!Array.isArray(specs) || specs.length === 0) {
      bodyEl.innerHTML = "";
      wrapEl.hidden = true;
      return;
    }

    bodyEl.innerHTML = specs
      .map((item) => {
        const key = Array.isArray(item) ? item[0] : "";
        const value = Array.isArray(item) ? item[1] : "";
        return `<tr><th scope="row">${escapeHtml(key)}</th><td>${escapeHtml(value)}</td></tr>`;
      })
      .join("");
    wrapEl.hidden = false;
  }

  function renderNotes(notes) {
    const wrapEl = document.getElementById("menupage-notes");
    const listEl = document.getElementById("menupage-notes-list");
    if (!wrapEl || !listEl) return;

    if (!Array.isArray(notes) || notes.length === 0) {
      listEl.innerHTML = "";
      wrapEl.hidden = true;
      return;
    }

    listEl.innerHTML = notes
      .map((line) => `<li>${escapeHtml(line)}</li>`)
      .join("");
    wrapEl.hidden = false;
  }

  function getStateFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const group = params.get("group");
    const tab = params.get("tab");
    const variant = params.get("variant");

    if (!group || !MENU_CONFIG[group]) {
      return { group: "business", tab: "overview", variant: "" };
    }

    const hasTab = MENU_CONFIG[group].tabs.some((item) => item.key === tab);
    const resolvedTab = hasTab ? tab : MENU_CONFIG[group].tabs[0].key;
    const variants = TYPE_VARIANTS[resolvedTab] || [];
    const defaultVariant = variants[0] ? variants[0].key : "";
    const resolvedVariant =
      group === "type" && variants.some((item) => item.key === variant)
        ? variant
        : group === "type"
        ? defaultVariant
        : "";

    return {
      group,
      tab: resolvedTab,
      variant: resolvedVariant,
    };
  }

  function setHeaderActive(group) {
    const topIndex = MENU_CONFIG[group].topIndex;
    document
      .querySelectorAll(".properties-N1 .header-gnblist > .header-gnbitem")
      .forEach((item) => item.classList.remove("menu-current"));
    document
      .querySelectorAll(".properties-N1 .fullmenu-gnblist > .fullmenu-gnbitem")
      .forEach((item) => item.classList.remove("menu-current"));

    const headerItem = document.querySelectorAll(
      ".properties-N1 .header-gnblist > .header-gnbitem"
    )[topIndex];
    const fullMenuItem = document.querySelectorAll(
      ".properties-N1 .fullmenu-gnblist > .fullmenu-gnbitem"
    )[topIndex];

    if (headerItem) headerItem.classList.add("menu-current");
    if (fullMenuItem) fullMenuItem.classList.add("menu-current");
  }

  function renderTabs(group, tab, variant) {
    const wrap = document.getElementById("menupage-tabs");
    const tabs = MENU_CONFIG[group].tabs;

    wrap.innerHTML = tabs
      .map((item) => {
        const activeClass = item.key === tab ? "is-active" : "";
        const variants = TYPE_VARIANTS[item.key] || [];
        const defaultVariant = variants[0] ? variants[0].key : "";
        const targetVariant =
          group === "type" && variants.some((entry) => entry.key === variant)
            ? variant
            : defaultVariant;
        const variantQuery =
          group === "type" && targetVariant
            ? `&variant=${encodeURIComponent(targetVariant)}`
            : "";
        return `<a class="menupage-tab ${activeClass}" href="./menu-page.html?group=${group}&tab=${item.key}${variantQuery}">${item.label}</a>`;
      })
      .join("");
  }

  function renderHero(group, tab) {
    const tabInfo = MENU_CONFIG[group].tabs.find((item) => item.key === tab);
    const title = tabInfo ? tabInfo.label : MENU_CONFIG[group].label;
    const kicker = MENU_CONFIG[group].label;

    const kickerEl = document.getElementById("menupage-kicker");
    const titleEl = document.getElementById("menupage-title");
    const subtitleEl = document.getElementById("menupage-subtitle");

    if (kickerEl) kickerEl.textContent = kicker;
    titleEl.textContent = title;
    subtitleEl.textContent = SITE_NAME;
  }

  function setCanvasImage(canvasEl, imageEl, placeholderEl, imageSrc, imageAlt, imageSrcList) {
    const oldStack = canvasEl.querySelector(".menupage-image-stack");
    if (oldStack) oldStack.remove();

    const stackSources = Array.isArray(imageSrcList)
      ? imageSrcList.filter((src) => typeof src === "string" && src.trim())
      : [];

    if (stackSources.length > 0) {
      imageEl.removeAttribute("src");
      imageEl.hidden = true;
      placeholderEl.hidden = true;
      canvasEl.classList.add("has-image");

      const stack = document.createElement("div");
      stack.className = "menupage-image-stack";
      stackSources.forEach((src) => {
        const img = document.createElement("img");
        img.src = src;
        img.alt = imageAlt;
        img.decoding = "async";
        img.loading = "eager";
        img.addEventListener("error", function onError() {
          if (img.dataset.fallbackTried === "1") {
            img.removeEventListener("error", onError);
            img.remove();
            return;
          }
          if (/\.png$/i.test(src)) {
            img.dataset.fallbackTried = "1";
            img.src = src.replace(/\.png$/i, ".jpg");
            return;
          }
          img.removeEventListener("error", onError);
          img.remove();
        });
        stack.appendChild(img);
      });
      canvasEl.appendChild(stack);
      return;
    }

    if (imageSrc) {
      imageEl.onerror = function onSingleError() {
        if (imageEl.dataset.fallbackTried === "1") {
          imageEl.onerror = null;
          return;
        }
        if (/\.png$/i.test(imageSrc)) {
          imageEl.dataset.fallbackTried = "1";
          imageEl.src = imageSrc.replace(/\.png$/i, ".jpg");
          return;
        }
        imageEl.onerror = null;
      };
      imageEl.dataset.fallbackTried = "0";
      imageEl.src = imageSrc;
      imageEl.alt = imageAlt;
      imageEl.hidden = false;
      placeholderEl.hidden = true;
      canvasEl.classList.add("has-image");
    } else {
      imageEl.removeAttribute("src");
      imageEl.hidden = true;
      placeholderEl.hidden = false;
      canvasEl.classList.remove("has-image");
    }
  }

  function ensureRoughmapLoader() {
    if (
      window.daum &&
      window.daum.roughmap &&
      typeof window.daum.roughmap.Lander === "function"
    ) {
      return Promise.resolve();
    }

    if (roughmapLoaderPromise) return roughmapLoaderPromise;

    roughmapLoaderPromise = new Promise((resolve, reject) => {
      const protocol = window.location.protocol === "https:" ? "https:" : "http:";
      const cdnDomain = "//t1.daumcdn.net";
      const phase = "prod";
      const cdn = "20250630";

      window.daum = window.daum || {};
      window.daum.roughmap = window.daum.roughmap || {
        phase,
        cdn,
        URL_KEY_DATA_LOAD_PRE: `${protocol}${cdnDomain}/roughmap/`,
        url_protocal: protocol,
        url_cdn_domain: cdnDomain,
      };

      const scriptSrc = `${protocol}//t1.daumcdn.net/kakaomapweb/roughmap/place/${phase}/${cdn}/roughmapLander.js`;
      const checkReady = () => {
        if (
          window.daum &&
          window.daum.roughmap &&
          typeof window.daum.roughmap.Lander === "function"
        ) {
          resolve();
        } else {
          reject(new Error("카카오 지도 스크립트 초기화에 실패했습니다."));
        }
      };

      let script = document.querySelector("script[data-roughmap-lander='true']");
      if (!script) {
        script = document.createElement("script");
        script.charset = "UTF-8";
        script.src = scriptSrc;
        script.setAttribute("data-roughmap-lander", "true");
        script.onload = () => checkReady();
        script.onerror = () =>
          reject(new Error("카카오 지도 스크립트를 불러오지 못했습니다."));
        document.head.appendChild(script);
      } else {
        // 이미 로드된 경우 즉시 상태 확인
        setTimeout(checkReady, 0);
      }
    });

    return roughmapLoaderPromise;
  }

  function teardownRouteMap(canvasEl) {
    if (!canvasEl) return;
    canvasEl.classList.remove("has-route-map");
    const mapWrap = canvasEl.querySelector(".menupage-route-map-wrap");
    if (mapWrap) mapWrap.remove();
  }

  function renderRouteRoughMap(canvasEl, imageEl, placeholderEl, imageAlt) {
    if (!canvasEl || !imageEl || !placeholderEl) return;

    imageEl.hidden = true;
    imageEl.removeAttribute("src");
    placeholderEl.hidden = true;
    canvasEl.classList.remove("has-image");
    canvasEl.classList.add("has-route-map");

    const existingWrap = canvasEl.querySelector(".menupage-route-map-wrap");
    if (existingWrap) existingWrap.remove();

    const mapWrap = document.createElement("div");
    mapWrap.className = "menupage-route-map-wrap";

    const mapNode = document.createElement("div");
    mapNode.id = `daumRoughmapContainer${ROUTE_ROUGHMAP.timestamp}`;
    mapNode.className = "root_daum_roughmap root_daum_roughmap_landing menupage-route-map-node";
    mapNode.setAttribute("aria-label", imageAlt || "공공지원 민간임대 안내 지도");
    mapWrap.appendChild(mapNode);

    const mapInfo = document.createElement("div");
    mapInfo.className = "menupage-route-map-info";

    const addressRow = document.createElement("p");
    addressRow.className = "menupage-route-map-info-row is-address";
    addressRow.innerHTML =
      '<span class="menupage-route-map-info-icon is-map" aria-hidden="true"></span><span class="menupage-route-map-info-text"><span class="menupage-route-map-info-label">현장 주소 :</span> 경기도 양주시 백석읍 복지리 279-1 일원(양주 복지지구 80BL)</span>';

    const showroomRow = document.createElement("p");
    showroomRow.className = "menupage-route-map-info-row is-showroom";
    showroomRow.innerHTML =
      '<span class="menupage-route-map-info-icon is-home" aria-hidden="true"></span><span class="menupage-route-map-info-text"><span class="menupage-route-map-info-label">모델하우스 :</span> 방문예약 또는 전화주시면 문자로 안내해 드립니다.</span>';

    const inquiryRow = document.createElement("p");
    inquiryRow.className = "menupage-route-map-info-row is-inquiry";
    inquiryRow.innerHTML =
      '<span class="menupage-route-map-info-icon is-phone" aria-hidden="true"></span><span class="menupage-route-map-info-text"><span class="menupage-route-map-info-label">분양문의 :</span> 1688-4008</span>';

    mapInfo.appendChild(addressRow);
    mapInfo.appendChild(showroomRow);
    mapInfo.appendChild(inquiryRow);
    mapWrap.appendChild(mapInfo);
    canvasEl.appendChild(mapWrap);

    const canvasWidth =
      Math.floor(canvasEl.getBoundingClientRect().width) || canvasEl.clientWidth || 640;
    const mapWidth = Math.max(320, canvasWidth);
    const mapHeight =
      window.innerWidth <= 992
        ? ROUTE_ROUGHMAP.mobileHeight
        : ROUTE_ROUGHMAP.desktopHeight;

    ensureRoughmapLoader()
      .then(() => {
        if (
          !window.daum ||
          !window.daum.roughmap ||
          typeof window.daum.roughmap.Lander !== "function"
        ) {
          throw new Error("카카오 지도 객체가 초기화되지 않았습니다.");
        }
        if (!document.getElementById(`daumRoughmapContainer${ROUTE_ROUGHMAP.timestamp}`)) {
          return;
        }

        new window.daum.roughmap.Lander({
          timestamp: ROUTE_ROUGHMAP.timestamp,
          key: ROUTE_ROUGHMAP.key,
          mapWidth: String(mapWidth),
          mapHeight: String(mapHeight),
        }).render();
      })
      .catch(() => {
        // 지도 로딩 실패 시 기본 플레이스홀더를 다시 보여준다.
        teardownRouteMap(canvasEl);
        placeholderEl.hidden = false;
        placeholderEl.querySelector("strong").textContent = "지도를 불러오지 못했습니다.";
      });
  }

  function playCanvasSwapAnimation(canvasEl) {
    if (!canvasEl) return;
    canvasEl.classList.remove("menupage-swap-up");
    void canvasEl.offsetWidth;
    canvasEl.classList.add("menupage-swap-up");
  }

  function renderTypeVariantTabs(group, tab, variant, onVariantChange) {
    const canvasEl = document.getElementById("menupage-canvas");
    if (!canvasEl || !canvasEl.parentNode) return null;

    let wrap = document.getElementById("menupage-variant-tabs");
    if (!wrap) {
      wrap = document.createElement("div");
      wrap.id = "menupage-variant-tabs";
      wrap.className = "menupage-variant-tabs";
      canvasEl.parentNode.insertBefore(wrap, canvasEl);
    }

    if (group !== "type") {
      wrap.hidden = true;
      wrap.innerHTML = "";
      wrap.onclick = null;
      return null;
    }

    const variants = TYPE_VARIANTS[tab] || [];
    if (variants.length === 0) {
      wrap.hidden = true;
      wrap.innerHTML = "";
      wrap.onclick = null;
      return null;
    }

    let selected = variants.find((item) => item.key === variant) || variants[0];

    wrap.hidden = false;
    wrap.innerHTML = variants
      .map((item) => {
        const activeClass = item.key === selected.key ? "is-active" : "";
        return `<button type="button" class="menupage-variant-tab ${activeClass}" data-variant-key="${escapeHtml(
          item.key
        )}">${escapeHtml(item.label)}</button>`;
      })
      .join("");

    wrap.onclick = (event) => {
      const btn = event.target.closest(".menupage-variant-tab");
      if (!btn || !wrap.contains(btn)) return;

      const nextKey = btn.getAttribute("data-variant-key");
      if (!nextKey || nextKey === selected.key) return;

      const next = variants.find((item) => item.key === nextKey);
      if (!next) return;

      selected = next;
      wrap.querySelectorAll(".menupage-variant-tab").forEach((tabEl) => {
        tabEl.classList.toggle(
          "is-active",
          tabEl.getAttribute("data-variant-key") === selected.key
        );
      });

      if (typeof onVariantChange === "function") {
        onVariantChange(selected);
      }

      const url = new URL(window.location.href);
      url.searchParams.set("group", "type");
      url.searchParams.set("tab", tab);
      url.searchParams.set("variant", selected.key);
      window.history.replaceState({}, "", `${url.pathname}?${url.searchParams.toString()}`);
    };

    return selected;
  }

  function renderContent(group, tab, variant) {
    const groupContent = CONTENT_CONFIG[group] || {};
    const content = groupContent[tab] || groupContent.default || {};

    const title = FIXED_CONTENT_TITLE;
    const subtitle = content.subtitle || "상세 정보";
    const copy =
      content.copy || "해당 메뉴의 상세 이미지를 이 영역에 배치합니다.";
    const copySub = content.copySub || "";
    const specs = content.specs || [];
    const notes = content.notes || [];

    const titleEl = document.getElementById("menupage-content-title");
    const subtitleEl = document.getElementById("menupage-content-subtitle");
    const copyEl = document.getElementById("menupage-content-copy");
    const copySubEl = document.getElementById("menupage-content-copy-sub");
    const canvasEl = document.getElementById("menupage-canvas");
    const imageEl = document.getElementById("menupage-image");
    const placeholderEl = document.getElementById("menupage-placeholder");
    const selectedVariant = renderTypeVariantTabs(group, tab, variant, (nextVariant) => {
      setCanvasImage(canvasEl, imageEl, placeholderEl, nextVariant.image, title);
      playCanvasSwapAnimation(canvasEl);
    });
    const resolvedImage =
      group === "type" && selectedVariant && selectedVariant.image
        ? selectedVariant.image
        : content.image || "";
    canvasEl.classList.toggle("has-variant-tabs", group === "type" && !!selectedVariant);

    titleEl.textContent = "";
    const logoImg = document.createElement("img");
    logoImg.className = "menupage-content-title-logo";
    logoImg.src = CONTENT_TITLE_LOGO_SRC;
    logoImg.alt = title;
    logoImg.decoding = "async";
    logoImg.loading = "eager";
    titleEl.appendChild(logoImg);
    subtitleEl.textContent = subtitle;
    copyEl.textContent = copy;
    if (copySubEl) {
      if (copySub) {
        copySubEl.hidden = false;
        copySubEl.textContent = copySub;
      } else {
        copySubEl.hidden = true;
        copySubEl.textContent = "";
      }
    }

    teardownRouteMap(canvasEl);
    setCanvasImage(
      canvasEl,
      imageEl,
      placeholderEl,
      resolvedImage,
      title,
      content.images || []
    );

    renderSpecs(specs);
    renderNotes(notes);
  }

  function initContentReveal() {
    const leftEl = document.querySelector(".menupage-content-title-wrap");
    const rightEl = document.querySelector(".menupage-content-lead");
    const upEl = document.querySelector(".menupage-canvas");
    const variantTabsEl = document.getElementById("menupage-variant-tabs");
    const triggerEl = document.querySelector(".menupage-content");

    if (!leftEl || !rightEl || !upEl || !triggerEl) return;

    const upTargets = [upEl];
    if (variantTabsEl && !variantTabsEl.hidden) {
      upTargets.push(variantTabsEl);
    }

    const revealClasses = ["menupage-reveal-left", "menupage-reveal-right", "menupage-reveal-up"];
    const prepClasses = ["menupage-pre-left", "menupage-pre-right", "menupage-pre-up"];
    const instantClass = "menupage-reveal-visible";

    leftEl.classList.remove(...revealClasses, ...prepClasses, instantClass);
    rightEl.classList.remove(...revealClasses, ...prepClasses, instantClass);
    upTargets.forEach((el) => el.classList.remove(...revealClasses, ...prepClasses, instantClass));

    leftEl.classList.add("menupage-pre-left");
    rightEl.classList.add("menupage-pre-right");
    upTargets.forEach((el) => el.classList.add("menupage-pre-up"));

    if (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      leftEl.classList.remove("menupage-pre-left");
      rightEl.classList.remove("menupage-pre-right");
      upTargets.forEach((el) => el.classList.remove("menupage-pre-up"));
      [leftEl, rightEl, ...upTargets].forEach((el) => el.classList.add(instantClass));
      return;
    }

    const play = () => {
      leftEl.classList.remove("menupage-pre-left");
      rightEl.classList.remove("menupage-pre-right");
      upTargets.forEach((el) => el.classList.remove("menupage-pre-up"));
      leftEl.classList.add("menupage-reveal-left");
      rightEl.classList.add("menupage-reveal-right");
      upTargets.forEach((el) => el.classList.add("menupage-reveal-up"));
    };

    const replay = () => {
      void triggerEl.offsetHeight;
      play();
    };

    if (!("IntersectionObserver" in window)) {
      replay();
      return;
    }

    let played = false;
    let fallbackTimer = null;
    const playOnce = () => {
      if (played) return;
      played = true;
      replay();
      observer.disconnect();
      if (fallbackTimer) {
        clearTimeout(fallbackTimer);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          playOnce();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -5% 0px",
      }
    );

    observer.observe(triggerEl);

    fallbackTimer = setTimeout(playOnce, 500);
  }

  function isMobileViewport() {
    return window.matchMedia("(max-width: 992px)").matches;
  }

  function hoistFixedConsultBar() {
    const fixedBar = document.querySelector(".menu-page-view .fixed-consult-bar.is-split");
    if (!fixedBar || fixedBar.dataset.fixedHoisted === "true") return;
    fixedBar.dataset.fixedHoisted = "true";
    document.body.appendChild(fixedBar);
  }

  function stabilizeMobileMenuLayout() {
    const header = document.querySelector(".menu-page-view .properties-N1");
    if (!header) return;

    hoistFixedConsultBar();

    const fixedBar = document.querySelector(".menu-page-view .fixed-consult-bar.is-split");

    // 메뉴 상세페이지 이동 후 남는 헤더/메뉴 상태를 정리한다.
    header.classList.remove("block-active");
    header.querySelectorAll(".header-gnbitem").forEach((item) => {
      item.classList.remove("item-active");
    });

    const fullMenu = header.querySelector(".header-fullmenu");
    if (fullMenu) {
      fullMenu.classList.remove("fullmenu-active");
    }

    header.querySelectorAll(".header-sublist").forEach((sublist) => {
      sublist.style.display = "";
      sublist.style.height = "";
      sublist.style.overflow = "";
    });

    if (isMobileViewport()) {
      document.documentElement.style.setProperty("overflow-x", "hidden");
      document.body.style.setProperty("overflow-x", "hidden");
    } else {
      document.documentElement.style.removeProperty("overflow-x");
      document.body.style.removeProperty("overflow-x");
    }

    if (fixedBar) {
      fixedBar.style.removeProperty("position");
      fixedBar.style.removeProperty("left");
      fixedBar.style.removeProperty("right");
      fixedBar.style.removeProperty("bottom");
      fixedBar.style.removeProperty("width");
      fixedBar.style.removeProperty("max-width");
      fixedBar.style.removeProperty("z-index");
      fixedBar.style.removeProperty("transform");
      fixedBar.style.removeProperty("-webkit-transform");
    }
  }

  function bindMobileLayoutGuard() {
    if (mobileLayoutGuardBound) return;
    mobileLayoutGuardBound = true;

    const run = () => {
      stabilizeMobileMenuLayout();
      window.requestAnimationFrame(stabilizeMobileMenuLayout);
      window.setTimeout(stabilizeMobileMenuLayout, 120);
    };

    window.addEventListener("pageshow", run);
    window.addEventListener("resize", run);
    window.addEventListener("orientationchange", run);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") run();
    });
  }

  function initMenuPage() {
    initBasicContentGuard();

    const { group, tab, variant } = getStateFromUrl();
    setHeaderActive(group);
    renderHero(group, tab);
    renderTabs(group, tab, variant);
    renderContent(group, tab, variant);
    initContentReveal();
    bindMobileLayoutGuard();
    stabilizeMobileMenuLayout();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initMenuPage);
  } else {
    initMenuPage();
  }
})();

