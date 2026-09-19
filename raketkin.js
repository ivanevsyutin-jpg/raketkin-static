/* raketkin.shop — вспомогательный скрипт (грузится как внешний файл, HEAD не раздувается) */
(function () {
  "use strict";

  // 0) Мобильные фиксы вёрстки (инъекция CSS один раз; HEAD не трогаем).
  try {
    if (!window.__rkMobCss) {
      window.__rkMobCss = true;
      var mc = document.createElement("style");
      mc.textContent =
        "@media (max-width:640px){" +
        /* 0) hero-заголовок не должен вылезать за правый край */
        ".kr-h1{overflow-wrap:break-word!important;word-break:break-word!important}" +
        ".kr-hero{overflow:hidden!important}" +
        /* 1) боковой отступ описания товара */
        ".t-store__prod-popup__text,.js-store-prod-all-text{padding-left:20px!important;padding-right:20px!important;box-sizing:border-box!important}" +
        /* 2) одинаковая высота карточек каталога */
        ".t-store__card-list{align-items:stretch!important}" +
        ".t-store__card{height:auto!important}" +
        ".t-store__card__title,.js-store-prod-name{min-height:2.9em!important}" +
        /* 3) чипы-фильтры брендов в одну строку (nowrap + сжатие, скролл при нехватке) */
        ".t-store__parts-switch-wrapper{flex-wrap:nowrap!important;overflow-x:auto!important;-webkit-overflow-scrolling:touch;justify-content:flex-start!important;gap:8px!important;scrollbar-width:none}" +
        ".t-store__parts-switch-wrapper::-webkit-scrollbar{display:none}" +
        ".t-store__parts-item{flex:0 0 auto!important;margin:0!important}" +
        ".t-store__parts-switch-btn{white-space:nowrap!important;padding:9px 14px!important;font-size:14px!important}" +
        /* 4a) кнопки героя в одну строку */
        ".kr-cta{flex-wrap:nowrap!important;gap:10px!important}" +
        ".kr-cta .kr-btn{flex:1 1 0!important;min-width:0!important;padding:14px 6px!important;font-size:14px!important;white-space:nowrap!important;text-align:center!important}" +
        /* 4b) логотипы брендов в одну строку */
        ".kr-brands{flex-wrap:nowrap!important;gap:7px!important;align-items:center!important}" +
        ".kr-blogo{flex:1 1 0!important;min-width:0!important;padding:8px 6px!important}" +
        ".kr-blogo img{max-width:100%!important;height:auto!important}" +
        "}";
      (document.head || document.documentElement).appendChild(mc);
    }
  } catch (e) {}

  // 1) Локализация системных строк корзины Tilda
  function setTxt(el, t) { if (el && el.textContent !== t) el.textContent = t; }
  function fixCart() {
    document.querySelectorAll(".t706__cartwin-prodamount-label").forEach(function (e) { setTxt(e, "Товары:"); });
    // Внутри блока итогов первая строка = Подытог, вторая (платная доставка) = Доставка.
    document.querySelectorAll(".t706__cartwin-totalamount-info").forEach(function (info) {
      info.querySelectorAll(".t706__cartwin-totalamount-info_label").forEach(function (l, i) {
        setTxt(l, i === 0 ? "Подытог:" : "Доставка:");
      });
    });
    document.querySelectorAll(".t706__cartwin-totalamount-label").forEach(function (e) { setTxt(e, "Итого:"); });
  }

  // 2) Промо: «до конца июня» -> «до конца июля» (ловит и hero, и карточку товара)
  function fixPromo() {
    var w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null), n;
    while ((n = w.nextNode())) {
      if (n.nodeValue.indexOf("до конца июня") > -1) {
        n.nodeValue = n.nodeValue.replace(/до конца июня/g, "до конца июля");
      }
    }
  }

  // 4) SEO: Product JSON-LD на страницах товара (Tilda его НЕ отдаёт — даём сами).
  function injectProduct() {
    if (window.__rkProduct) return;
    if (!/\/tproduct\//.test(location.pathname)) return;
    // первый .js-store-product = основной товар (дальше идут рекомендации)
    var main = document.querySelector(".js-store-product");
    var h1 = document.querySelector("h1");
    if (!main || !h1) return; // контент товара ещё не отрендерился
    var name = (h1.textContent || "").trim();
    var priceEl = main.querySelector(".js-store-prod-price-val");
    var price = priceEl ? (priceEl.getAttribute("data-product-price-def") || "") : "";
    if (!price && priceEl) {
      // запасной разбор текста: берём целую часть до копеек
      var t = (priceEl.textContent || "").replace(/\s| /g, "");
      price = (t.replace(/[.,]\d{1,2}$/, "").match(/\d+/) || [""])[0];
    }
    if (price) price = String(parseFloat(price)); // "25690.0000" -> "25690"
    if (!name || !price || price === "NaN") return;
    var invAttr = main.getAttribute("data-product-inv");
    if (invAttr === null || invAttr === "") return; // ждём, пока Tilda проставит остаток
    window.__rkProduct = true;
    var inv = parseInt(invAttr, 10);
    var avail = (isNaN(inv) || inv > 0) ? "https://schema.org/InStock" : "https://schema.org/OutOfStock";
    var ogImg = document.querySelector('meta[property="og:image"]');
    var img = ogImg ? ogImg.content : "";
    var descM = document.querySelector('meta[name="description"]');
    var desc = descM ? descM.content : name;
    var sku = (document.body.innerText.match(/(?:SKU|\u0410\u0440\u0442\u0438\u043a\u0443\u043b)\s*[:\u2116]?\s*(p\d{3})/i) || [])[1] || "";
    var brand = "";
    ["Bullpadel", "Babolat", "Nox", "Head"].forEach(function (b) {
      if (!brand && name.toLowerCase().indexOf(b.toLowerCase()) > -1) brand = b;
    });
    var data = {
      "@context": "https://schema.org", "@type": "Product",
      "name": name, "image": img, "description": desc,
      "category": "Ракетки для падел-тенниса",
      "offers": {
        "@type": "Offer", "url": location.href.split("?")[0],
        "priceCurrency": "RUB", "price": price, "availability": avail,
        "itemCondition": "https://schema.org/NewCondition",
        "seller": { "@type": "Organization", "name": "Ракеткин" },
        "hasMerchantReturnPolicy": {
          "@type": "MerchantReturnPolicy",
          "applicableCountry": "RU",
          "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
          "merchantReturnDays": 14,
          "returnMethod": "https://schema.org/ReturnByMail",
          "returnFees": "https://schema.org/ReturnShippingFees"
        },
        "shippingDetails": {
          "@type": "OfferShippingDetails",
          "shippingRate": { "@type": "MonetaryAmount", "value": "500", "currency": "RUB" },
          "shippingDestination": { "@type": "DefinedRegion", "addressCountry": "RU", "addressRegion": "Москва" },
          "deliveryTime": {
            "@type": "ShippingDeliveryTime",
            "handlingTime": { "@type": "QuantitativeValue", "minValue": 0, "maxValue": 0, "unitCode": "DAY" },
            "transitTime": { "@type": "QuantitativeValue", "minValue": 0, "maxValue": 1, "unitCode": "DAY" }
          }
        }
      }
    };
    if (sku) data.mpn = sku;
    if (sku) data.sku = sku;
    if (brand) data.brand = { "@type": "Brand", "name": brand };
    var s = document.createElement("script");
    s.type = "application/ld+json";
    s.textContent = JSON.stringify(data);
    document.head.appendChild(s);
  }

  // 5) Наличие: локализуем кнопку Tilda "Out of stock" и синхроним кастомный бейдж
  //    "В наличии" с реальным остатком (иначе на нулевом товаре бейдж врёт «В наличии»).
  function fixAvail() {
    document.querySelectorAll(".js-store-prod-popup-buy-btn-txt").forEach(function (e) {
      if (/out of stock/i.test(e.textContent)) e.textContent = "Нет в наличии";
    });
    if (!/\/tproduct\//.test(location.pathname)) return;
    var main = document.querySelector(".js-store-product");
    var badge = document.querySelector(".kr-pp-stock");
    if (!main || !badge) return;
    var invAttr = main.getAttribute("data-product-inv");
    if (invAttr === null || invAttr === "") return;
    var inv = parseInt(invAttr, 10);
    if (!isNaN(inv) && inv <= 0 && badge.getAttribute("data-rk-oos") !== "1") {
      badge.setAttribute("data-rk-oos", "1");
      badge.textContent = "Нет в наличии"; // очищает зелёную галочку-svg
      badge.style.color = "#c58a2e";
      badge.style.opacity = "0.85";
    }
  }

  // 6) Подарок: убрать «защита обода», подарок зависит от бренда
  //    (Bullpadel и p017 — только намотка; остальные — намотка + чехол).
  function fixGift() {
    if (!/\/tproduct\//.test(location.pathname)) return;
    var gift = document.querySelector(".kr-pop-gift");
    if (!gift) return;
    var span = gift.querySelector("span:last-child");
    if (!span || span.getAttribute("data-rk-gift") === "1") return;
    var og = rkOnlyGrip(); if (og === null) return;
    var onlyGrip = og;
    var items = onlyGrip ? "овергрип (намотку)" : "защитный чехол и овергрип";
    span.textContent = "В подарок при заказе ракетки: " + items;
    span.setAttribute("data-rk-gift", "1");
  }

  // 7) Каталог: плашка «Нет в наличии» + приглушение картинки на распроданных.
  function fixCatalog() {
    var cards = document.querySelectorAll(".js-product[data-product-inv]");
    if (!cards.length) return;
    cards.forEach(function (c) {
      var inv = parseInt(c.getAttribute("data-product-inv"), 10);
      if (isNaN(inv)) return;
      // Плашка «Нет в наличии» + приглушение картинки на распроданных.
      // (Сортировку в конец грид-движок Tilda не отдаёт CSS/DOM — делается
      //  родной настройкой каталога, не скриптом.)
      if (inv <= 0 && c.getAttribute("data-rk-oos") !== "1") {
        c.setAttribute("data-rk-oos", "1");
        var w = c.querySelector(".t-store__card__imgwrapper");
        if (!w) return;
        if (getComputedStyle(w).position === "static") w.style.position = "relative";
        var b = document.createElement("div");
        b.textContent = "Нет в наличии";
        b.style.cssText = "position:absolute;top:10px;left:10px;z-index:5;background:rgba(21,50,44,.82);color:#fff;font:600 12px/1.2 Manrope,Arial,sans-serif;padding:6px 10px;border-radius:8px;letter-spacing:.02em;pointer-events:none;";
        w.appendChild(b);
        var img = w.querySelector(".t-store__card__bgimg, .t-store__card__img, img");
        if (img) img.style.opacity = "0.5";
      }
    });
  }

  // 8) Отзывы: блок «Отзывы покупателей» на карточках товара (реальные отзывы с Авито,
  //    рейтинг 4.9 / 161). Вставляется перед подвалом.
  var RK_REVIEWS = [
    { n: "Илина Кузьмина", t: "Всё в порядке, ракетка оригинал. Советую продавца.", p: "Babolat Technical Viper Soft 3.0" },
    { n: "Артём", t: "Забрал заказ — всё супер!", p: "Nox EA10 Ventus 12K" },
    { n: "Екатерина", t: "Всё отлично. Быстрая отправка, качественный чехол.", p: "Bullpadel Thermopocket" },
    { n: "Юрий", t: "Всё как описывал продавец. Всё новое и оригинал.", p: "Заказ с доставкой" },
    { n: "Николай", t: "Отличный продавец! Оперативно выходит на связь, вежливо общается. Рекомендую к сотрудничеству.", p: "" },
    { n: "Александр", t: "Товар соответствует описанию, в тот же день забрал. Продавец понравился.", p: "" }
  ];
  function renderReviews() {
    if (window.__rkReviews) return;
    if (!/\/tproduct\//.test(location.pathname)) return;
    var footer = document.querySelector(".krf");
    if (!footer || !footer.closest) return; // подвал ещё не отрендерился
    var footerRec = footer.closest('[id^="rec"]');
    if (!footerRec || !footerRec.parentNode) return;
    window.__rkReviews = true;
    var css = document.createElement("style");
    css.textContent =
      ".rk-reviews{font-family:'Manrope',Arial,sans-serif;background:#f5f8f7;padding:56px 20px}" +
      ".rk-rev-in{max-width:1100px;margin:0 auto}" +
      ".rk-rev-top{display:flex;align-items:baseline;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:26px}" +
      ".rk-rev-h{font-size:30px;font-weight:800;color:#15324C;margin:0}" +
      ".rk-rev-badge{display:flex;align-items:center;gap:9px;color:#15324C}" +
      ".rk-rev-badge b{font-size:26px}.rk-rev-st{color:#FB6A06;letter-spacing:2px}.rk-rev-cnt{color:#6b7d78;font-size:14px}" +
      ".rk-rev-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}" +
      ".rk-rev-card{background:#fff;border:1px solid #e6ece9;border-radius:16px;padding:20px;display:flex;flex-direction:column;gap:10px}" +
      ".rk-rev-stars{color:#FB6A06;letter-spacing:2px;font-size:15px}" +
      ".rk-rev-txt{margin:0;color:#26332f;font-size:15px;line-height:1.5;flex:1}" +
      ".rk-rev-name{font-weight:700;color:#15324C;font-size:14px}.rk-rev-prod{color:#8a978f;font-size:12px;display:block;margin-top:2px}" +
      ".rk-rev-all{display:inline-block;margin-top:24px;color:#15324C;font-weight:700;text-decoration:none;border-bottom:2px solid #FB6A06;padding-bottom:2px}" +
      "@media(max-width:860px){.rk-rev-grid{grid-template-columns:1fr}.rk-rev-h{font-size:24px}}";
    document.head.appendChild(css);
    var cards = RK_REVIEWS.map(function (r) {
      return '<div class="rk-rev-card"><div class="rk-rev-stars">★★★★★</div>' +
        '<p class="rk-rev-txt">' + r.t + '</p>' +
        '<div><span class="rk-rev-name">' + r.n + '</span>' +
        (r.p ? '<span class="rk-rev-prod">' + r.p + '</span>' : '') + '</div></div>';
    }).join("");
    var sec = document.createElement("div");
    sec.className = "rk-reviews";
    sec.innerHTML = '<div class="rk-rev-in"><div class="rk-rev-top">' +
      '<h2 class="rk-rev-h">Отзывы покупателей</h2>' +
      '<div class="rk-rev-badge"><b>5.0</b><span class="rk-rev-st">★★★★★</span><span class="rk-rev-cnt">отзывы о ракетках на Авито</span></div></div>' +
      '<div class="rk-rev-grid">' + cards + '</div>' +
      '<a class="rk-rev-all" href="https://www.avito.ru/user/d2d01cae4aff342e79df566420f7eca3/profile" target="_blank" rel="noopener">Читать все отзывы на Авито →</a></div>';
    footerRec.parentNode.insertBefore(sec, footerRec);
  }

  // 9) Промо-баннер главной (.kr-promo): убрать «защита обода» (по новому правилу подарка).
  function fixHomePromo() {
    document.querySelectorAll(".kr-promo").forEach(function (p) {
      if (p.getAttribute("data-rk-promo") === "1") return;
      var w = document.createTreeWalker(p, NodeFilter.SHOW_TEXT, null), n, hit = false;
      while ((n = w.nextNode())) {
        if (n.nodeValue.indexOf("защита обода") > -1 || n.nodeValue.indexOf("защиту обода") > -1) {
          n.nodeValue = n.nodeValue
            .replace("защитный чехол, овергрип и защита обода", "защитный чехол и овергрип")
            .replace(", овергрип и защита обода", " и овергрип")
            .replace(" и защита обода", "")
            .replace(" и защиту обода", "");
          hit = true;
        }
      }
      if (hit) p.setAttribute("data-rk-promo", "1");
    });
  }

  // 10) Логотип в шапке ведёт на главную (в шаблоне href="#" — клик ничего не делал).
  function fixLogo() {
    document.querySelectorAll(".krh-logo").forEach(function (a) {
      if (a.tagName === "A") {
        var h = a.getAttribute("href") || "";
        if (h === "" || h === "#" || /#$/.test(h) || h.indexOf("/tproduct/") > -1) {
          a.setAttribute("href", "https://raketkin.shop/");
        }
      }
    });
  }

  function run() {
    try { fixCart(); } catch (e) {}
    try { fixPromo(); } catch (e) {}
    try { fixHomePromo(); } catch (e) {}
    try { fixLogo(); } catch (e) {}
    try { injectProduct(); } catch (e) {}
    try { fixAvail(); } catch (e) {}
    try { renderReviews(); } catch (e) {}
    try { fixGift(); } catch (e) {}
    try { fixCatalog(); } catch (e) {}
  }

  if (document.readyState !== "loading") run();
  else document.addEventListener("DOMContentLoaded", run);
  try { new MutationObserver(fixCart).observe(document.documentElement, { childList: true, subtree: true }); } catch (e) {}
  [300, 800, 1500, 3000].forEach(function (d) { setTimeout(run, d); });

  // 3) Store/Organization/WebSite JSON-LD теперь статично в блоке шапки (v2.9), здесь не дублируем
})();


/* ===== RK v2 · Стекло и карбон (31.07.2026) =====
   Русификация каталога, чистые названия, чипы вместо текста-шаблона,
   «Сообщить о поступлении», доп. элементы на странице товара, квиз-подбор.
   Всё идемпотентно: можно звать сколько угодно раз. */
(function () {
  "use strict";
  var TG = "https://t.me/raketkinshop";

  // 0) Шрифты направления (Bebas Neue + IBM Plex Mono); Manrope уже есть на сайте.
  try {
    if (!document.getElementById("rk-fonts")) {
      var l = document.createElement("link");
      l.id = "rk-fonts"; l.rel = "stylesheet";
      l.href = "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&display=swap";
      (document.head || document.documentElement).appendChild(l);
    }
  } catch (e) {}

  // 1) Счётчики доверия: финальные цифры сразу, без анимации от нуля.
  var TRUST = { ".kr-trust__score": "5.0" };
  function trustStatic() {
    var tr = document.querySelector(".kr-trust");
    if (!tr) return;
    if (tr.getAttribute("data-krcnt") !== "1") tr.setAttribute("data-krcnt", "1"); // HEAD-аниматор пропустит блок
    var vals = ["1000+", "100%", "2 часа", "14 дней"];
    var nums = tr.querySelectorAll(".kr-trust__num");
    nums.forEach(function (n, i) { if (vals[i] && n.textContent.trim() !== vals[i]) n.textContent = vals[i]; });
    var sc = tr.querySelector(".kr-trust__score");
    if (sc && sc.textContent.trim() !== "5.0") sc.textContent = "5.0";
  }

  // 2) Русский интерфейс каталога Tilda.
  var SORT = {
    "Sort: by default": "По умолчанию", "Price: low to high": "Сначала дешевле", "Price: high to low": "Сначала дороже",
    "Title: A—Z": "Название А–Я", "Title: Z—A": "Название Я–А", "Sort: newest first": "Сначала новинки", "Sort: oldest first": "Сначала старые",
    "By default": "По умолчанию", "Newest first": "Сначала новинки", "Oldest first": "Сначала старые"
  };
  function localize() {
    document.querySelectorAll(".t-store__search-input, input[placeholder='Search']").forEach(function (i) {
      if (i.placeholder === "Search") i.placeholder = "Поиск по моделям";
    });
    document.querySelectorAll(".t-store__sort-select option").forEach(function (o) {
      var t = o.textContent.trim(); if (SORT[t]) o.textContent = SORT[t];
    });
    document.querySelectorAll(".t-store__parts-switch-btn, .t-store__parts-switch-btn *").forEach(function (b) {
      if (b.childElementCount === 0 && b.textContent.trim() === "All") b.textContent = "Все";
    });
    document.querySelectorAll("#rec2359100721 *").forEach(function (b) {
      if (b.childElementCount === 0 && /^filters?$/i.test((b.textContent||"").trim())) b.textContent = "Фильтры";
    });
    document.querySelectorAll(".t-store__filter__reset").forEach(function (b) {
      if (b.childElementCount === 0 && /reset|clear/i.test(b.textContent)) b.textContent = "Сбросить";
    });
  }

  // 3) Чистые названия: «Ракетка для падел тенниса Nox …» → «Nox …» (карточки, h1, title).
  function unCaps(t) { return t.replace(/\b[A-Z]{4,}\b/g, function (w) { return w.charAt(0) + w.slice(1).toLowerCase(); }); }
  var PRE = /^\s*Ракетка\s+для\s+падел(?:\s*-?\s*тенниса)?\s+/i;
  function cleanTitles() {
    document.querySelectorAll(".t-store__card__title, .js-product-name, .js-store-prod-name, .t-store__prod-popup__name").forEach(function (el) {
      if (el.childElementCount && !(el.childElementCount === 1 && el.firstElementChild.className === "rk-bdot")) return;
      if (el.childElementCount === 1) { var tn = el.lastChild; if (!tn || tn.nodeType !== 3) return; var tt = tn.nodeValue; if (PRE.test(tt)) tn.nodeValue = tt.replace(PRE, ""); if (/[A-Z]{4,}/.test(tn.nodeValue)) tn.nodeValue = unCaps(tn.nodeValue); return; }
      var t = el.textContent;
      if (PRE.test(t)) { t = t.replace(PRE, ""); el.textContent = t; }
      // «BULLPADEL XPLO 25 QATAR» → «Bullpadel Xplo 25 Qatar»: слова капсом (4+ букв) не должны кричать
      if (/[A-Z]{4,}/.test(t)) el.textContent = unCaps(t);
    });
    if (PRE.test(document.title)) document.title = document.title.replace(PRE, "");
    if (/[A-Z]{4,}/.test(document.title)) document.title = unCaps(document.title);
  }

  // 4) Чипы вместо текста-шаблона в карточках каталога.
  var WHY = { atk: "Для атаки у сетки", ctr: "Быстрый переход в атаку", con: "Точность и контроль", uni: "На каждый розыгрыш", beg: "Первая своя ракетка" };
  function parseSpec(t) {
    t = (t || "").toLowerCase();
    var form = /бриллиант|алмаз/.test(t) ? "Алмаз" : /гибридн/.test(t) ? "Гибрид" : /каплевидн/.test(t) ? "Капля" : /геометрич/.test(t) ? "Гео" : /кругл/.test(t) ? "Круглая" : "";
    var bm = t.match(/баланс[^а-яё]*«?\s*(высок|нейтральн|средн|низк)/); var bal = bm ? { высок: "Баланс в голову", нейтральн: "Нейтральный", средн: "Средний баланс", низк: "Баланс в ручку" }[bm[1]] : "";
    var lm = t.match(/(начинающ|продвинут|профессионал|эксперт)/); var lvl = lm ? { начинающ: "Новичок", продвинут: "Продвинутый", профессионал: "Про", эксперт: "Эксперт" }[lm[1]] : "";
    var sm = t.match(/стиль[^а-яё]*(контратак|атак|контрол|универсал)/); var key = sm ? { контратак: "ctr", атак: "atk", контрол: "con", универсал: "uni" }[sm[1]] : "";
    if (lm && lm[1] === "начинающ") key = "beg";
    return { chips: [form, bal, lvl].filter(Boolean), why: key ? WHY[key] : "" };
  }
  function cardChips() {
    document.querySelectorAll(".js-product").forEach(function (c) {
      if (c.getAttribute("data-rk-chips") === "1") return;
      var d = c.querySelector(".t-store__card__descr"); if (!d) return;
      var spec = parseSpec(d.textContent);
      if (!spec.chips.length && !spec.why) return;
      c.setAttribute("data-rk-chips", "1");
      var ttl = c.querySelector(".t-store__card__title"); if (ttl && !ttl.querySelector(".rk-bdot")) {
        var bm = (ttl.textContent || "").trim().toLowerCase().match(/^(bullpadel|babolat|nox|head)\b/);
        var dot = document.createElement("span"); dot.className = "rk-bdot"; dot.setAttribute("data-b", bm ? bm[1] : "");
        ttl.insertBefore(dot, ttl.firstChild);
      }
      var box = document.createElement("div"); box.className = "rk-chips";
      spec.chips.forEach(function (x) { var s = document.createElement("span"); s.className = "rk-chip"; s.textContent = x; box.appendChild(s); });
      d.parentNode.insertBefore(box, d);
      if (spec.why) { var w = document.createElement("div"); w.className = "rk-why"; w.textContent = spec.why; d.parentNode.insertBefore(w, d); }
    });
  }

  // 5) Распроданные: убрать английское «Out of stock», дать «Сообщить о поступлении».
  function rkBreadcrumb() {
    // v2.20: BreadcrumbList на страницах товара (Главная > Бренд > Модель) — раньше был только на бренд/обзор/гид-страницах
    try {
      if (location.pathname.indexOf("/tproduct/") < 0) return;
      if (window.__rkBc) return; window.__rkBc = true;
      var h1 = document.querySelector(".js-store-prod-name, .t-store__prod-popup__name, h1");
      var name = h1 ? h1.textContent.trim() : (document.title.split(" — ")[0] || "").trim();
      if (!name) { window.__rkBc = false; return; }
      var brands = { bullpadel: "Bullpadel", babolat: "Babolat", nox: "Nox", head: "Head" };
      var first = (name.split(" ")[0] || "").toLowerCase();
      var items = [{ "@type": "ListItem", "position": 1, "name": "Главная", "item": "https://raketkin.shop/" }];
      var pos = 2;
      if (brands[first]) { items.push({ "@type": "ListItem", "position": pos++, "name": "Ракетки " + brands[first], "item": "https://raketkin.shop/" + first }); }
      items.push({ "@type": "ListItem", "position": pos, "name": name, "item": location.href.split("?")[0] });
      var bc = { "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": items };
      var sc = document.createElement("script"); sc.type = "application/ld+json"; sc.textContent = JSON.stringify(bc);
      document.head.appendChild(sc);
    } catch (e) {}
  }
  function rkImages() {
    // v2.9: реальные <img alt> поверх CSS-фонов Tilda (карточки каталога и галерея товара) — для Яндекс.Картинок/Google Images и alt-текста
    try {
      document.querySelectorAll(".t-store__card").forEach(function (c) {
        var w = c.querySelector(".t-store__card__imgwrapper"); if (!w || w.querySelector("img.rk-img")) return;
        var src = c.getAttribute("data-product-img"); var n = c.querySelector(".js-product-name, .t-store__card__title"); if (!src || !n) return;
        var im = document.createElement("img"); im.className = "rk-img"; im.loading = "lazy"; im.decoding = "async"; im.width = 400; im.height = 400;
        im.src = /\/stor[^/]+\/[^/]+\.(jpe?g|png|webp)$/i.test(src) ? src.replace(/\/([^/]+)$/, "/-/resize/400x400/$1") : src; // v2.14: Tilda-ресайз вместо 1000px
        im.alt = n.textContent.trim() + " — ракетка для падела"; w.appendChild(im);
      });
      var h1 = document.querySelector(".js-store-prod-name, .t-store__prod-popup__name, h1");
      // v2.16: галерею трогаем только после полной загрузки и паузы, чтобы не ловить CLS во время инициализации слайдера
      if (!window.__rkGalReady) { if (document.readyState === "complete") { setTimeout(function () { window.__rkGalReady = true; rkImages(); }, 1500); } else { window.addEventListener("load", function () { setTimeout(function () { window.__rkGalReady = true; rkImages(); }, 1500); }); } return; }
      var slides = [].slice.call(document.querySelectorAll(".t-slds__bgimg")).filter(function (bg) { return !bg.closest(".t-slds__thumbsbar-wrapper, .t-slds__thumbsbar, .t-store__prod-popup__thumbsbar") && getComputedStyle(bg).position !== "static"; });
      slides.forEach(function (bg, i) {
        if (bg.querySelector("img.rk-img")) return;
        var src = bg.getAttribute("data-original") || (bg.style.backgroundImage || "").replace(/^url\(["']?|["']?\)$/g, ""); if (!src) return;
        var gsrc = /\/stor[^/]+\/[^/]+\.(jpe?g|png|webp)$/i.test(src) ? src.replace(/\/([^/]+)$/, "/-/resize/800x800/$1") : src; // v2.15: 800px вместо 1000px оригинала
        var im = document.createElement("img"); im.className = "rk-img rk-img_gal"; im.src = gsrc; im.loading = "lazy"; im.decoding = "async"; im.width = 800; im.height = 800;
        im.alt = (h1 ? h1.textContent.trim() : "Ракетка для падела") + (i ? " — фото " + (i + 1) : " — ракетка для падела"); bg.appendChild(im);
      });
    } catch (e) {}
  }
  function rkBgResize() {
    // v2.24: CSS-фоны карточек Tilda грузят 1000px оригиналы (200-300 КБ каждый); подменяем на /-/resize/600x600/ до lazyload и после него
    try {
      var rx = /\/stor[^/]+\/[^/]+\.(jpe?g|png|webp)$/i;
      document.querySelectorAll(".t-store__card__bgimg").forEach(function (bg) {
        if (bg.closest(".t-slds__thumbsbar-wrapper, .t-slds__thumbsbar")) return;
        var d = bg.getAttribute("data-original");
        if (d && rx.test(d) && d.indexOf("/-/resize/") < 0) bg.setAttribute("data-original", d.replace(/\/([^/]+)$/, "/-/resize/600x600/$1"));
        var b = bg.style.backgroundImage || ""; var u = b.replace(/^url\(["']?|["']?\)$/g, "");
        if (u && rx.test(u) && u.indexOf("/-/resize/") < 0) bg.style.backgroundImage = 'url("' + u.replace(/\/([^/]+)$/, "/-/resize/600x600/$1") + '")';
      });
    } catch (e) {}
  }
  function rkH2() {
    // v2.24: заголовки секций из HEAD-скриптов (доставка/доверие/отзывы/вопросы) были div — делаем настоящими h2 без смены стиля
    try {
      document.querySelectorAll("div.kr-dlv__title, div.kr-rev__title, div.kr-trust__title, div.kr-faq__title").forEach(function (d) {
        var h = document.createElement("h2"); h.className = d.className; h.innerHTML = d.innerHTML; h.style.margin = "0"; h.style.padding = getComputedStyle(d).padding;
        d.parentNode.replaceChild(h, d);
      });
    } catch (e) {}
  }
  function rkStripMicrodata() {
    // v2.25: микроданные Tilda (Product/Offer без brand, returnPolicy, shippingDetails) дублируют полный JSON-LD из injectProduct() и дают предупреждения в GSC «Данные о товарах продавца»; убираем их из отрендеренного DOM
    try {
      document.querySelectorAll('[itemtype*="schema.org/Product"], [itemtype*="schema.org/Offer"], [itemtype*="schema.org/ImageGallery"], [itemtype*="schema.org/ImageObject"]').forEach(function (el) {
        el.removeAttribute("itemscope"); el.removeAttribute("itemtype");
      });
      document.querySelectorAll(".t-store [itemprop], .t-store__prod-snippet__container [itemprop], .t-store__prod-popup__container [itemprop]").forEach(function (el) { el.removeAttribute("itemprop"); });
    } catch (e) {}
  }
  (function rkCROcss(){try{if(document.getElementById('rk-cro-css'))return;var st=document.createElement('style');st.id='rk-cro-css';st.textContent=".rk-cart-trust{display:flex;flex-direction:column;gap:4px;margin:8px 0 12px;padding:10px 12px;border:1px solid #D7DEDB;border-radius:6px;background:#F4F7F5;font:500 12.5px/1.4 'Manrope',system-ui,sans-serif;color:#5B6663}.rk-cart-trust span:first-child{font-weight:700;color:#0E3B33}#rk-sticky{position:fixed;left:0;right:0;bottom:0;z-index:9999;display:flex;align-items:center;gap:12px;padding:10px 14px calc(10px + env(safe-area-inset-bottom));background:#fff;border-top:1px solid #D7DEDB;box-shadow:0 -6px 20px -12px rgba(20,24,26,.4)}#rk-sticky .rk-sticky__p{font:800 18px/1 'Manrope',system-ui,sans-serif;color:#14181A;font-variant-numeric:tabular-nums;white-space:nowrap}#rk-sticky .rk-sticky__b{flex:1;padding:14px;border:0;border-radius:6px;background:#0E3B33;color:#fff;font:700 15px/1 'Manrope',system-ui,sans-serif;cursor:pointer}@media(min-width:641px){#rk-sticky{display:none}}";(document.head||document.documentElement).appendChild(st);}catch(e){}})();
  function rkCartCRO() {
    // Доверие + подарок над кнопкой «Оформить заказ» в модалке корзины
    try {
      var btn = [].slice.call(document.querySelectorAll('.t-store__viewbtn, .t-form__submit, .t-submit, button'))
        .filter(function (b) { return /оформить заказ/i.test(b.textContent) && b.offsetParent; })[0];
      if (!btn) return;
      var box = btn.closest('.t-store__cart, .t-popup__container, form') || btn.parentNode;
      if (box.querySelector('.rk-cart-trust')) return;
      var d = document.createElement('div');
      d.className = 'rk-cart-trust';
      d.innerHTML = '<span>🎾 В подарок: чехол и овергрип</span>' +
        '<span>Оригинал с серийным номером · возврат 14 дней · безопасная оплата картой или СБП</span>';
      btn.parentNode.insertBefore(d, btn);
    } catch (e) {}
  }
  function rkStickyBuy() {
    // Липкая кнопка «В корзину» снизу на мобиле /tproduct/
    try {
      if (location.pathname.indexOf('/tproduct/') !== 0) return;
      if (window.innerWidth > 640) { var ex = document.getElementById('rk-sticky'); if (ex) ex.remove(); return; }
      var src = [].slice.call(document.querySelectorAll('.t-store__prod-popup__btn-wrapper a, .t-store__prod-popup__btn-wrapper button, a, button'))
        .filter(function (b) { return /в корзину/i.test(b.textContent) && b.offsetParent; })[0];
      if (!src || document.getElementById('rk-sticky')) return;
      var price = (document.querySelector('.js-store-prod-price, .t-store__prod-popup__price-wrapper') || {}).textContent || '';
      price = (price.match(/[\d\s]+[р₽]/) || [''])[0].trim();
      var bar = document.createElement('div'); bar.id = 'rk-sticky';
      bar.innerHTML = '<span class="rk-sticky__p">' + price + '</span><button class="rk-sticky__b" type="button">В корзину</button>';
      bar.querySelector('.rk-sticky__b').addEventListener('click', function () { src.click(); });
      document.body.appendChild(bar);
    } catch (e) {}
  }
  function relevantsClean() {
    // «Смотрите также» на странице товара: не предлагать распроданные, если есть хоть одна в наличии
    var cont = document.querySelector(".t-store__relevants__container"); if (!cont) return;
    var cards = [].slice.call(cont.querySelectorAll(".t-store__card"));
    var inv = function (c) { var n = parseInt(c.getAttribute("data-product-inv"), 10); return isNaN(n) ? 1 : n; };
    var alive = cards.filter(function (c) { return inv(c) > 0; });
    if (!alive.length) return;
    cards.forEach(function (c) { var hide = inv(c) <= 0; if ((c.style.display === "none") !== hide) c.style.display = hide ? "none" : ""; });
  }
  function oosCards() {
    document.querySelectorAll(".js-product").forEach(function (c) {
      var inv = parseInt(c.getAttribute("data-product-inv"), 10);
      if (isNaN(inv) || inv > 0 || c.getAttribute("data-rk-oos2") === "1") return;
      var w = document.createTreeWalker(c, NodeFilter.SHOW_TEXT, null), n, hit = null;
      while ((n = w.nextNode())) { if (/out of stock/i.test(n.nodeValue)) { hit = n.parentElement; break; } }
      if (!hit) return;
      c.setAttribute("data-rk-oos2", "1");
      hit.style.display = "none";
      var a = document.createElement("a"); a.className = "rk-notify"; a.href = TG; a.target = "_blank"; a.rel = "noopener";
      a.textContent = "Сообщить о поступлении";
      a.addEventListener("click", function (e) { e.stopPropagation(); });
      var host = c.querySelector(".t-store__card__wrap_txt-and-btns") || c.querySelector(".t-store__card__wrap_all") || c;
      host.appendChild(a);
    });
  }

  var RK_BULL = ["p001", "p002", "p003", "p004", "p019", "p020", "p021", "p022", "p023", "p024", "p025", "p026", "p027", "p028", "p029", "p030", "p031", "p033", "p034", "p052", "p053"];
  function rkOnlyGrip() {
    var t = ((document.querySelector("h1") || {}).textContent || "") + " " + ((document.querySelector(".t-store__prod-popup__brand") || {}).textContent || "") + " " + document.title;
    var sku = (document.body.innerText.match(/(?:SKU|Артикул):\s*(p\d+)/i) || [])[1] || "";
    if (RK_BULL.indexOf(sku) > -1 || sku === "p017") return true;
    if (/bullpadel/i.test(t)) return true;
    if (/babolat|nox|head/i.test(t)) return false;
    return null; // бренд ещё не известен
  }
  // 6) Страница товара: «заберёте сегодня», комплект, «спросить эксперта».
  function mskHour() { try { return parseInt(new Intl.DateTimeFormat("ru-RU", { hour: "numeric", hour12: false, timeZone: "Europe/Moscow" }).format(new Date()), 10); } catch (e) { return new Date().getHours(); } }
  function productExtras() {
    if (!/\/tproduct\//.test(location.pathname)) return;
    var bw = document.querySelector(".t-store__prod-popup__btn-wrapper");
    var main = document.querySelector(".js-store-product");
    if (!bw || !main) return;
    var og = rkOnlyGrip(); if (og === null) return; // ждём, пока Tilda отрисует бренд
    var onlyGrip = og;
    var kitTxt = "В комплекте: " + (onlyGrip ? "овергрип (намотка)" : "защитный чехол и овергрип") + " · оригинал с серийным номером · возврат 14 дней";
    var giftTxt = "В подарок: " + (onlyGrip ? "овергрип (намотка)" : "защитный чехол и овергрип");
    var ex = document.querySelector(".rk-extras");
    if (ex) { var k = ex.querySelector(".rk-kit"); if (k && k.textContent !== kitTxt) k.textContent = kitTxt; var g0 = document.querySelector(".kr-pop-gift span:last-child"); if (g0 && g0.textContent !== giftTxt) g0.textContent = giftTxt; return; }
    var invAttr = main.getAttribute("data-product-inv"); if (invAttr === null || invAttr === "") return;
    var inv = parseInt(invAttr, 10), inStock = isNaN(inv) || inv > 0;
    var box = document.createElement("div"); box.className = "rk-extras";
    var today = document.createElement("div"); today.className = "rk-today";
    var h = mskHour();
    today.textContent = !inStock ? "Под заказ: напишите нам, назовём срок" : (h < 19 ? "Заберёте сегодня до 21:00 по Москве" : "Привезём завтра по Москве, по России отправим в день заказа");
    var kit = document.createElement("div"); kit.className = "rk-kit";
    kit.textContent = kitTxt;
    box.appendChild(today); box.appendChild(kit);
    bw.parentNode.insertBefore(box, bw.nextSibling);
    if (!bw.querySelector(".rk-expert")) {
      var a = document.createElement("a"); a.className = "rk-expert"; a.href = TG; a.target = "_blank"; a.rel = "noopener";
      a.textContent = "Спросить эксперта";
      bw.appendChild(a);
    }
    var gift = document.querySelector(".kr-pop-gift span:last-child");
    if (gift && gift.textContent !== giftTxt) gift.textContent = giftTxt;
  }

  // 7) Квиз «Подобрать под мою игру»: два вопроса → отмечаем родные фильтры Tilda и скроллим к каталогу.
  var Q = [
    { q: "Как давно играете?", key: "lvl", opts: [["Меньше года", "Начинающий"], ["Регулярно, год и больше", "Продвинутый"], ["Турниры, с тренером", "Профессиональный"]] },
    { q: "Что важнее в игре?", key: "sty", opts: [["Атака у сетки", "Атакующий"], ["Контроль и точность", "Контроль"], ["Быстрый переход в атаку", "Контратака"], ["И то и другое", "Универсальный"]] }
  ];
  var ans = {};
  function tickFilter(val) {
    var inputs = document.querySelectorAll("#rec2359100721 input[type=checkbox]");
    for (var i = 0; i < inputs.length; i++) {
      var inp = inputs[i], lab = inp.closest("label") || inp.parentElement;
      var txt = ((inp.value || "") + " " + (lab ? lab.textContent : "")).trim();
      if (txt.indexOf(val) > -1) { if (!inp.checked) inp.click(); return true; }
    }
    return false;
  }
  function openQuiz() {
    if (!document.querySelector("#rec2359100721")) { location.href = "https://raketkin.shop/#podbor"; return; }
    if (document.querySelector(".rk-quiz")) return;
    ans = {};
    var ov = document.createElement("div"); ov.className = "rk-quiz";
    var html = '<div class="rk-quiz__box"><button class="rk-quiz__x" aria-label="Закрыть">×</button><div class="rk-quiz__eb">Подбор за минуту</div><div class="rk-quiz__h">Ракетка под вашу игру</div>';
    Q.forEach(function (qq) {
      html += '<div class="rk-quiz__q">' + qq.q + '</div><div class="rk-quiz__opts" data-key="' + qq.key + '">';
      qq.opts.forEach(function (o) { html += '<button class="rk-quiz__opt" data-val="' + o[1] + '">' + o[0] + '</button>'; });
      html += '</div>';
    });
    html += '<button class="rk-quiz__go" disabled>Показать подходящие</button></div>';
    ov.innerHTML = html; document.body.appendChild(ov);
    var go = ov.querySelector(".rk-quiz__go");
    function close() { if (ov.parentNode) ov.parentNode.removeChild(ov); }
    ov.querySelector(".rk-quiz__x").onclick = close;
    ov.addEventListener("click", function (e) { if (e.target === ov) close(); });
    ov.querySelectorAll(".rk-quiz__opt").forEach(function (b) {
      b.onclick = function () {
        var grp = b.parentElement; grp.querySelectorAll(".rk-quiz__opt").forEach(function (x) { x.classList.remove("on"); });
        b.classList.add("on"); ans[grp.getAttribute("data-key")] = b.getAttribute("data-val");
        go.disabled = !(ans.lvl && ans.sty);
      };
    });
    go.onclick = function () {
      // сброс прежних отметок
      document.querySelectorAll("#rec2359100721 input[type=checkbox]:checked").forEach(function (i) { i.click(); });
      setTimeout(function () {
        tickFilter(ans.lvl); tickFilter(ans.sty);
        close();
        function toCat() { var cat = document.querySelector("#rec2359100721"); if (cat) window.scrollTo({ top: cat.getBoundingClientRect().top + window.pageYOffset - 70, behavior: "smooth" }); }
        toCat(); setTimeout(toCat, 900); setTimeout(toCat, 1800);
      }, 150);
    };
  }
  function bindQuiz() {
    if (!window.__rkQuizBound) {
      window.__rkQuizBound = true;
      document.addEventListener("click", function (e) {
        var a = e.target.closest && e.target.closest('a[href$="#podbor"]');
        if (a) { e.preventDefault(); openQuiz(); }
      }, true);
      if (location.hash === "#podbor") setTimeout(openQuiz, 900);
    }
  }


  // 8) Шапка: старый HEAD-скрипт переименовывает пункт меню в «Отзывы» и дописывает «Частые вопросы»; возвращаем «Бренды».
  function navFix() {
    document.querySelectorAll(".krh.rk-h .krh-nav a").forEach(function (a) {
      var t = (a.textContent || "").trim();
      if (t === "Отзывы") { a.textContent = "Бренды"; a.setAttribute("href", "https://raketkin.shop/#brands"); }
      if (t === "Частые вопросы") a.remove();
    });
    if (/\/tproduct\//.test(location.pathname)) {
      document.querySelectorAll(".js-store-prod-popup-buy-btn-txt, .t-store__prod-popup__btn-text").forEach(function (e) {
        var t = (e.textContent || "").trim(); if (t === "Купить" || /^buy/i.test(t)) e.textContent = "В корзину";
      });
    }
  }


  // 9) Распроданные прячем за кнопкой «Показать распроданные · N» в конце каталога.
  function oosCollapse() {
    var oosShown = !!window.__rkOosShown; // общий флаг: скрипт подключён дважды, у копий не должно быть своего состояния
    var list = document.querySelector("#rec2359100721 .t-store__card-list"); if (!list) return; if (list.closest(".t-store__relevants-grid-cont,.t-store__relevants__container")) return;
    var cards = [].slice.call(list.querySelectorAll(":scope > .js-product"));
    var oos = cards.filter(function (c) { var n = parseInt(c.getAttribute("data-product-inv"), 10); return !isNaN(n) && n <= 0; });
    oos.forEach(function (c) { if (c.classList.contains("rk-oos-hidden") === oosShown) c.classList.toggle("rk-oos-hidden", !oosShown); });
    var btn = document.querySelector(".rk-showoos");
    if (!oos.length) { if (btn && btn.style.display !== "none") btn.style.display = "none"; return; }
    if (!btn) {
      btn = document.createElement("button"); btn.type = "button"; btn.className = "rk-showoos";
      btn.addEventListener("click", function () { window.__rkOosShown = !window.__rkOosShown; oosCollapse(); });
      list.parentNode.insertBefore(btn, list.nextSibling);
    }
    if (btn.style.display !== "") btn.style.display = "";
    var txt = oosShown ? "Скрыть распроданные" : ("Показать распроданные · " + oos.length);
    if (btn.textContent !== txt) btn.textContent = txt; // менять только при отличии: иначе MutationObserver зацикливается
  }

  function run2() {
    try { trustStatic(); } catch (e) {}
    try { localize(); } catch (e) {}
    try { cleanTitles(); } catch (e) {}
    try { cardChips(); } catch (e) {}
    try { oosCards(); } catch (e) {}
    try { productExtras(); } catch (e) {}
    try { bindQuiz(); } catch (e) {}
    try { navFix(); } catch (e) {}
    try { oosCollapse(); } catch (e) {}
    try { relevantsClean(); } catch (e) {}
    try { rkBgResize(); rkH2(); } catch (e) {}
    try { rkStripMicrodata(); } catch (e) {}
    try { rkCartCRO(); rkStickyBuy(); } catch (e) {}
    try { rkImages(); } catch (e) {}
    try { rkBreadcrumb(); } catch (e) {}
    try { if (!document.documentElement.lang) document.documentElement.lang = "ru"; } catch (e) {}
  }
  if (document.readyState !== "loading") run2(); else document.addEventListener("DOMContentLoaded", run2);
  [200, 600, 1200, 2500, 4000, 7000].forEach(function (d) { setTimeout(run2, d); });
  try { var moT = null; new MutationObserver(function (ms) { if (ms.every(function (m) { return m.target.closest && m.target.closest(".rk-showoos, .rk-quiz"); })) return; if (moT) return; moT = setTimeout(function () { moT = null; try { cleanTitles(); cardChips(); oosCards(); trustStatic(); navFix(); oosCollapse(); relevantsClean(); rkImages(); rkBreadcrumb(); rkBgResize(); rkH2(); rkStripMicrodata(); rkCartCRO(); rkStickyBuy(); } catch (e) {} }, 150); }).observe(document.documentElement, { childList: true, subtree: true }); } catch (e) {}
})();

/* ===== Каталог: случайный порядок + распроданные в конец (CSS order, устойчиво к перерисовке). Перенесено из HEAD 31.07 ===== */
(function(){var W=window;if(W.rkOrd2)return;W.rkOrd2=1;var seed={},tries=0,mo=null;
function cont(){return document.querySelector(".t-store__card-list");}
function ord(c){var uid=c.getAttribute("data-product-uid")||c.getAttribute("data-product-lid")||"";if(!(uid in seed))seed[uid]=Math.random();var inv=parseInt(c.getAttribute("data-product-inv"),10);var base=(!isNaN(inv)&&inv<=0)?100000:0;return base+Math.floor(seed[uid]*10000);}
function apply(){var C=cont();if(!C)return;var l=C.querySelectorAll(":scope > .js-product");for(var i=0;i<l.length;i++){l[i].style.order=ord(l[i]);}}
function loadAll(){var b=document.querySelector(".js-store-load-more-btn");if(b&&b.offsetParent!==null&&tries<30){tries++;b.click();}}
function tick(){apply();loadAll();}
var n=0,iv=setInterval(function(){tick();if(++n>60)clearInterval(iv);},500);
if(document.readyState!=="loading")tick();else document.addEventListener("DOMContentLoaded",tick);
setTimeout(function(){var C=cont();if(C&&W.MutationObserver){mo=new MutationObserver(function(){apply();});mo.observe(C,{childList:true});}},1500);
})();
