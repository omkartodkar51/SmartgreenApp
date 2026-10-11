(() => {
  "use strict";

  const MOV = 200;
  const STORAGE = "smart-green-v6";
  const GRAMS_PER_KIT = 250;
  const MODES = ["ondemand", "moms", "family"];
  const MODE_META = {
    ondemand: { label: "On-Demand", desc: "Pick exactly what you need instantly" },
    moms: { label: "Mom’s Kitchen", desc: "Kids’ weekly veggie & custom tiffin kits" },
    family: { label: "Family Kitchen", desc: "Complete weekly family basket with health tags" },
  };
  const img = (id, w = 600) =>
    `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

  const CATALOG = {
    Staples: [
      { id: "rice", name: "Sona Masoori Rice", blurb: "Premium rice", pricePerKg: 170, unit: "kg", hue: "#f0e6c8", accent: "#b89b54", photo: img("photo-1586201375761-83865001e31c"), nutri: { vitamins: "B-Complex", protein: "7g", fiber: "2.8g" } },
      { id: "atta", name: "Whole Wheat Atta", blurb: "Stone-ground", pricePerKg: 54, unit: "kg", hue: "#e8d4a8", accent: "#8d6e3a", photo: img("photo-1574323347407-f5e1ad6d020b"), nutri: { vitamins: "B1, B3", protein: "12g", fiber: "10.7g" } },
      { id: "dal", name: "Toor Dal", blurb: "Protein staple", pricePerKg: 140, unit: "kg", hue: "#f3d27a", accent: "#b8860b", photo: img("photo-1516684732162-798a0062be99"), nutri: { vitamins: "Folate, Iron", protein: "22g", fiber: "15g" } },
      { id: "oil", name: "Cold-Pressed Oil", blurb: "Kitchen essential", pricePerKg: 220, unit: "L", hue: "#f7e38a", accent: "#c9a227", photo: img("photo-1474979266404-7eaacbcd87c5"), nutri: { vitamins: "Vitamin E", protein: "0g", fiber: "0g" } },
    ],
    Veggies: [
      { id: "lady-finger", name: "Lady Finger", blurb: "Farm fresh", pricePerKg: 60, hue: "#9aaa5a", accent: "#6b7a32", photo: "https://images.pexels.com/photos/1656666/pexels-photo-1656666.jpeg?auto=compress&cs=tinysrgb&w=600", nutri: { vitamins: "Vit C, K", protein: "2g", fiber: "3.2g" } },
      { id: "potato", name: "Potato", blurb: "Everyday staple", pricePerKg: 36, hue: "#d4a35a", accent: "#8a6230", photo: img("photo-1518977676601-b53f82aba655"), nutri: { vitamins: "Vit C, B6", protein: "2g", fiber: "2.1g" } },
      { id: "tomato", name: "Tomato", blurb: "Vine ripened", pricePerKg: 48, hue: "#d4543a", accent: "#9a2f1c", photo: img("photo-1592924357228-91a4daadcfea"), nutri: { vitamins: "Vit A, C", protein: "0.9g", fiber: "1.2g" } },
      { id: "carrot", name: "Carrot", blurb: "Sweet & crisp", pricePerKg: 52, hue: "#e07a2f", accent: "#a04a12", photo: img("photo-1598170845058-32b9d6a5da37"), nutri: { vitamins: "Vit A, K", protein: "0.9g", fiber: "2.8g" } },
      { id: "beans", name: "French Beans", blurb: "Tender pods", pricePerKg: 70, hue: "#8a9e4a", accent: "#5a6b28", photo: img("photo-1567375698348-5d9d1edb2e83"), nutri: { vitamins: "Vit A, C, K", protein: "1.8g", fiber: "3.4g" } },
      { id: "capsicum", name: "Capsicum", blurb: "Crunchy & mild", pricePerKg: 80, hue: "#c9a227", accent: "#8a6a12", photo: img("photo-1563565375-f3fdfdbefa83"), nutri: { vitamins: "Vit C, A", protein: "1g", fiber: "2.1g" } },
    ],
    Fruits: [
      { id: "banana", name: "Banana", blurb: "Energy fruit", pricePerKg: 55, hue: "#ffe082", accent: "#f9a825", photo: img("photo-1571771894821-ce9b6c11b08e"), nutri: { vitamins: "Vit B6, C", protein: "1.1g", fiber: "2.6g" } },
      { id: "apple", name: "Apple", blurb: "Crisp & juicy", pricePerKg: 180, hue: "#e57373", accent: "#c62828", photo: img("photo-1567306226416-28f0efdc88ce"), nutri: { vitamins: "Vit C", protein: "0.3g", fiber: "2.4g" } },
      { id: "papaya", name: "Papaya", blurb: "Vitamin rich", pricePerKg: 45, hue: "#ffb74d", accent: "#ef6c00", photo: img("photo-1517282009859-f000ec3b26fe"), nutri: { vitamins: "Vit C, A", protein: "0.5g", fiber: "1.8g" } },
      { id: "orange", name: "Orange", blurb: "Fresh citrus", pricePerKg: 90, hue: "#ffa726", accent: "#ef6c00", photo: img("photo-1557800636-894a64c1696f"), nutri: { vitamins: "Vit C", protein: "0.9g", fiber: "2.4g" } },
    ],
    Sprouts: [
      { id: "moong", name: "Moong Sprouts", blurb: "Protein pack", pricePerKg: 120, hue: "#c4b454", accent: "#8a7a28", sproutable: true, photo: img("photo-1540420773420-3366772f4999"), nutri: { vitamins: "Vit C, Folate", protein: "9g", fiber: "2g" } },
      { id: "chana", name: "Chana Sprouts", blurb: "Hearty sprouts", pricePerKg: 110, hue: "#c4a35a", accent: "#7a5a28", sproutable: true, photo: img("photo-1615485290382-441e4d049cb5"), nutri: { vitamins: "Vit B, Iron", protein: "13g", fiber: "7g" } },
      { id: "mixed", name: "Mixed Sprouts", blurb: "Variety pack", pricePerKg: 130, hue: "#b8a45a", accent: "#7a6528", sproutable: true, photo: img("photo-1512621776951-a57141f2eefd"), nutri: { vitamins: "Vit A, C", protein: "10g", fiber: "5g" } },
      { id: "methi", name: "Methi Sprouts", blurb: "Iron boost", pricePerKg: 125, hue: "#a8b45a", accent: "#6a7528", sproutable: true, photo: img("photo-1508747703725-719777637510"), nutri: { vitamins: "Iron, Vit K", protein: "4g", fiber: "3g" } },
    ],
    Aromatics: [
      { id: "coriander", name: "Coriander", blurb: "Fresh bunch", pricePerKg: 40, hue: "#a8b86a", accent: "#6a7a32", photo: img("photo-1459411621453-7b03977f4bfc"), nutri: { vitamins: "Vit A, C, K", protein: "2.2g", fiber: "3g" } },
      { id: "mint", name: "Mint Bunch", blurb: "Cool & aromatic", pricePerKg: 50, hue: "#b0c070", accent: "#708030", photo: img("photo-1622206151226-18ca2c9ab4a1"), nutri: { vitamins: "Vit A, C", protein: "3.8g", fiber: "8g" } },
      { id: "ginger", name: "Ginger", blurb: "Kitchen essential", pricePerKg: 160, hue: "#d7ccc8", accent: "#8d6e63", photo: img("photo-1599940824399-b87987ceb72a"), nutri: { vitamins: "Vit B6", protein: "1.8g", fiber: "2g" } },
      { id: "lemon", name: "Lemon", blurb: "Zesty finish", pricePerKg: 90, hue: "#e8d86a", accent: "#b8a020", photo: img("photo-1590502593747-42a996133562"), nutri: { vitamins: "Vit C", protein: "1.1g", fiber: "2.8g" } },
    ],
  };

  const MOMS_VEG = [
    { id: "tf-lady", name: "Lady Finger Kit", price: 45, hue: "#9aaa5a", accent: "#6b7a32", photo: "https://images.pexels.com/photos/1656666/pexels-photo-1656666.jpeg?auto=compress&cs=tinysrgb&w=600", nutri: { vitamins: "Vit C, K", protein: "2g", fiber: "3.2g" } },
    { id: "tf-spin", name: "Spinach Kit", price: 35, hue: "#8a9e5a", accent: "#556b2f", photo: img("photo-1576045057995-568f588f82fb"), nutri: { vitamins: "Iron, Vit A", protein: "2.9g", fiber: "2.2g" } },
    { id: "tf-pot", name: "Potato Kit", price: 30, hue: "#d4a35a", accent: "#8a6230", photo: img("photo-1518977676601-b53f82aba655"), nutri: { vitamins: "Vit C, B6", protein: "2g", fiber: "2.1g" } },
    { id: "tf-tom", name: "Tomato Kit", price: 40, hue: "#d4543a", accent: "#9a2f1c", photo: img("photo-1592924357228-91a4daadcfea"), nutri: { vitamins: "Vit A, C", protein: "0.9g", fiber: "1.2g" } },
    { id: "tf-carrot", name: "Carrot Kit", price: 38, hue: "#e07a2f", accent: "#a04a12", photo: img("photo-1598170845058-32b9d6a5da37"), nutri: { vitamins: "Vit A, K", protein: "0.9g", fiber: "2.8g" } },
    { id: "tf-beans", name: "Beans Kit", price: 42, hue: "#8a9e4a", accent: "#5a6b28", photo: img("photo-1622206151226-18ca2c9ab4a1"), nutri: { vitamins: "Vit A, C, K", protein: "1.8g", fiber: "3.4g" } },
  ];

  const MOMS_EXTRAS = [
    { id: "extra-salad", name: "Extra Salad", price: 40, kind: "salad", nutri: { vitamins: "Mixed Vit", protein: "1.5g", fiber: "2.5g" } },
    { id: "extra-veg", name: "Extra Veggie Kit", price: 60, kind: "veggie", nutri: { vitamins: "Vitamins A & C", protein: "2g", fiber: "3g" } },
    { id: "extra-fruit", name: "Premium Fruit Basket", price: 199, kind: "fruit", nutri: { vitamins: "Multi-Vit", protein: "1g", fiber: "4g" } },
  ];

  const FAMILY_STAPLES = [
    { id: "onion", name: "Onion", pricePerKg: 40, photo: img("photo-1518977956812-cd3dbadaafcd"), hue: "#e8d4c8", accent: "#8d6e63", nutri: { vitamins: "Vit C, B6", protein: "1.1g", fiber: "1.7g" }, healthTag: "BP Cautious" },
    { id: "potato", name: "Potato", pricePerKg: 36, photo: img("photo-1518977676601-b53f82aba655"), hue: "#d4a35a", accent: "#8a6230", nutri: { vitamins: "Vit C, B6", protein: "2g", fiber: "2.1g" }, healthTag: "Diabetes Cautious" },
    { id: "tomato", name: "Tomato", pricePerKg: 48, photo: img("photo-1592924357228-91a4daadcfea"), hue: "#d4543a", accent: "#9a2f1c", nutri: { vitamins: "Vit A, C", protein: "0.9g", fiber: "1.2g" }, healthTag: "Diabetes Friendly" },
  ];

  const ORDERS = [
    { id: "SG-2401", date: "Fri, 3 Oct", total: 486, status: "In-Transit", items: "Weekly Basket · 12 items" },
    { id: "SG-2390", date: "Tue, 30 Sep", total: 320, status: "Delivered", items: "Mom’s Kitchen · 2 kits" },
  ];
  const CUTOFF = { sun: "Friday · 11:00 PM", tue: "Sunday · 11:00 PM", fri: "Wednesday · 11:00 PM" };
  const SLOT_LABEL = { sun: "Sunday", tue: "Tuesday", fri: "Friday", "same-day": "Same-Day", scheduled: "Scheduled" };

  const state = {
    screen: "splash",
    phone: "",
    country: "+91",
    user: { name: "Ananya Rao", phone: "", avatar: "AR", address: "12 Palm Grove, Indiranagar", city: "Bengaluru 560038", wallet: 420 },
    locationGranted: false,
    homeTab: "ondemand",
    odCategory: "Veggies",
    kitsCount: 2,
    kitMode: "identical",
    customKitNames: { 1: "Kit 1 (Aarav)", 2: "Kit 3 (Ananya)" },
    cart: [],
    savedLater: [],
    odDraft: {},
    momsExtras: { salad: 0, veggie: 0, fruit: 0 },
    delivery: { ondemand: "same-day", moms: "sun", family: "tue" },
    payment: "upi-gpay",
    profileOpen: false,
    flagsOpen: false,
    showPropEditor: false,
    family: {
      staples: { onion: 1.5, potato: 1.5, tomato: 1 },
      veggies: {},
      leafy: { spinach: false, methi: false, dill: false },
      sproutsMode: "sprouted",
      sprouts: { moong: false, chana: false },
      extras: { fruit: false },
      inCart: false,
    },
    nutri: { iron: { delivered: 68, upcoming: 18 }, protein: { delivered: 54, upcoming: 22 }, fiber: { delivered: 72, upcoming: 14 }, points: 1240, pointsGoal: 1490 },
    cartBounce: false,
    navDir: 1,
    animatePane: false,
  };

  const $ = (sel, root = document) => root.querySelector(sel);
  const screensEl = $("#screens");
  const drawerEl = $("#profile-drawer");
  const scrimEl = $("#drawer-scrim");
  const loaderEl = $("#loader");

  const TITLES = {
    splash: "Smart Green",
    login: "Login · Smart Green",
    otp: "Enter OTP · Smart Green",
    location: "Location · Smart Green",
    home: "Home · Smart Green",
    hubdetail: "Journey Hub Detail · Smart Green",
    cart: "Your Cart · Smart Green",
    checkout: "Checkout · Smart Green",
    success: "Order Confirmed · Smart Green",
    nutri: "Nutri-Tracker · Smart Green",
    orders: "My Orders · Smart Green",
  };

  let saveTimer = 0;
  let renderTimer = 0;
  let focusKey = null;
  let ignoreHash = false;

  function persistNow() {
    try {
      localStorage.setItem(STORAGE, JSON.stringify({
        phone: state.phone, user: state.user, locationGranted: state.locationGranted,
        cart: state.cart, savedLater: state.savedLater, kitsCount: state.kitsCount, kitMode: state.kitMode,
        customKitNames: state.customKitNames, family: state.family,
        momsExtras: state.momsExtras, delivery: state.delivery, homeTab: state.homeTab, odDraft: state.odDraft,
      }));
    } catch (_) {}
  }

  function save() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(persistNow, 80);
  }

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE) || localStorage.getItem("smart-green-v5");
      if (!raw) return;
      const d = JSON.parse(raw);
      if (d.phone) state.phone = d.phone;
      if (d.user) Object.assign(state.user, d.user);
      if (d.locationGranted) state.locationGranted = d.locationGranted;
      if (Array.isArray(d.cart)) state.cart = d.cart;
      if (Array.isArray(d.savedLater)) state.savedLater = d.savedLater;
      if (d.kitsCount) state.kitsCount = d.kitsCount;
      if (d.kitMode) state.kitMode = d.kitMode;
      if (d.customKitNames) state.customKitNames = d.customKitNames;
      if (d.family) {
        state.family = { ...state.family, ...d.family, staples: { ...state.family.staples, ...(d.family.staples || {}) }, leafy: { ...state.family.leafy, ...(d.family.leafy || {}) }, sprouts: { ...state.family.sprouts, ...(d.family.sprouts || {}) }, extras: { ...state.family.extras, ...(d.family.extras || {}) } };
      }
      if (d.momsExtras) Object.assign(state.momsExtras, d.momsExtras);
      if (d.delivery) Object.assign(state.delivery, d.delivery);
      if (d.homeTab) state.homeTab = d.homeTab;
      if (d.odDraft) state.odDraft = d.odDraft;
    } catch (_) {}
  }

  function toast(msg) {
    const el = $("#toast");
    if (!el) return;
    el.hidden = false;
    el.textContent = msg;
    clearTimeout(toast._t);
    toast._t = setTimeout(() => { el.hidden = true; el.textContent = ""; }, 2200);
  }

  function showLoader(ms = 220) {
    loaderEl.hidden = false;
    loaderEl.setAttribute("aria-busy", "true");
    return new Promise((r) => setTimeout(() => {
      loaderEl.hidden = true;
      loaderEl.setAttribute("aria-busy", "false");
      r();
    }, ms));
  }

  function setTitle() {
    document.title = TITLES[state.screen] || TITLES.splash;
  }

  function syncHash(replace = false) {
    let hash = `#/${state.screen}`;
    if (state.screen === "hubdetail") hash += `/${state.homeTab}`;
    if (location.hash === hash) return;
    ignoreHash = true;
    if (replace) history.replaceState(null, "", hash);
    else history.pushState(null, "", hash);
    queueMicrotask(() => { ignoreHash = false; });
  }

  function applyHash() {
    const raw = (location.hash || "").replace(/^#\/?/, "");
    if (!raw) return false;
    const [screen, tab] = raw.split("/");
    const allowed = Object.keys(TITLES);
    if (!allowed.includes(screen)) return false;
    if (["home", "hubdetail", "cart", "checkout", "nutri", "orders", "success"].includes(screen) && !(state.locationGranted && state.phone)) {
      state.screen = state.phone ? "location" : "login";
      return true;
    }
    state.screen = screen;
    if (screen === "hubdetail" && MODES.includes(tab)) state.homeTab = tab;
    return true;
  }

  function restoreFocus() {
    if (state.profileOpen) {
      drawerEl.querySelector("#closeProfile")?.focus();
      return;
    }
    if (focusKey) {
      const hit = screensEl.querySelector(`[data-focus="${focusKey}"], #${CSS.escape(focusKey)}`);
      if (hit) { hit.focus({ preventScroll: true }); focusKey = null; return; }
    }
  }

  function trapDrawerFocus(e) {
    if (!state.profileOpen || e.key !== "Tab") return;
    const nodes = [...drawerEl.querySelectorAll("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])")].filter((n) => !n.hasAttribute("disabled") && n.getClientRects().length);
    if (!nodes.length) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  function formatGrams(g) { return g >= 1000 ? `${(g / 1000).toFixed(g % 1000 === 0 ? 0 : 1)}kg` : `${g}g`; }
  function priceForWeight(pricePerKg, grams) { return Math.round(pricePerKg * (grams / 1000)); }

  function logoSvg(size = 48) {
    return `<svg width="${size}" height="${size}" viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <rect x="8" y="30" width="40" height="22" rx="6" fill="#1B4D3E"/>
      <rect x="12" y="34" width="32" height="14" rx="3" fill="#E8F5E9"/>
      <circle cx="18" cy="54" r="4" fill="#112921"/>
      <circle cx="38" cy="54" r="4" fill="#112921"/>
      <rect x="28" y="14" width="18" height="26" rx="4" fill="#112921"/>
      <rect x="31" y="18" width="12" height="16" rx="2" fill="#81C784"/>
      <path d="M46 18c6 4 10 8 10 14a8 8 0 1 1-16 0c0-4 2-7 4-10 2 3 3 4 5 4 0-4 .5-6.5 0-8z" fill="#4CAF50"/>
      <path d="M52 16c3 2 5 4 5 7a4 4 0 1 1-8 0c0-2 1-3.5 2-5" fill="#2E7D32"/>
    </svg>`;
  }

  function icon(name) {
    const paths = {
      home: `<path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1z"/>`,
      nutri: `<path d="M12 3v18M7 8c3 0 5 2 5 5s-2 5-5 5M17 8c-3 0-5 2-5 5s2 5 5 5"/>`,
      orders: `<rect x="4" y="5" width="16" height="14" rx="2"/><path d="M8 9h8M8 13h5"/>`,
      cart: `<path d="M3 5h2l2.2 10h9.6L19 8H7"/><circle cx="10" cy="19" r="1.5"/><circle cx="16" cy="19" r="1.5"/>`,
      pin: `<path d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>`,
      back: `<path d="M15 5 8 12l7 7"/>`,
      support: `<path d="M12 3a7 7 0 0 0-7 7v3a3 3 0 0 0 3 3h1v-6H7a5 5 0 0 1 10 0h-2v6h1a3 3 0 0 0 3-3v-3a7 7 0 0 0-7-7z"/>`,
      close: `<path d="M6 6l12 12M18 6 6 18"/>`,
      check: `<path d="M5 12l5 5L20 7"/>`,
    };
    return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${paths[name] || ""}</svg>`;
  }

  function producePhoto(item, alt = "") {
    const label = alt || item.name || "Produce";
    const fallback = `data:image/svg+xml,${encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 340"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#E8F5E9"/><stop offset="1" stop-color="${item.hue || "#C8E6C9"}"/></linearGradient></defs><rect width="400" height="340" fill="url(#g)"/><circle cx="200" cy="170" r="88" fill="${item.accent || "#2E7D32"}" opacity=".85"/><text x="200" y="300" text-anchor="middle" font-family="sans-serif" font-size="28" fill="#112921" font-weight="700">${label}</text></svg>`
    )}`;
    const attrs = `class="produce-img" alt="${label}" width="400" height="340" decoding="async" loading="lazy"`;
    if (!item.photo) return `<img ${attrs} src="${fallback}" />`;
    return `<img ${attrs} src="${item.photo}" onerror="this.onerror=null;this.src='${fallback}'" />`;
  }

  function cartCount() { return state.cart.reduce((n, i) => n + (i.qty || 1), 0); }
  function itemsBySource(src) { return state.cart.filter((c) => c.source === src); }
  function lineTotal(item) { return item.free ? 0 : ((item.price || 0) + (item.extraCharge || 0)) * (item.qty || 1); }
  function sectionTotal(src) { return itemsBySource(src).reduce((n, i) => n + lineTotal(i), 0); }
  function momsVegSelected() {
    return itemsBySource("moms").filter((c) => !c.free && !c.extraKind && MOMS_VEG.some((v) => v.id === c.id));
  }

  function familyBasketValue() {
    let n = 0;
    for (const s of FAMILY_STAPLES) n += Math.round((state.family.staples[s.id] || 0) * s.pricePerKg);
    for (const id of Object.keys(state.family.veggies)) {
      const meta = CATALOG.Veggies.find((v) => v.id === id);
      if (!meta) continue;
      const prefs = state.family.veggies[id];
      n += priceForWeight(meta.pricePerKg, 500) + (prefs.cut ? 5 : 0) + (prefs.washed ? 5 : 0);
    }
    for (const on of Object.values(state.family.leafy)) if (on) n += 30;
    for (const on of Object.values(state.family.sprouts)) if (on) n += 55 + (state.family.sproutsMode === "sprouted" ? 10 : 0);
    if (state.family.extras.fruit) n += 299;
    return n;
  }

  function cartTotals() {
    const onDemand = sectionTotal("ondemand");
    const moms = sectionTotal("moms");
    const family = sectionTotal("family");
    const odDelivery = onDemand > 0 && state.delivery.ondemand === "same-day" ? 40 : 0;
    const discount = onDemand + moms + family >= 1500 ? 50 : 0;
    const subtotal = onDemand + moms + family;
    const walletUse = state.payment === "wallet" ? Math.min(state.user.wallet, Math.max(0, subtotal + odDelivery - discount)) : 0;
    return {
      onDemand, moms, family, odDelivery, discount, walletUse, subtotal,
      total: Math.max(0, subtotal + odDelivery - discount - walletUse),
      movMet: onDemand === 0 || onDemand >= MOV,
      movShort: Math.max(0, MOV - onDemand),
      movPct: Math.min(100, Math.round((onDemand / MOV) * 100)),
    };
  }

  function cartStatusLines() {
    const t = cartTotals();
    const lines = [];
    if (t.onDemand > 0) lines.push(t.movMet ? { ok: true, text: "On-Demand minimum reached" } : { ok: false, text: `On-Demand needs ₹${t.movShort} more` });
    const vegN = momsVegSelected().length;
    if (vegN > 0 || itemsBySource("moms").length) {
      lines.push(vegN >= 6 ? { ok: true, text: "Mom’s Kitchen kit complete" } : { ok: false, text: `Mom’s Kitchen: choose ${6 - vegN} more veggie kit${6 - vegN === 1 ? "" : "s"}` });
    }
    return lines;
  }

  function upsertCart(item) {
    const idx = state.cart.findIndex((c) => c.key === item.key);
    if (idx >= 0) state.cart[idx] = { ...state.cart[idx], ...item };
    else state.cart.push(item);
    state.cartBounce = true;
    save();
  }
  function removeCart(key) { state.cart = state.cart.filter((c) => c.key !== key); save(); }

  function moveToLater(key) {
    const item = state.cart.find((c) => c.key === key);
    if (!item || item.free) return;
    state.savedLater = [item, ...state.savedLater.filter((x) => x.key !== key)];
    removeCart(key);
    ensureMomsFreebies();
  }
  function restoreLater(key) {
    const item = state.savedLater.find((c) => c.key === key);
    if (!item) return;
    state.savedLater = state.savedLater.filter((c) => c.key !== key);
    upsertCart(item);
    ensureMomsFreebies();
  }

  async function go(screen, opts = {}) {
    state.screen = screen;
    state.profileOpen = false;
    save();
    syncHash(!!opts.replaceHash);
    if (["home", "hubdetail", "cart", "checkout"].includes(screen) && !opts.silent) await showLoader(120);
    scheduleRender({ keepScroll: !!opts.keepScroll, focus: opts.focus });
    if (!opts.keepScroll) window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function navBar(active) {
    const tabs = [["home", "Home", "home"], ["nutri", "Nutri-Tracker", "nutri"], ["orders", "My Orders", "orders"]];
    return `<nav class="bottom-nav" aria-label="Primary">${tabs.map(([id, label, ic]) => `
      <button type="button" class="nav-item ${active === id ? "active" : ""}" data-go="${id}" aria-current="${active === id ? "page" : "false"}">${icon(ic)}<span>${label}</span></button>`).join("")}</nav>`;
  }
  function profileBtn() {
    return `<button type="button" id="openProfile" class="avatar-btn" data-focus="openProfile" aria-label="Open profile" aria-haspopup="dialog">${state.user.avatar}</button>`;
  }
  function brandRow(withProfile = true) {
    return `<div class="brand-row">
      <div class="brand-left">
        <div class="logo-mark sm shrink-0">${logoSvg(26)}</div>
        <div class="min-w-0">
          <h1 class="brand-title">Smart Green</h1>
          <p class="font-mr brand-tag">तुमचं हिरवं, स्मार्ट घर</p>
        </div>
      </div>
      ${withProfile ? profileBtn() : ""}
    </div>`;
  }

  function stickyCartBar() {
    if (!cartCount() || (state.screen !== "home" && state.screen !== "hubdetail")) return "";
    const t = cartTotals();
    const parts = [];
    if (t.onDemand) parts.push(t.movMet ? "On-Demand · ₹200 met" : `On-Demand · ₹${t.movShort} to go`);
    if (t.moms) parts.push("Mom’s Kitchen");
    if (t.family) parts.push("Family Kitchen");
    return `<div class="sticky-cart ${state.cartBounce ? "pop" : ""}"><button type="button" data-go="cart" class="sticky-cart-btn">
      <span class="sticky-cart-left"><span class="sticky-cart-icon">${icon("cart")}<em>${cartCount()}</em></span>
      <span><strong>${cartCount()} items · ₹${t.subtotal + t.odDelivery}</strong><small>${parts.join(" · ") || "Your basket"}</small></span></span>
      <span class="sticky-cart-cta">View Cart</span></button></div>`;
  }

  function recommendations(mode) {
    const t = cartTotals();
    const cards = [];
    if (mode === "ondemand" && t.onDemand > 0 && !t.movMet) {
      cards.push({ title: "Almost there", body: `You’re ₹${t.movShort} away from the ₹${MOV} minimum.`, cta: "Add more", action: "stay" });
    }
    if (mode === "moms") {
      const n = momsVegSelected().length;
      if (n > 0 && n < 6) cards.push({ title: "Complete your kit", body: `You’ve selected ${n} veggie kits. You can choose ${6 - n} more.` });
      if (n >= 1) cards.push({ title: "Free salads added", body: `${Math.min(n, 6)} free salads were added automatically (1:1, max 6).` });
      if (state.kitsCount >= 2) cards.push({ title: "Quantities adjusted", body: `Portions automatically scale for ${state.kitsCount} kit orders.` });
    }
    if (mode === "family") {
      const leafyN = Object.values(state.family.leafy).filter(Boolean).length;
      const vegN = Object.keys(state.family.veggies).length;
      if (vegN > 0 && vegN < 6) cards.push({ title: "Complete your basket", body: `Add ${6 - vegN} more sorted veggies to finish the weekly plan.` });
      if (!state.family.extras.fruit) cards.push({ title: "Recommended for you", body: "Would you like to add a Premium Fruit Basket?", cta: "Add fruit", action: "add-fruit" });
    }
    if (!cards.length) return "";
    return `<div class="reco-stack">${cards.slice(0, 2).map((c) => `
      <aside class="reco-card"><div><p class="reco-kicker">Recommended for you</p><p class="reco-title">${c.title}</p><p class="reco-body">${c.body}</p></div>
      ${c.cta ? `<button type="button" class="reco-cta" data-reco="${c.action || "stay"}">${c.cta}</button>` : ""}</aside>`).join("")}</div>`;
  }

  function renderSplash() {
    return `<section class="screen px-6 pt-14 pb-8 justify-between onboarding-screen">
      <div class="flex-1 flex flex-col items-center justify-center text-center hero-float">
        <div class="logo-mark logo-pulse mb-5" style="width:92px;height:92px;border-radius:28px">${logoSvg(58)}</div>
        <h1 class="font-display text-4xl font-semibold tracking-tight fade-in-up">Smart Green</h1>
        <p class="font-mr mt-2 text-lg font-bold text-terra-deep fade-in-up delay-1">तुमचं हिरवं, स्मार्ट घर</p>
        <p class="mt-2 text-sm font-bold text-ink-mute fade-in-up delay-2">Pack to Pan, As Healthy as You Can</p>
        <p class="mt-4 max-w-[280px] text-[15px] text-ink-mute font-semibold leading-relaxed fade-in-up delay-3">Fresh produce, kid tiffins & weekly baskets — delivered with care.</p>
      </div>
      <button type="button" data-go="login" class="w-full h-14 rounded-2xl bg-terra text-white font-extrabold text-lg shadow-lift btn-bounce fade-in-up delay-4">Get Started</button>
    </section>`;
  }

  function renderLogin() {
    const flags = [["+91", "🇮🇳 India"], ["+1", "🇺🇸 USA"], ["+44", "🇬🇧 UK"], ["+971", "🇦🇪 UAE"]];
    const filled = !!(state.phone && state.phone.length);
    return `<section class="screen px-5 pt-8 pb-8 onboarding-screen">
      <div class="mb-5 hero-float">${brandRow(false)}</div>
      <div class="fade-in-up delay-1"><h2 class="font-display text-2xl font-semibold">Welcome back</h2>
        <p class="mt-1 text-ink-mute font-semibold text-[15px]">Login with your mobile number</p></div>
      <div class="mt-6 fade-in-up delay-2"><div class="phone-field ${filled ? "is-focused" : ""}" id="phoneField">
        <div class="relative">
          <button type="button" id="flagBtn" class="flag-chip" aria-expanded="${state.flagsOpen}">
            <span class="flag-emoji">🇮🇳</span><span class="font-extrabold">${state.country}</span><span class="text-ink-faint">▾</span>
          </button>
          <div id="flagMenu" class="flag-menu ${state.flagsOpen ? "open" : ""}">
            ${flags.map(([c, l]) => `<button type="button" data-flag="${c}" class="flag-option">${l} <strong>${c}</strong></button>`).join("")}
          </div>
        </div>
        <div class="float-wrap">
          <input id="phoneInput" type="tel" inputmode="numeric" maxlength="10" placeholder=" " value="${state.phone}" autocomplete="tel" />
          <label for="phoneInput">Mobile number</label>
        </div>
      </div></div>
      <button type="button" id="sendOtp" class="mt-5 w-full h-14 rounded-2xl bg-peach text-ink font-extrabold text-lg shadow-lift btn-bounce fade-in-up delay-3">Send OTP</button>
    </section>`;
  }

  function renderOtp() {
    return `<section class="screen px-5 pt-8 pb-8">
      <button type="button" data-go="login" class="text-ink-mute mb-4">${icon("back")}</button>
      <h1 class="font-display text-3xl font-semibold">Enter OTP</h1>
      <p class="mt-2 text-ink-mute font-semibold text-lg">Code sent to <span class="text-ink font-bold">${state.country} ${state.phone}</span></p>
      <div class="mt-8 flex gap-3 justify-between">
        ${[0,1,2,3].map((i) => `<input data-otp="${i}" maxlength="1" inputmode="numeric" class="w-16 h-16 rounded-2xl bg-white border border-black/10 text-center text-2xl font-extrabold focus:border-terra" />`).join("")}
      </div>
      <button type="button" id="verifyOtp" class="mt-8 w-full h-14 rounded-2xl bg-terra text-white font-extrabold text-lg shadow-lift">Verify & Continue</button>
      <p class="mt-3 text-center text-sm text-ink-faint font-semibold">Demo OTP: 1234</p>
    </section>`;
  }

  function renderLocation() {
    return `<section class="screen px-5 pt-10 pb-8 justify-between">
      <div>
        <div class="logo-mark sm mb-4">${logoSvg(26)}</div>
        <div class="w-14 h-14 rounded-2xl bg-amber-soft grid place-items-center text-terra mb-4">${icon("pin")}</div>
        <h1 class="font-display text-[1.85rem] leading-tight font-semibold">Allow location access</h1>
        <p class="mt-3 text-[16px] text-ink-mute leading-relaxed font-semibold">We use your location for the nearest dark-store and accurate delivery slots.</p>
      </div>
      <div class="space-y-3 mt-6">
        <button type="button" id="grantLoc" class="w-full h-14 rounded-2xl bg-terra text-white font-extrabold text-lg">Allow Location</button>
        <button type="button" id="skipLoc" class="w-full h-12 font-bold text-ink-mute">Enter address manually</button>
      </div>
    </section>`;
  }

  function renderHome() {
    return `<section class="screen with-nav">
      <header class="home-header">
        ${brandRow(true)}
        <div class="loc-row">
          <button type="button" class="loc-chip" data-go="location">
            <span class="text-terra">${icon("pin")}</span>
            <span class="min-w-0 flex-1 text-left"><span class="loc-kicker">Delivering to</span>
              <span class="loc-line">${state.user.address} · <em>Change</em></span></span>
          </button>
          <button type="button" class="cart-mini" data-go="cart" aria-label="Open cart">${icon("cart")}${cartCount() ? `<em>${cartCount()}</em>` : ""}</button>
        </div>
      </header>
      <div class="welcome-hub-container px-4 py-4">
        <div class="welcome-hub-header mb-3">
          <h2>Welcome Hub</h2>
          <p>Explore your tailor-made sustainable grocery pathways</p>
        </div>
        <div class="journey-cards-grid">
          ${MODES.map((id) => {
            const meta = MODE_META[id];
            const iconsMap = { ondemand: "⚡", moms: "👩‍🍳", family: "👨‍👩‍👧‍👦" };
            return `<button type="button" data-open-hub="${id}" class="journey-card-item animated-card">
              <div class="journey-card-icon">${iconsMap[id]}</div>
              <div class="journey-card-content">
                <h3>${meta.label}</h3>
                <p>${meta.desc}</p>
              </div>
              <span class="journey-card-arrow">→</span>
            </button>`;
          }).join("")}
        </div>
      </div>
      <div class="p-4">
        <div class="panel bg-surface-subtle p-4 rounded-2xl">
          <h3 class="font-extrabold text-forest-dark mb-1">🌿 Smart Green Guarantee</h3>
          <p class="text-xs text-ink-mute font-medium leading-relaxed">Pack to Pan freshness with zero preservatives, quality checked for kids and family wellness.</p>
        </div>
      </div>
      ${navBar("home")}
    </section>`;
  }

  function renderHubDetail() {
    const mode = state.homeTab;
    const panes = { ondemand: renderOnDemandPane, moms: renderMomsPane, family: renderFamilyPane };
    const titles = { ondemand: "⚡ On-Demand Quick Picks", moms: "👩‍🍳 Mom's Kitchen Weekly Kits", family: "👨‍👩‍👧‍👦 Family Health Basket" };
    
    // Bullet details per card for dedicated view
    const cardDetails = {
      ondemand: [
        "**Instant Delivery Slots**: Same-day lightning delivery right at your doorstep.",
        "**Pick Exactly What You Need**: No rigid bundle constraints, pure flexibility.",
        "**AI Freshness Assurance**: Farm-picked greens harvested within 24 hours.",
        "**Smart Suggestions**: Real-time recipe pairing and automated nutrition balance."
      ],
      moms: [
        "**Multi-Kit Customizer**: Manage independent custom kits (Kit 1, Kit 2) with editable names.",
        "**Portion Scaler**: Perfectly proportioned 250g+ vegetable tiffin kits for kids.",
        "**Free Perks**: Automatic 1:1 free salads and free aromatic herb kits included.",
        "**Zero Fuss Cooking**: Pre-washed and chopped options to save morning prep time."
      ],
      family: [
        "**Health-Smart Tags**: Dedicated Diabetes-Friendly & BP Cautious wellness highlights.",
        "**Proportion Customizer**: Easily adjust staple weights (Onion, Potato, Tomato).",
        "**Complete Weekly Basket**: Sorted veggies, leafy greens, and organic sprouts.",
        "**Max Savings**: Automatic volume discounts on orders over ₹1,500."
      ]
    };

    return `<section class="screen with-nav with-sticky-cart">
      <header class="page-header">
        <button type="button" data-go="home" class="icon-back">${icon("back")}</button>
        <div class="flex-1"><h1>${titles[mode]}</h1><p>Detailed journey overview & shopping</p></div>
        ${profileBtn()}
      </header>
      <div class="page-body">
        <div class="panel detail-bullets-panel mb-4">
          <p class="panel-kicker">Journey Highlights</p>
          <ul class="styled-bullet-list mt-2">
            ${cardDetails[mode].map(b => `<li>${b.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</li>`).join("")}
          </ul>
        </div>
        ${panes[mode]()}
      </div>
      ${stickyCartBar()}
      ${navBar("home")}
    </section>`;
  }

  function draftFor(id) {
    return state.odDraft[id] || { weight: 500, cut: false, washed: false, sprouted: false, qty: 1 };
  }
  function odUnitPrice(item, draft) {
    return priceForWeight(item.pricePerKg, draft.weight) + (draft.sprouted ? 10 : 0) + (draft.cut ? 5 : 0) + (draft.washed ? 5 : 0);
  }

  function odCard(item) {
    const key = `od:${item.id}`;
    const inCart = state.cart.find((c) => c.key === key);
    const draft = inCart
      ? { weight: inCart.weight, cut: !!inCart.cut, washed: !!inCart.washed, sprouted: !!inCart.sprouted, qty: inCart.qty || 1 }
      : draftFor(item.id);
    const price = odUnitPrice(item, draft);
    const nutri = item.nutri ? `<div class="nutritional-tags-row"><span class="nutri-badge">Vit: ${item.nutri.vitamins}</span><span class="nutri-badge">Pro: ${item.nutri.protein}</span><span class="nutri-badge">Fib: ${item.nutri.fiber}</span></div>` : "";

    if (inCart) {
      return `<article class="prod-card is-added card-pop">
        <div class="produce-art relative">${producePhoto(item)}<span class="added-chip">✓ Added</span></div>
        <div class="prod-body">
          <h3 class="prod-name">${item.name}</h3>
          ${nutri}
          <p class="prod-selected">Selected: <strong>${formatGrams(draft.weight)} · ₹${price}</strong></p>
          <div class="variant-row">${[250,500,1000].map((g) => `<button type="button" class="qty-chip ${draft.weight === g ? "active" : ""}" data-od-weight="${item.id}" data-g="${g}">${formatGrams(g)}</button>`).join("")}</div>
          <div class="attr-row mt-2">
            <button type="button" class="switch ${draft.cut ? "on" : ""}" data-od-attr="${item.id}" data-attr="cut"><span class="track"><span class="knob"></span></span>Cut</button>
            <button type="button" class="switch ${draft.washed ? "on" : ""}" data-od-attr="${item.id}" data-attr="washed"><span class="track"><span class="knob"></span></span>Washed</button>
          </div>
          <div class="qty-stepper mt-2"><span class="qty-label">Quantity</span>
            <div class="stepper">
              <button type="button" data-od-qty="${item.id}" data-d="-1">−</button><strong>${draft.qty}</strong>
              <button type="button" data-od-qty="${item.id}" data-d="1">+</button>
            </div>
          </div>
          <div class="prod-actions mt-2">
            <button type="button" class="btn-update" data-od-update="${item.id}" data-focus="${item.id}">Update Cart</button>
            <button type="button" class="btn-remove" data-od-remove="${item.id}">Remove</button>
          </div>
        </div>
      </article>`;
    }
    return `<article class="prod-card card-pop">
      <div class="produce-art">${producePhoto(item)}</div>
      <div class="prod-body">
        <h3 class="prod-name">${item.name}</h3>
        <p class="prod-blurb">${item.blurb || "Fresh produce"}</p>
        ${nutri}
        <div class="variant-row">${[250,500,1000].map((g) => `<button type="button" class="qty-chip ${draft.weight === g ? "active" : ""}" data-od-weight="${item.id}" data-g="${g}">${formatGrams(g)}</button>`).join("")}</div>
        <div class="attr-row mt-2">
          <button type="button" class="switch ${draft.cut ? "on" : ""}" data-od-attr="${item.id}" data-attr="cut"><span class="track"><span class="knob"></span></span>Cut</button>
          <button type="button" class="switch ${draft.washed ? "on" : ""}" data-od-attr="${item.id}" data-attr="washed"><span class="track"><span class="knob"></span></span>Washed</button>
          ${item.sproutable ? `<button type="button" class="switch ${draft.sprouted ? "on" : ""}" data-od-attr="${item.id}" data-attr="sprouted"><span class="track"><span class="knob"></span></span>Sprouted</button>` : ""}
        </div>
        <div class="price-row mt-2"><strong class="prod-price">₹${price}</strong><span class="prod-unit">${formatGrams(draft.weight)}</span></div>
        <button type="button" class="btn-add mt-2" data-od-add="${item.id}" data-focus="${item.id}">Add to Cart</button>
      </div>
    </article>`;
  }

  function movPanel() {
    const t = cartTotals();
    return `<div class="mov-panel ${t.onDemand >= MOV ? "met" : ""}">
      <div class="mov-head"><span>ON-DEMAND CART</span><strong>₹${t.onDemand} / ₹${MOV}</strong></div>
      <div class="mov-track"><div class="mov-fill" style="width:${t.movPct}%"></div></div>
      <p class="mov-msg">${t.onDemand >= MOV ? "✓ Minimum ₹200 reached · Ready for checkout" : t.onDemand ? `₹${t.movShort} more to unlock checkout` : `Add items · ₹${MOV} minimum to checkout`}</p>
    </div>`;
  }

  function renderOnDemandPane() {
    const cats = Object.keys(CATALOG);
    const items = CATALOG[state.odCategory];
    return `
      ${movPanel()}
      ${recommendations("ondemand")}
      <div class="pill-scroll mt-3 mb-3">${cats.map((c) => `<button type="button" data-od-cat="${c}" class="cat-pill ${state.odCategory === c ? "active" : ""}">${c}</button>`).join("")}</div>
      <div class="prod-grid">${items.map((item) => odCard(item)).join("")}</div>
      
      <div class="panel mt-4 p-4 rounded-2xl bg-amber-soft border border-amber/40">
        <h4 class="font-extrabold text-amber-deep text-sm mb-2">💡 Expert On-Demand Suggestions (Try These!):</h4>
        <ul class="text-xs text-ink-mute font-semibold space-y-1 pl-4 list-disc">
          <li><strong>Organic Hydroponic Herbs Combo:</strong> Pair fresh mint and coriander with lemon for immunity detox water.</li>
          <li><strong>Instant Salad Express Pack:</strong> Select pre-washed carrots, tomatoes, and cucumber with cold-pressed oil for quick meal prep.</li>
        </ul>
        <p class="text-[11px] text-forest-dark font-bold mt-2">Tumhala he suggestions on-demand cart madhye add karayche ahet ka?</p>
      </div>
    `;
  }

  function renderMomsPane() {
    const selected = momsVegSelected();
    const n = selected.length;
    const freeSalads = Math.min(n, 6);
    const g = state.kitsCount * GRAMS_PER_KIT;
    return `
      <div class="mode-hero mb-3"><h2>Mom’s Kitchen</h2><p>Smart weekly veggie kits & custom tiffins</p></div>
      <section class="panel">
        <p class="panel-kicker">Kit Counter & Customizer</p><p class="panel-title">How many kits do you need?</p>
        <div class="kids-stepper">
          <button type="button" data-kits-delta="-1" class="step-btn">−</button>
          <div class="kids-count"><strong>${state.kitsCount}</strong><span>${state.kitsCount === 1 ? "kit" : "kits"}</span></div>
          <button type="button" data-kits-delta="1" class="step-btn">+</button>
        </div>
        <div class="kit-mode-toggle mt-4">
          <button type="button" data-kit-mode="identical" class="seg-btn ${state.kitMode === 'identical' ? 'on' : ''}">Exact Identical Kits</button>
          <button type="button" data-kit-mode="custom" class="seg-btn ${state.kitMode === 'custom' ? 'on' : ''}">Separate Custom Kits</button>
        </div>
        ${state.kitMode === 'custom' ? `
          <div class="custom-kit-names-box mt-3">
            <p class="text-xs font-bold text-ink-mute mb-2">Edit Names for Each Kit:</p>
            ${Array.from({length: state.kitsCount}, (_, i) => i + 1).map(kNum => `
              <div class="custom-name-row mb-2">
                <label class="text-xs font-extrabold text-forest-dark">Kit ${kNum} Name:</label>
                <input type="text" data-kit-name-id="${kNum}" class="custom-name-input" value="${state.customKitNames[kNum] || `Kit ${kNum}`}" placeholder="e.g. Tiffin Box A" />
              </div>
            `).join("")}
          </div>
        ` : ""}
        <div class="animated-instructions-box mt-3 p-3 bg-surface-subtle rounded-xl border border-border-subtle">
          <p class="text-xs font-extrabold text-forest-dark mb-1">✨ Quick Kit Guidelines:</p>
          <ul class="text-xs text-ink-mute space-y-1 pl-4 list-disc font-medium">
            <li>Eka kits madhye tumhala pratyek vegetable quantity easily select karta yeil.</li>
            <li>Tumhi ki tyachi requirement nusar qty (grams) change karu shakta.</li>
            <li>Pratyek kit sathi separate vegetable selection set karu shakta.</li>
          </ul>
        </div>
        <p class="auto-note mt-3">Quantities automatically scale for ${state.kitsCount} ${state.kitsCount === 1 ? "kit" : "kits"} · ${formatGrams(g)} per selection</p>
      </section>
      <section class="included-panel mt-3">
        <div class="included-head"><h3>Your Standard Kit</h3><span class="badge-included">✓ FREE INCLUDED</span></div>
        <ul class="included-list mt-2">
          <li>✓ 6 Veggie Kits (${state.kitMode === 'custom' ? 'Customizable per kit' : 'Standard uniform'})</li>
          <li>✓ Automatically adjusted quantities</li>
          <li>✓ Free Salad allocation (1:1, max 6)</li>
          <li>✓ 1 Free Aromatic Kit</li>
        </ul>
      </section>
      <section class="panel mt-3">
        <div class="panel-row"><div><p class="panel-kicker">Step 2</p><h3 class="panel-title">Choose your veggie kits</h3></div>
          <span class="count-pill ${n >= 6 ? "ok" : ""}">${n} / 6</span></div>
        <div class="kit-grid mt-2">${MOMS_VEG.map((item) => {
          const on = !!state.cart.find((c) => c.key === `moms:${item.id}`);
          const nutri = item.nutri ? `<div class="nutritional-tags-row mt-1"><span class="nutri-badge">Vit: ${item.nutri.vitamins}</span><span class="nutri-badge">Pro: ${item.nutri.protein}</span></div>` : "";
          return `<button type="button" data-moms-toggle="${item.id}" class="kit-card ${on ? "selected" : ""}">
            <div class="produce-art mini">${producePhoto(item)}</div>
            ${on ? `<span class="sel-check">✓</span>` : ""}
            <p class="kit-name">${item.name}</p>
            ${nutri}
            <p class="kit-meta mt-1"><span class="badge-included">Included</span> · ${formatGrams(g)}</p>
          </button>`;
        }).join("")}</div>
      </section>
      <section class="benefits-panel mt-3">
        <h3>Your free benefits</h3>
        <div class="benefit-row mt-2">
          <div class="benefit"><span class="badge-included">✓ Included</span><strong>${freeSalads} Free Salads</strong><small>1:1 with veggie kits · max 6</small></div>
          <div class="benefit"><span class="badge-included">✓ Included</span><strong>Free Aromatic Kit</strong><small>Ginger · Garlic · Coriander · Curry · Chilli · Lemon · ₹0</small></div>
        </div>
      </section>
      <section class="panel mt-3">
        <p class="panel-kicker">Recommended extras</p><h3 class="panel-title">Complete your weekly plan</h3>
        <div class="extra-list mt-2">${MOMS_EXTRAS.map((x) => {
          const qty = state.momsExtras[x.kind] || 0;
          return `<div class="extra-row"><div><p class="extra-name"><span class="badge-extra">+ Extra</span> ${x.name}</p><p class="extra-price">₹${x.price} each</p></div>
            <div class="stepper sm">
              <button type="button" data-moms-extra-d="${x.kind}" data-d="-1">−</button><strong>${qty}</strong>
              <button type="button" data-moms-extra-d="${x.kind}" data-d="1">+</button>
            </div></div>`;
        }).join("")}</div>
      </section>
      ${recommendations("moms")}
      <button type="button" id="reviewMomsKit" class="primary-cta mt-4">Review My Kit</button>
    `;
  }

  function renderFamilyPane() {
    const vegN = Object.keys(state.family.veggies).length;
    const leafyN = Object.values(state.family.leafy).filter(Boolean).length;
    const sproutN = Object.values(state.family.sprouts).filter(Boolean).length;
    const value = familyBasketValue();
    const leafyPhotos = { spinach: img("photo-1576045057995-568f588f82fb"), methi: img("photo-1508747703725-719777637510"), dill: img("photo-1459411621453-7b03977f4bfc") };
    return `
      <div class="mode-hero mb-3"><h2>Family Kitchen</h2><p>Build your weekly family basket with health-smart tags</p></div>
      <section class="panel included-panel">
        <div class="included-head"><h3>Your Standard Basket</h3><span class="badge-included">✓ Included</span></div>
        <div class="staple-summary mt-2">${FAMILY_STAPLES.map((s) => `
          <div class="flex justify-between items-center py-1">
            <div>
              <span>${s.name}</span>${s.healthTag ? `<span class="health-smart-tag ${s.healthTag.includes('Diabetes') ? 'tag-diabetes' : 'tag-bp'} ml-2">${s.healthTag}</span>` : ""}
            </div>
            <strong>${state.family.staples[s.id]}kg</strong>
          </div>`).join("")}</div>
        <button type="button" id="toggleProp" class="ghost-cta mt-2">${state.showPropEditor ? "Hide proportion editor" : "Adjust Proportion"}</button>
        <p class="basket-value mt-2">Basket value <strong>₹${value}</strong></p>
      </section>
      ${state.showPropEditor ? `<section class="panel mt-3"><p class="panel-kicker">1. Staples</p><h3 class="panel-title">Adjust included quantities</h3>
        ${FAMILY_STAPLES.map((s) => `<div class="prop-row mt-2"><div class="prop-left"><div class="produce-art tiny">${producePhoto(s)}</div>
          <div><p class="prop-name">${s.name} ${s.healthTag ? `<span class="health-smart-tag ${s.healthTag.includes('Diabetes') ? 'tag-diabetes' : 'tag-bp'}">${s.healthTag}</span>` : ""}</p><p class="prop-meta">Included · ₹${s.pricePerKg}/kg</p></div></div>
          <div class="stepper"><button type="button" data-staple="${s.id}" data-d="-0.5">−</button><strong>${state.family.staples[s.id]}kg</strong>
          <button type="button" data-staple="${s.id}" data-d="0.5">+</button></div></div>`).join("")}
      </section>` : ""}
      <section class="panel mt-3">
        <div class="panel-row"><div><p class="panel-kicker">2. Sorted Veggies</p><h3 class="panel-title">Choose up to 6</h3></div>
          <span class="count-pill ${vegN >= 6 ? "ok" : ""}">${vegN} / 6</span></div>
        <div class="kit-grid mt-2">${CATALOG.Veggies.slice(0, 6).map((v) => {
          const on = !!state.family.veggies[v.id];
          const prefs = state.family.veggies[v.id] || {};
          const nutri = v.nutri ? `<div class="nutri-badge mt-1">Vit: ${v.nutri.vitamins}</div>` : "";
          return `<div class="kit-card ${on ? "selected" : ""}"><button type="button" data-fam-veg="${v.id}" class="kit-hit">
            <div class="produce-art mini">${producePhoto(v)}</div>${on ? `<span class="sel-check">✓</span>` : ""}
            <p class="kit-name">${v.name}</p>${nutri}
            <p class="kit-meta mt-1">${on ? '<span class="badge-included">Selected</span>' : "Tap to add"}</p></button>
            ${on ? `<div class="attr-row tight mt-2">
              <button type="button" class="switch ${prefs.cut ? "on" : ""}" data-fam-attr="${v.id}" data-attr="cut"><span class="track"><span class="knob"></span></span>Cut</button>
              <button type="button" class="switch ${prefs.washed ? "on" : ""}" data-fam-attr="${v.id}" data-attr="washed"><span class="track"><span class="knob"></span></span>Washed</button>
            </div>` : ""}</div>`;
        }).join("")}</div>
      </section>
      <section class="panel mt-3">
        <div class="panel-row"><div><p class="panel-kicker">3. Leafy Greens</p><h3 class="panel-title">Choose up to 3</h3></div>
          <span class="count-pill">${leafyN} / 3</span></div>
        <div class="kit-grid three mt-2">${Object.entries(state.family.leafy).map(([k, on]) => `
          <button type="button" data-leafy="${k}" class="kit-card ${on ? "selected" : ""}">
            <div class="produce-art mini">${producePhoto({ id: k, name: k, photo: leafyPhotos[k], hue: "#cfe0b8", accent: "#8a9e5a" })}</div>
            ${on ? `<span class="sel-check">✓</span>` : ""}
            <p class="kit-name">${k[0].toUpperCase() + k.slice(1)}</p>
            <p class="kit-meta">${on ? '<span class="badge-included">Selected</span>' : "Tap to add"}</p>
          </button>`).join("")}</div>
      </section>
      <section class="panel mt-3">
        <div class="panel-row"><div><p class="panel-kicker">4. Sprouts</p><h3 class="panel-title">Choose 2 packs</h3></div>
          <span class="count-pill">${sproutN} / 2</span></div>
        <div class="seg mt-2">
          <button type="button" data-sprout-mode="raw" class="${state.family.sproutsMode === "raw" ? "on" : ""}">Raw</button>
          <button type="button" data-sprout-mode="sprouted" class="${state.family.sproutsMode === "sprouted" ? "on" : ""}">Sprouted +₹10</button>
        </div>
        <div class="kit-grid mt-2">${Object.entries(state.family.sprouts).map(([k, on]) => {
          const meta = CATALOG.Sprouts.find((s) => s.id === k) || { id: k, name: k, photo: img("photo-1540420773420-3366772f4999"), hue: "#c4b454", accent: "#8a7a28" };
          return `<button type="button" data-fam-sprout="${k}" class="kit-card ${on ? "selected" : ""}">
            <div class="produce-art mini">${producePhoto(meta)}</div>${on ? `<span class="sel-check">✓</span>` : ""}
            <p class="kit-name">${k[0].toUpperCase() + k.slice(1)}</p>
            <p class="kit-meta">${state.family.sproutsMode === "sprouted" ? "Sprouted" : "Raw"}</p></button>`;
        }).join("")}</div>
      </section>
      <section class="panel included-panel soft mt-3">
        <div class="included-head"><h3>5. Free Aromatic Kit</h3><span class="badge-included">✓ Included · ₹0</span></div>
        <p class="panel-sub">Automatically added with your weekly basket.</p>
      </section>
      <section class="panel mt-3">
        <p class="panel-kicker">6. Optional extras</p>
        <div class="extra-row mt-2"><div><p class="extra-name"><span class="badge-extra">+ Extra</span> Premium Fruit Basket</p><p class="extra-price">₹299</p></div>
          <button type="button" id="toggleFruit" class="btn-soft ${state.family.extras.fruit ? "on" : ""}">${state.family.extras.fruit ? "Added" : "Add"}</button></div>
      </section>
      ${recommendations("family")}
      <div class="basket-footer mt-4"><p>Basket value <strong>₹${value}</strong></p>
        <button type="button" id="addFamilyBasket" class="primary-cta mt-2">Add Weekly Basket to Cart</button></div>
    `;
  }

  function deliveryCards(section) {
    if (section === "ondemand") {
      const cur = state.delivery.ondemand;
      const scheduled = cur !== "same-day";
      return `<div class="del-grid">
        <button type="button" data-del-sec="ondemand" data-del="same-day" class="del-card ${cur === "same-day" ? "on" : ""}">
          <strong>🚚 Same-Day</strong><span>Paid delivery · ₹40</span><small>No cancellation after packing</small></button>
        <button type="button" data-del-sec="ondemand" data-del="scheduled" class="del-card ${scheduled ? "on" : ""}">
          <strong>📅 Scheduled</strong><span>Sun / Tue / Fri · Free</span><small>Cancel until cutoff</small></button>
      </div>
      ${scheduled ? `<div class="slot-row">${["sun","tue","fri"].map((s) => `
        <button type="button" data-del-sec="ondemand" data-del="${s}" class="slot-chip ${cur === s ? "on" : ""}">${SLOT_LABEL[s]}</button>`).join("")}</div>
        <p class="cutoff">Order changes until ${CUTOFF[cur] || CUTOFF.sun}</p>` : ""}`;
    }
    const cur = state.delivery[section];
    return `<div class="del-grid one">
      <div class="del-card on"><strong>📅 Scheduled only</strong><span>Sun / Tue / Fri · Free delivery</span><small>Same-day unavailable</small></div>
      <div class="del-card unavailable" aria-disabled="true"><strong>🚚 Same-Day</strong><span>Unavailable for this plan</span></div>
    </div>
    <div class="slot-row">${["sun","tue","fri"].map((s) => `
      <button type="button" data-del-sec="${section}" data-del="${s}" class="slot-chip ${cur === s ? "on" : ""}">${SLOT_LABEL[s]}</button>`).join("")}</div>
    <p class="cutoff">Changes/cancellation until ${CUTOFF[cur] || CUTOFF.sun}</p>`;
  }

  function cartItemRow(item) {
    return `<article class="cart-item">
      <div class="cart-item-top"><div>
        <p class="ci-name">${item.name}</p>
        <p class="ci-meta">${item.free ? "FREE · Included" : item.meta || formatGrams(item.weight || 0)}</p>
      </div><p class="ci-price">${item.free ? "₹0" : `₹${lineTotal(item)}`}</p></div>
      ${!item.free ? `<div class="cart-item-ops">
        ${item.source === "ondemand" ? `<div class="variant-row mt-2">${[250,500,1000].map((g) => `
          <button type="button" class="qty-chip ${item.weight === g ? "active" : ""}" data-cart-weight="${item.key}" data-g="${g}">${formatGrams(g)}</button>`).join("")}</div>
          <div class="stepper sm mt-2"><button type="button" data-cart-qty="${item.key}" data-d="-1">−</button><strong>${item.qty || 1}</strong>
          <button type="button" data-cart-qty="${item.key}" data-d="1">+</button></div>` :
          item.extraKind ? `<div class="stepper sm mt-2"><button type="button" data-cart-qty="${item.key}" data-d="-1">−</button><strong>${item.qty || 1}</strong>
          <button type="button" data-cart-qty="${item.key}" data-d="1">+</button></div>` : `<span class="ci-meta">${item.meta || ""}</span>`}
        <div class="ci-links mt-2"><button type="button" data-later="${item.key}">♡ Buy Later</button>
          <button type="button" data-remove="${item.key}">Remove</button></div>
      </div>` : ""}
    </article>`;
  }

  function renderCart() {
    const t = cartTotals();
    const status = cartStatusLines();
    const od = itemsBySource("ondemand");
    const moms = itemsBySource("moms");
    const family = itemsBySource("family");
    const empty = !state.cart.length && !state.savedLater.length;
    return `<section class="screen">
      <header class="page-header">
        <button type="button" data-go="home" class="icon-back">${icon("back")}</button>
        <div class="flex-1"><h1>Your Cart</h1><p>${cartCount()} items</p></div>
        ${profileBtn()}
      </header>
      <div class="page-body cart-body">
        ${empty ? `<div class="empty-cart">
          <div class="logo-mark logo-pulse mb-3 mx-auto" style="width:72px;height:72px;border-radius:22px">${logoSvg(44)}</div>
          <h2>Your basket is waiting</h2><p>Start building a healthier week.</p>
          <div class="empty-actions">
            <button type="button" data-go-hub="ondemand">Shop On-Demand</button>
            <button type="button" data-go-hub="moms">Build Mom’s Kitchen</button>
            <button type="button" data-go-hub="family">Build Family Kitchen</button>
          </div></div>` : `
        ${status.length ? `<section class="status-panel">${status.map((s) => `<p class="${s.ok ? "ok" : "warn"}">${s.ok ? "✓" : "⚠"} ${s.text}</p>`).join("")}</section>` : ""}
        <section class="cart-sec">
          <div class="cart-sec-head"><div><h2>On-Demand</h2><p>Same-day or scheduled delivery</p></div><strong>₹${t.onDemand}</strong></div>${deliveryCards("ondemand")}
          ${od.length ? od.map(cartItemRow).join("") : `<p class="empty-sec mt-2">No On-Demand items yet</p>`}
          <button type="button" class="add-more" data-go-hub="ondemand">+ Add More On-Demand Items</button>
        </section>
        <section class="cart-sec">
          <div class="cart-sec-head"><div><h2>Mom’s Kitchen</h2><p>Weekly Kits · ${state.kitsCount}${state.kitsCount === 1 ? "kit" : "kits"}</p></div><strong>₹${t.moms}</strong></div>${deliveryCards("moms")}
          ${moms.length ? `
            <div class="inc-block mt-2"><p class="inc-title">Included</p>${moms.filter((m) => m.free || !m.extraKind).map(cartItemRow).join("")}</div>
            ${moms.some((m) => m.extraKind) ? `<div class="extra-block mt-2"><p class="inc-title">Extras</p>${moms.filter((m) => m.extraKind).map(cartItemRow).join("")}</div>` : ""}`
            : `<p class="empty-sec mt-2">No Mom’s Kitchen kit yet</p>`}
          <button type="button" class="add-more" data-go-hub="moms">+ Add Mom’s Kitchen Extras</button>
        </section>
        <section class="cart-sec">
          <div class="cart-sec-head"><div><h2>Family Kitchen</h2><p>Weekly Family Basket</p></div><strong>₹${t.family}</strong></div>${deliveryCards("family")}
          ${family.length ? family.map(cartItemRow).join("") : `<p class="empty-sec mt-2">No Family Basket yet</p>`}
          <button type="button" class="add-more" data-go-hub="family">+ Add Family Kitchen Items</button>
        </section>
        <section class="summary-panel"><h2>Order Summary</h2>
          <div class="sum-row mt-2"><span>On-Demand</span><strong>₹${t.onDemand}</strong></div>
          <div class="sum-row"><span>Mom’s Kitchen</span><strong>₹${t.moms}</strong></div>
          <div class="sum-row"><span>Family Kitchen</span><strong>₹${t.family}</strong></div>
          <div class="sum-row"><span>Delivery</span><strong>${t.odDelivery ? `₹${t.odDelivery}` : "FREE"}</strong></div>
          ${t.discount ? `<div class="sum-row"><span>Discount</span><strong class="text-forest-light">-₹${t.discount}</strong></div>` : ""}
          <div class="sum-total mt-2"><span>TOTAL</span><strong>₹${t.subtotal + t.odDelivery - t.discount}</strong></div>
        </section>`}
      </div>
      ${state.cart.length ? `<div class="sticky-cta">
        ${!t.movMet && t.onDemand ? `<p class="cta-note">On-Demand needs ₹${t.movShort} more</p>` : ""}
        <button type="button" id="toCheckout" ${t.movMet ? "" : "disabled"} class="primary-cta flat">${t.movMet ? "Proceed to Checkout" : "MOV not met"}</button>
      </div>` : ""}
    </section>`;
  }

  function renderCheckout() {
    const t = cartTotals();
    return `<section class="screen">
      <header class="page-header">
        <button type="button" data-go="cart" class="icon-back">${icon("back")}</button>
        <div class="flex-1"><h1>Checkout</h1><p>Review & pay</p></div>
        ${profileBtn()}
      </header>
      <div class="page-body" style="display:grid;gap:12px">
        <article class="panel"><div style="display:flex;justify-content:space-between;gap:8px">
          <div><p class="panel-kicker">Delivery address</p><p class="panel-title">${state.user.address}</p><p class="panel-sub">${state.user.city}</p></div>
          <button type="button" data-go="location" class="text-forest-light font-extrabold text-sm">Edit</button></div></article>
        <article class="panel"><p class="panel-kicker">Payment</p>
          <div class="wallet-row my-2"><div><p class="font-extrabold">Smart Green Wallet</p><p class="text-sm font-bold text-forest-dark">Balance ₹${state.user.wallet}</p></div>
            <div style="display:flex;gap:8px"><button type="button" data-pay="wallet" class="btn-soft ${state.payment === "wallet" ? "on" : ""}">Use</button>
              <button type="button" id="topUp" class="btn-amber">Top-Up</button></div></div>
          ${[["upi-gpay","Google Pay / UPI"],["upi-phonepe","PhonePe"],["upi-paytm","Paytm"],["cards","Cards / Net Banking"]].map(([id, label]) => `
            <button type="button" data-pay="${id}" class="pay-row mt-2 ${state.payment === id ? "on" : ""}"><span>${label}</span><span class="radio"></span></button>`).join("")}
        </article>
        <article class="summary-panel">
          <div class="sum-row"><span>Payable</span><strong>₹${t.total}</strong></div>
        </article>
      </div>
      <div class="sticky-cta"><button type="button" id="payConfirm" class="primary-cta flat">Pay & Confirm Order</button></div>
    </section>`;
  }

  function renderSuccess() {
    return `<section class="screen px-6 pt-16 pb-8 items-center text-center">
      <div class="logo-mark mb-4 mx-auto" style="width:72px;height:72px;border-radius:22px">${logoSvg(44)}</div>
      <div class="w-16 h-16 rounded-full bg-sage text-white grid place-items-center mb-4 shadow-lift">${icon("check")}</div>
      <h1 class="font-display text-3xl font-semibold text-forest-dark">Order Confirmed!</h1>
      <p class="font-mr mt-2 text-forest-light font-bold text-lg">तुमचं हिरवं, स्मार्ट घर</p>
      <button type="button" data-go="orders" class="mt-8 w-full h-14 rounded-2xl bg-forest-main text-white font-extrabold text-lg">Track Order</button>
      <button type="button" data-go="home" class="mt-3 w-full h-12 font-bold text-ink-mute">Continue Shopping</button>
    </section>`;
  }

  function renderNutri() {
    return `<section class="screen with-nav px-4 pt-4 pb-4">
      <div style="display:flex;justify-content:space-between;gap:8px;align-items:flex-start">
        <div><div class="logo-mark sm mb-2">${logoSvg(22)}</div>
          <h1 class="font-display text-3xl font-semibold text-forest-dark">Nutri-Tracker</h1>
          <p class="text-ink-mute font-semibold">Health dashboard</p></div>${profileBtn()}</div>
      <article class="panel mt-3 p-4">
        <h2 class="font-extrabold text-lg text-forest-dark">🌱 Green Champion Points</h2>
        <p class="text-sm text-ink-mute font-medium">${state.nutri.points.toLocaleString()} points earned</p>
      </article>
      ${navBar("nutri")}
    </section>`;
  }

  function renderOrders() {
    return `<section class="screen with-nav px-4 pt-4 pb-4">
      <div style="display:flex;justify-content:space-between;gap:8px">
        <div><div class="logo-mark sm mb-2">${logoSvg(22)}</div>
          <h1 class="font-display text-3xl font-semibold text-forest-dark">My Orders</h1>
          <p class="text-ink-mute font-semibold">Delivery history</p></div>${profileBtn()}</div>
      <div class="mt-3" style="display:grid;gap:10px">${ORDERS.map((o) => `
        <article class="panel card-pop p-4"><div style="display:flex;justify-content:space-between;gap:8px">
          <div><p class="font-extrabold text-forest-dark">${o.id}</p><p class="text-sm text-ink-mute font-semibold">${o.date} ·${o.items}</p></div>
          <span class="status-tag status-delivered">${o.status}</span></div></article>`).join("")}</div>
      ${navBar("orders")}
    </section>`;
  }

  function renderProfileDrawer() {
    return `<div class="p-4">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">
        <div style="display:flex;align-items:center;gap:8px"><div class="logo-mark sm">${logoSvg(22)}</div>
          <h2 class="font-display text-2xl font-semibold text-forest-dark">Profile</h2></div>
        <button type="button" id="closeProfile" class="icon-back">${icon("close")}</button>
      </div>
      <div class="rounded-2xl bg-forest-main text-white p-4 shadow-lift">
        <p class="font-extrabold text-xl">${state.user.name}</p>
        <p class="text-amber font-extrabold mt-2">Wallet: ₹${state.user.wallet}</p>
      </div>
      <button type="button" id="logout" class="mt-4 w-full h-12 rounded-2xl text-ink-mute font-bold bg-surface-subtle">Log out</button>
    </div>`;
  }

  function ensureMomsFreebies() {
    state.cart = state.cart.filter((c) => !(c.source === "moms" && c.free));
    const vegs = momsVegSelected();
    if (!vegs.length) return;
    const salads = Math.min(vegs.length, 6);
    state.cart.push({
      key: "moms:free-salad", name: `${salads} Free Salads`, source: "moms", free: true,
      weight: 0, price: 0, qty: 1, meta: `Included · 1:1 · ${salads} portions`,
    });
    state.cart.push({
      key: "moms:free-aroma", name: "Free Aromatic Kit", source: "moms", free: true,
      weight: 0, price: 0, qty: 1, meta: "Included · Ginger · Garlic · Coriander · Curry · Chilli · Lemon",
    });
  }

  function syncMomsExtrasToCart() {
    state.cart = state.cart.filter((c) => !(c.source === "moms" && c.extraKind));
    for (const x of MOMS_EXTRAS) {
      const qty = state.momsExtras[x.kind] || 0;
      if (qty <= 0) continue;
      upsertCart({
        key: `moms:extra:${x.kind}`, id: x.id, name: x.name, source: "moms",
        extraKind: x.kind, price: x.price, qty, weight: 0, meta: `Extra · ₹${x.price} each`,
      });
    }
  }

  function syncOdItem(id, patch = {}, { forceAdd = false } = {}) {
    const meta = Object.values(CATALOG).flat().find((x) => x.id === id);
    if (!meta) return;
    const key = `od:${id}`;
    const existing = state.cart.find((c) => c.key === key);
    const draft = { ...draftFor(id), ...(existing || {}), ...patch };
    state.odDraft[id] = { weight: draft.weight || 500, cut: !!draft.cut, washed: !!draft.washed, sprouted: !!draft.sprouted, qty: draft.qty || 1 };
    if (!existing && !forceAdd) { save(); return; }
    let extraCharge = 0;
    if (draft.cut) extraCharge += 5;
    if (draft.washed) extraCharge += 5;
    if (draft.sprouted) extraCharge += 10;
    upsertCart({
      key, id, name: meta.name, source: "ondemand",
      weight: draft.weight || 500, qty: draft.qty || 1,
      cut: !!draft.cut, washed: !!draft.washed, sprouted: !!draft.sprouted,
      price: priceForWeight(meta.pricePerKg, draft.weight || 500),
      extraCharge,
      meta: [formatGrams(draft.weight || 500), draft.cut && "Cut", draft.washed && "Washed", draft.sprouted && "Sprouted"].filter(Boolean).join(" · "),
    });
  }

  function findMomsMeta(id) { return MOMS_VEG.find((x) => x.id === id) || null; }

  function syncFamilyToCart() {
    state.cart = state.cart.filter((c) => c.source !== "family");
    let total = 0;
    for (const s of FAMILY_STAPLES) {
      const kg = state.family.staples[s.id] || 0;
      if (kg <= 0) continue;
      const price = Math.round(kg * s.pricePerKg);
      total += price;
      upsertCart({ key: `family:staple:${s.id}`, name: `${s.name} (${s.healthTag || 'Standard'})`, source: "family", price, weight: kg * 1000, qty: 1, meta: `Staples · Included · ${kg}kg` });
    }
    for (const [id, prefs] of Object.entries(state.family.veggies)) {
      const meta = CATALOG.Veggies.find((v) => v.id === id);
      const extraCharge = (prefs.cut ? 5 : 0) + (prefs.washed ? 5 : 0);
      const price = priceForWeight(meta.pricePerKg, 500);
      total += price + extraCharge;
      upsertCart({
        key: `family:veg:${id}`, name: meta.name, source: "family", price, extraCharge, weight: 500, qty: 1,
        meta: `Sorted veggies${prefs.cut ? " · Cut" : ""}${prefs.washed ? " · Washed" : ""}`,
      });
    }
    for (const [k, on] of Object.entries(state.family.leafy)) {
      if (!on) continue;
      upsertCart({ key: `family:leafy:${k}`, name: k[0].toUpperCase() + k.slice(1), source: "family", price: 30, weight: 250, qty: 1, meta: "Leafy greens · Included" });
      total += 30;
    }
    for (const [k, on] of Object.entries(state.family.sprouts)) {
      if (!on) continue;
      const sprouted = state.family.sproutsMode === "sprouted";
      const extraCharge = sprouted ? 10 : 0;
      upsertCart({
        key: `family:sprout:${k}`, name: `${k[0].toUpperCase() + k.slice(1)} ${sprouted ? "Sprouts" : "Raw"}`,
        source: "family", price: 55, extraCharge, weight: 250, qty: 1, meta: sprouted ? "Sprouted +₹10" : "Raw sprouts",
      });
      total += 55 + extraCharge;
    }
    upsertCart({ key: "family:aroma", name: "Free Aromatic Kit", source: "family", free: true, price: 0, qty: 1, meta: "Included · ₹0" });
    if (state.family.extras.fruit) {
      upsertCart({ key: "family:fruit", name: "Premium Fruit Basket", source: "family", price: 299, qty: 1, meta: "Extra", extraKind: "fruit" });
      total += 299;
    }
    state.family.inCart = true;
    state.delivery.moms = state.delivery.moms || "sun";
    return total;
  }

  function scheduleRender(opts = {}) {
    if (opts.focus) focusKey = opts.focus;
    cancelAnimationFrame(renderTimer);
    renderTimer = requestAnimationFrame(() => render(opts));
  }

  function render(opts = {}) {
    const map = {
      splash: renderSplash, login: renderLogin, otp: renderOtp, location: renderLocation,
      home: renderHome, hubdetail: renderHubDetail, cart: renderCart, checkout: renderCheckout, success: renderSuccess,
      nutri: renderNutri, orders: renderOrders,
    };
    const main = document.getElementById("main");
    screensEl.innerHTML = (map[state.screen] || renderSplash)();
    setTitle();
    if (state.profileOpen) {
      drawerEl.hidden = false; scrimEl.hidden = false; drawerEl.innerHTML = renderProfileDrawer();
      if (main) main.setAttribute("inert", "");
    } else {
      drawerEl.hidden = true; scrimEl.hidden = true; drawerEl.innerHTML = "";
      if (main) main.removeAttribute("inert");
    }
    bind();
    if (focusKey || state.profileOpen) restoreFocus();
    else focusKey = null;
    if (state.cartBounce) setTimeout(() => { state.cartBounce = false; }, 450);
  }

  function bind() {
    screensEl.querySelectorAll("[data-go]").forEach((btn) => {
      btn.addEventListener("click", (e) => { e.stopPropagation(); go(btn.dataset.go); });
    });
    drawerEl.querySelectorAll("[data-go]").forEach((btn) => btn.addEventListener("click", () => go(btn.dataset.go)));
    
    // Welcome Hub Cards click -> opens dedicated Hub Detail page instead of same page
    screensEl.querySelectorAll("[data-open-hub]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.homeTab = btn.dataset.openHub;
        go("hubdetail");
      });
    });

    screensEl.querySelectorAll("[data-go-hub]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.homeTab = btn.dataset.goHub;
        go("hubdetail");
      });
    });

    const openProfile = () => { state.profileOpen = true; scheduleRender(); };
    const closeProfile = () => { state.profileOpen = false; scheduleRender(); };
    $("#openProfile")?.addEventListener("click", openProfile);
    drawerEl.querySelector("#closeProfile")?.addEventListener("click", closeProfile);
    scrimEl.onclick = closeProfile;

    const phoneInput = $("#phoneInput");
    if (phoneInput) {
      phoneInput.addEventListener("input", () => { phoneInput.value = phoneInput.value.replace(/\D/g, "").slice(0, 10); });
    }
    $("#sendOtp")?.addEventListener("click", async () => {
      state.phone = ($("#phoneInput")?.value || "").replace(/\D/g, "").slice(0, 10);
      if (state.phone.length < 10) return toast("Enter valid 10-digit mobile number");
      state.user.phone = state.phone; await showLoader(300); toast("OTP sent · 1234"); go("otp");
    });
    $("#flagBtn")?.addEventListener("click", () => { state.flagsOpen = !state.flagsOpen; render(); });
    screensEl.querySelectorAll("[data-flag]").forEach((btn) => btn.addEventListener("click", () => { state.country = btn.dataset.flag; state.flagsOpen = false; render(); }));

    const submitOtp = async () => {
      const code = [...screensEl.querySelectorAll("[data-otp]")].map((i) => i.value).join("");
      if (code.length < 4) return toast("Enter 4-digit OTP");
      await showLoader(250); toast("Verified"); go("location");
    };
    screensEl.querySelectorAll("[data-otp]").forEach((input, idx, list) => {
      input.addEventListener("input", () => {
        input.value = input.value.replace(/\D/g, "").slice(0, 1);
        if (input.value && list[idx + 1]) list[idx + 1].focus();
        if ([...list].every((i) => i.value)) submitOtp();
      });
    });
    $("#verifyOtp")?.addEventListener("click", submitOtp);
    $("#grantLoc")?.addEventListener("click", async () => { state.locationGranted = true; await showLoader(200); go("home"); });
    $("#skipLoc")?.addEventListener("click", () => { state.locationGranted = true; go("home"); });

    screensEl.querySelectorAll("[data-od-cat]").forEach((btn) => btn.addEventListener("click", () => { state.odCategory = btn.dataset.odCat; scheduleRender({ keepScroll: true }); }));
    screensEl.querySelectorAll("[data-od-weight]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.odWeight; const g = Number(btn.dataset.g);
        if (state.cart.find((c) => c.key === `od:${id}`)) syncOdItem(id, { weight: g }, { forceAdd: true });
        else { const d = draftFor(id); state.odDraft[id] = { ...d, weight: g }; }
        render();
      });
    });
    screensEl.querySelectorAll("[data-od-attr]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.odAttr; const attr = btn.dataset.attr;
        const base = state.cart.find((c) => c.key === `od:${id}`) || draftFor(id);
        const next = { ...base, [attr]: !base[attr] };
        if (state.cart.find((c) => c.key === `od:${id}`)) syncOdItem(id, next, { forceAdd: true });
        else state.odDraft[id] = { weight: next.weight || 500, cut: !!next.cut, washed: !!next.washed, sprouted: !!next.sprouted, qty: next.qty || 1 };
        render();
      });
    });
    screensEl.querySelectorAll("[data-od-add]").forEach((btn) => {
      btn.addEventListener("click", () => {
        syncOdItem(btn.dataset.odAdd, draftFor(btn.dataset.odAdd), { forceAdd: true });
        toast("Added to cart"); scheduleRender({ keepScroll: true });
      });
    });
    screensEl.querySelectorAll("[data-od-update]").forEach((btn) => {
      btn.addEventListener("click", () => { toast("Cart updated"); scheduleRender({ keepScroll: true }); });
    });
    screensEl.querySelectorAll("[data-od-remove]").forEach((btn) => {
      btn.addEventListener("click", () => { removeCart(`od:${btn.dataset.odRemove}`); toast("Removed"); scheduleRender({ keepScroll: true }); });
    });
    screensEl.querySelectorAll("[data-od-qty]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.odQty;
        const row = state.cart.find((c) => c.key === `od:${id}`);
        if (!row) return;
        const qty = Math.max(1, (row.qty || 1) + Number(btn.dataset.d));
        syncOdItem(id, { qty }, { forceAdd: true });
        scheduleRender({ keepScroll: true });
      });
    });

    // Mom's Kitchen Kits Count & Customizer bindings
    screensEl.querySelectorAll("[data-kits-delta]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.kitsCount = Math.min(6, Math.max(1, state.kitsCount + Number(btn.dataset.kitsDelta)));
        for (const row of state.cart) {
          if (row.source === "moms" && !row.free && !row.extraKind) {
            row.weight = state.kitsCount * GRAMS_PER_KIT;
            row.meta = `Included · ${formatGrams(row.weight)}`;
          }
        }
        ensureMomsFreebies(); save(); render();
      });
    });

    screensEl.querySelectorAll("[data-kit-mode]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.kitMode = btn.dataset.kitMode;
        save(); render();
      });
    });

    screensEl.querySelectorAll("[data-kit-name-id]").forEach((input) => {
      input.addEventListener("input", (e) => {
        const kNum = e.target.getAttribute("data-kit-name-id");
        state.customKitNames[kNum] = e.target.value;
        save();
      });
    });

    screensEl.querySelectorAll("[data-moms-toggle]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.momsToggle; const key = `moms:${id}`; const meta = MOMS_VEG.find(v => v.id === id);
        if (state.cart.find((c) => c.key === key)) removeCart(key);
        else {
          if (momsVegSelected().length >= 6) return toast("You already have 6 veggie kits");
          upsertCart({
            key, id, name: meta.name, source: "moms", price: meta.price,
            weight: state.kitsCount * GRAMS_PER_KIT, qty: 1, meta: `Included · ${formatGrams(state.kitsCount * GRAMS_PER_KIT)}`,
          });
        }
        ensureMomsFreebies(); syncMomsExtrasToCart(); render();
      });
    });
    screensEl.querySelectorAll("[data-moms-extra-d]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const kind = btn.dataset.momsExtraD;
        state.momsExtras[kind] = Math.max(0, (state.momsExtras[kind] || 0) + Number(btn.dataset.d));
        syncMomsExtrasToCart(); save(); render();
      });
    });
    $("#reviewMomsKit")?.addEventListener("click", () => {
      ensureMomsFreebies(); syncMomsExtrasToCart();
      if (!momsVegSelected().length) return toast("Choose at least 1 veggie kit");
      toast("Kit ready · review in cart"); go("cart");
    });

    $("#toggleProp")?.addEventListener("click", () => { state.showPropEditor = !state.showPropEditor; render(); });
    screensEl.querySelectorAll("[data-staple]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.staple;
        state.family.staples[id] = Math.max(0.5, Math.round((state.family.staples[id] + Number(btn.dataset.d)) * 10) / 10);
        render();
      });
    });
    screensEl.querySelectorAll("[data-fam-veg]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.famVeg;
        if (state.family.veggies[id]) delete state.family.veggies[id];
        else {
          if (Object.keys(state.family.veggies).length >= 6) return toast("Max 6 sorted veggies");
          state.family.veggies[id] = { cut: false, washed: false };
        }
        render();
      });
    });
    screensEl.querySelectorAll("[data-fam-attr]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.famAttr;
        if (!state.family.veggies[id]) return;
        state.family.veggies[id][btn.dataset.attr] = !state.family.veggies[id][btn.dataset.attr];
        render();
      });
    });
    screensEl.querySelectorAll("[data-leafy]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const k = btn.dataset.leafy;
        const on = !!state.family.leafy[k];
        if (!on && Object.values(state.family.leafy).filter(Boolean).length >= 3) return toast("Max 3 leafy greens");
        state.family.leafy[k] = !on; render();
      });
    });
    screensEl.querySelectorAll("[data-sprout-mode]").forEach((btn) => btn.addEventListener("click", () => { state.family.sproutsMode = btn.dataset.sproutMode; render(); }));
    screensEl.querySelectorAll("[data-fam-sprout]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const k = btn.dataset.famSprout;
        const on = !!state.family.sprouts[k];
        if (!on && Object.values(state.family.sprouts).filter(Boolean).length >= 2) return toast("Choose up to 2 packs");
        state.family.sprouts[k] = !on; render();
      });
    });
    $("#toggleFruit")?.addEventListener("click", () => { state.family.extras.fruit = !state.family.extras.fruit; render(); });
    $("#addFamilyBasket")?.addEventListener("click", () => {
      const total = syncFamilyToCart();
      toast(`Weekly basket added · ₹${Math.round(total)}`);
      go("cart");
    });
    screensEl.querySelectorAll("[data-reco]").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (btn.dataset.reco === "add-fruit") { state.family.extras.fruit = true; toast("Fruit basket added"); render(); }
      });
    });

    screensEl.querySelectorAll("[data-remove]").forEach((btn) => {
      btn.addEventListener("click", () => { removeCart(btn.dataset.remove); ensureMomsFreebies(); render(); });
    });
    screensEl.querySelectorAll("[data-later]").forEach((btn) => {
      btn.addEventListener("click", () => { moveToLater(btn.dataset.later); toast("Saved for later"); render(); });
    });
    screensEl.querySelectorAll("[data-cart-weight]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const row = state.cart.find((c) => c.key === btn.dataset.cartWeight);
        if (!row || row.source !== "ondemand") return;
        syncOdItem(row.id, { weight: Number(btn.dataset.g) }, { forceAdd: true });
        render();
      });
    });
    screensEl.querySelectorAll("[data-cart-qty]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const row = state.cart.find((c) => c.key === btn.dataset.cartQty);
        if (!row) return;
        const qty = (row.qty || 1) + Number(btn.dataset.d);
        if (qty <= 0) { removeCart(row.key); ensureMomsFreebies(); }
        else if (row.source === "ondemand") syncOdItem(row.id, { qty }, { forceAdd: true });
        else { row.qty = qty; if (row.extraKind) state.momsExtras[row.extraKind] = qty; upsertCart(row); }
        render();
      });
    });
    screensEl.querySelectorAll("[data-del-sec]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const sec = btn.dataset.delSec; const val = btn.dataset.del;
        if (sec === "ondemand" && val === "scheduled") state.delivery.ondemand = "sun";
        else state.delivery[sec] = val;
        save(); render();
      });
    });
    $("#toCheckout")?.addEventListener("click", () => {
      const t = cartTotals();
      if (!t.movMet) return toast(`Add ₹${t.movShort} more for On-Demand`);
      go("checkout");
    });
    screensEl.querySelectorAll("[data-pay]").forEach((btn) => btn.addEventListener("click", () => { state.payment = btn.dataset.pay; render(); }));
    const topUp = () => { state.user.wallet += 200; toast("Wallet topped up +₹200"); render(); };
    $("#topUp")?.addEventListener("click", topUp);
    $("#payConfirm")?.addEventListener("click", async () => {
      const t = cartTotals();
      if (!t.movMet) return toast("On-Demand MOV not met");
      if (state.payment === "wallet" && state.user.wallet < t.total) return toast("Insufficient wallet");
      if (state.payment === "wallet") state.user.wallet -= t.total;
      await showLoader(400); toast("Payment successful");
      state.cart = []; state.momsExtras = { salad: 0, veggie: 0, fruit: 0 }; state.family.inCart = false;
      save(); go("success");
    });
    drawerEl.querySelector("#logout")?.addEventListener("click", () => {
      state.locationGranted = false; state.profileOpen = false; go("splash");
    });
  }

  load();
  if (!applyHash()) {
    if (state.locationGranted && state.phone) state.screen = "home";
  }
  syncHash(true);
  scheduleRender();

  window.addEventListener("hashchange", () => {
    if (ignoreHash) return;
    if (applyHash()) scheduleRender();
  });
})();
