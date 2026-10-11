(() => {
  "use strict";

  const MOV = 200;
  const STORAGE = "smart-green-v5";
  const GRAMS_PER_KID = 250;
  const MODES = ["ondemand", "moms", "family"];
  const MODE_META = {
    ondemand: { label: "On-Demand", desc: "Pick exactly what you need" },
    moms: { label: "Mom’s Kitchen", desc: "Kids’ weekly veggie & tiffin kits" },
    family: { label: "Family Kitchen", desc: "Complete weekly family basket" },
  };
  const img = (id, w = 600) =>
    `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

  const CATALOG = {
    Staples: [
      { id: "rice", name: "Sona Masoori Rice", blurb: "Premium rice", pricePerKg: 170, unit: "kg", hue: "#f0e6c8", accent: "#b89b54", photo: img("photo-1586201375761-83865001e31c"), nutri: "Carbs & Energy · Low glycemic index" },
      { id: "atta", name: "Whole Wheat Atta", blurb: "Stone-ground", pricePerKg: 54, unit: "kg", hue: "#e8d4a8", accent: "#8d6e3a", photo: img("photo-1574323347407-f5e1ad6d020b"), nutri: "High Dietary Fiber · Good for Digestion" },
      { id: "dal", name: "Toor Dal", blurb: "Protein staple", pricePerKg: 140, unit: "kg", hue: "#f3d27a", accent: "#b8860b", photo: img("photo-1516684732162-798a0062be99"), nutri: "Plant Protein & Iron · Heart Healthy" },
      { id: "oil", name: "Cold-Pressed Oil", blurb: "Kitchen essential", pricePerKg: 220, unit: "L", hue: "#f7e38a", accent: "#c9a227", photo: img("photo-1474979266404-7eaacbcd87c5"), nutri: "Healthy Fats · Zero Trans Fat" },
    ],
    Veggies: [
      { id: "lady-finger", name: "Lady Finger", blurb: "Farm fresh", pricePerKg: 60, hue: "#9aaa5a", accent: "#6b7a32", photo: "https://images.pexels.com/photos/1656666/pexels-photo-1656666.jpeg?auto=compress&cs=tinysrgb&w=600", nutri: "Rich in Folate & Vitamin C · Diabetes Friendly", bpSafe: true },
      { id: "potato", name: "Potato", blurb: "Everyday staple", pricePerKg: 36, hue: "#d4a35a", accent: "#8a6230", photo: img("photo-1518977676601-b53f82aba655"), nutri: "Potassium & Energy · ⚠️ Moderate starch (Caution for strict diabetes)", diabetesWarn: true },
      { id: "tomato", name: "Tomato", blurb: "Vine ripened", pricePerKg: 48, hue: "#d4543a", accent: "#9a2f1c", photo: img("photo-1592924357228-91a4daadcfea"), nutri: "Lycopene & Antioxidants · Great for Skin & Heart", bpSafe: true },
      { id: "carrot", name: "Carrot", blurb: "Sweet & crisp", pricePerKg: 52, hue: "#e07a2f", accent: "#a04a12", photo: img("photo-1598170845058-32b9d6a5da37"), nutri: "Beta-Carotene & Vitamin A · Supports Vision", bpSafe: true },
      { id: "beans", name: "French Beans", blurb: "Tender pods", pricePerKg: 70, hue: "#8a9e4a", accent: "#5a6b28", photo: img("photo-1567375698348-5d9d1edb2e83"), nutri: "Dietary Fiber & Plant Iron · Blood Sugar Regulation", bpSafe: true },
      { id: "capsicum", name: "Capsicum", blurb: "Crunchy & mild", pricePerKg: 80, hue: "#c9a227", accent: "#8a6a12", photo: img("photo-1563565375-f3fdfdbefa83"), nutri: "Vitamin C & Metabolism Boost", bpSafe: true },
    ],
    Fruits: [
      { id: "banana", name: "Banana", blurb: "Energy fruit", pricePerKg: 55, hue: "#ffe082", accent: "#f9a825", photo: img("photo-1571771894821-ce9b6c11b08e"), nutri: "Potassium & Instant Energy" },
      { id: "apple", name: "Apple", blurb: "Crisp & juicy", pricePerKg: 180, hue: "#e57373", accent: "#c62828", photo: img("photo-1567306226416-28f0efdc88ce"), nutri: "Pectin Fiber & Low GI · Heart Friendly" },
      { id: "papaya", name: "Papaya", blurb: "Vitamin rich", pricePerKg: 45, hue: "#ffb74d", accent: "#ef6c00", photo: img("photo-1517282009859-f000ec3b26fe"), nutri: "Papain Enzyme · Excellent for Digestion" },
      { id: "orange", name: "Orange", blurb: "Fresh citrus", pricePerKg: 90, hue: "#ffa726", accent: "#ef6c00", photo: img("photo-1557800636-894a64c1696f"), nutri: "High Vitamin C & Immunity Support" },
    ],
    Sprouts: [
      { id: "moong", name: "Moong Sprouts", blurb: "Protein pack", pricePerKg: 120, hue: "#c4b454", accent: "#8a7a28", sproutable: true, photo: img("photo-1540420773420-3366772f4999"), nutri: "High Protein & Live Enzymes · Muscle Repair" },
      { id: "chana", name: "Chana Sprouts", blurb: "Hearty sprouts", pricePerKg: 110, hue: "#c4a35a", accent: "#7a5a28", sproutable: true, photo: img("photo-1615485290382-441e4d049cb5"), nutri: "Iron & Sustained Energy · Low GI" },
      { id: "mixed", name: "Mixed Sprouts", blurb: "Variety pack", pricePerKg: 130, hue: "#b8a45a", accent: "#7a6528", sproutable: true, photo: img("photo-1512621776951-a57141f2eefd"), nutri: "Complete Amino Acid Profile & Fiber" },
      { id: "methi", name: "Methi Sprouts", blurb: "Iron boost", pricePerKg: 125, hue: "#a8b45a", accent: "#6a7528", sproutable: true, photo: img("photo-1508747703725-719777637510"), nutri: "Blood Sugar Control & Iron Rich · Anti-Diabetic" },
    ],
    Aromatics: [
      { id: "coriander", name: "Coriander", blurb: "Fresh bunch", pricePerKg: 40, hue: "#a8b86a", accent: "#6a7a32", photo: img("photo-1459411621453-7b03977f4bfc"), nutri: "Detoxifying & Antioxidant Rich" },
      { id: "mint", name: "Mint Bunch", blurb: "Cool & aromatic", pricePerKg: 50, hue: "#b0c070", accent: "#708030", photo: img("photo-1622206151226-18ca2c9ab4a1"), nutri: "Soothing Digestion & Refreshing" },
      { id: "ginger", name: "Ginger", blurb: "Kitchen essential", pricePerKg: 160, hue: "#d7ccc8", accent: "#8d6e63", photo: img("photo-1599940824399-b87987ceb72a"), nutri: "Anti-inflammatory & Immunity Support" },
      { id: "lemon", name: "Lemon", blurb: "Zesty finish", pricePerKg: 90, hue: "#e8d86a", accent: "#b8a020", photo: img("photo-1590502593747-42a996133562"), nutri: "Vitamin C & Alkalizing Body Balance" },
    ],
  };

  const MOMS_VEG = [
    { id: "tf-lady", name: "Lady Finger Kit", price: 45, hue: "#9aaa5a", accent: "#6b7a32", photo: "https://images.pexels.com/photos/1656666/pexels-photo-1656666.jpeg?auto=compress&cs=tinysrgb&w=600", nutri: "Folate & Vitamin C for Brain Development" },
    { id: "tf-spin", name: "Spinach Kit", price: 35, hue: "#8a9e5a", accent: "#556b2f", photo: img("photo-1576045057995-568f588f82fb"), nutri: "Iron & Calcium for Bone & Blood Strength" },
    { id: "tf-pot", name: "Potato Kit", price: 30, hue: "#d4a35a", accent: "#8a6230", photo: img("photo-1518977676601-b53f82aba655"), nutri: "Energy-dense Carbs for Active Kids" },
    { id: "tf-tom", name: "Tomato Kit", price: 40, hue: "#d4543a", accent: "#9a2f1c", photo: img("photo-1592924357228-91a4daadcfea"), nutri: "Vitamin C & Antioxidants for Immunity" },
    { id: "tf-carrot", name: "Carrot Kit", price: 38, hue: "#e07a2f", accent: "#a04a12", photo: img("photo-1598170845058-32b9d6a5da37"), nutri: "Vitamin A for Sharp Vision & Growth" },
    { id: "tf-beans", name: "Beans Kit", price: 42, hue: "#8a9e4a", accent: "#5a6b28", photo: img("photo-1622206151226-18ca2c9ab4a1"), nutri: "Dietary Fiber & Plant Protein for Muscles" },
  ];
  const MOMS_EXTRAS = [
    { id: "extra-salad", name: "Extra Salad", price: 40, kind: "salad" },
    { id: "extra-veg", name: "Extra Veggie Kit", price: 60, kind: "veggie" },
    { id: "extra-fruit", name: "Premium Fruit Basket", price: 199, kind: "fruit" },
  ];
  const FAMILY_STAPLES = [
    { id: "onion", name: "Onion", pricePerKg: 40, photo: img("photo-1518977956812-cd3dbadaafcd"), hue: "#e8d4c8", accent: "#8d6e63", nutri: "Quercetin & Blood Circulation Support" },
    { id: "potato", name: "Potato", pricePerKg: 36, photo: img("photo-1518977676601-b53f82aba655"), hue: "#d4a35a", accent: "#8a6230", nutri: "Potassium & Energy Staple" },
    { id: "tomato", name: "Tomato", pricePerKg: 48, photo: img("photo-1592924357228-91a4daadcfea"), hue: "#d4543a", accent: "#9a2f1c", nutri: "Heart-Healthy Lycopene" },
  ];
  const ORDERS = [
    { id: "SG-2401", date: "Fri, 3 Oct", total: 486, status: "In-Transit", items: "Weekly Basket · 12 items" },
    { id: "SG-2390", date: "Tue, 30 Sep", total: 320, status: "Delivered", items: "Mom’s Kitchen · 2 kids" },
    { id: "SG-2378", date: "Sun, 28 Sep", total: 210, status: "Delivered", items: "On-Demand · Veggies" },
    { id: "SG-2361", date: "Fri, 26 Sep", total: 540, status: "Scheduled", items: "Family Kitchen · Sun slot" },
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
    kids: 2,
    childMode: "double", // 'double' or 'separate'
    childNames: { 1: "Kit 1", 2: "Kit 2", 3: "Kit 3", 4: "Kit 4" },
    childSeparateVeggies: { 1: {}, 2: {} },
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
    _lastDelivery: null,
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
    hub: "Choose Journey · Smart Green",
    home: "Home · Smart Green",
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
        cart: state.cart, savedLater: state.savedLater, kids: state.kids, childMode: state.childMode, childNames: state.childNames, childSeparateVeggies: state.childSeparateVeggies, family: state.family,
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
      const raw = localStorage.getItem(STORAGE);
      if (!raw) return;
      const d = JSON.parse(raw);
      if (d.phone) state.phone = d.phone;
      if (d.user) Object.assign(state.user, d.user);
      if (d.locationGranted) state.locationGranted = d.locationGranted;
      if (Array.isArray(d.cart)) state.cart = d.cart;
      if (Array.isArray(d.savedLater)) state.savedLater = d.savedLater;
      if (d.kids) state.kids = d.kids;
      if (d.childMode) state.childMode = d.childMode;
      if (d.childNames) Object.assign(state.childNames, d.childNames);
      if (d.childSeparateVeggies) Object.assign(state.childSeparateVeggies, d.childSeparateVeggies);
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
    const mode = state.screen === "home" ? MODE_META[state.homeTab]?.label : "";
    document.title = mode && state.screen === "home"
      ? `${mode} · Smart Green`
      : (TITLES[state.screen] || TITLES.splash);
  }

  function syncHash(replace = false) {
    let hash = `#/${state.screen}`;
    if (state.screen === "home") hash += `/${state.homeTab}`;
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
    if (["hub", "home", "cart", "checkout", "nutri", "orders", "success"].includes(screen) && !(state.locationGranted && state.phone)) {
      state.screen = state.phone ? "location" : "login";
      return true;
    }
    state.screen = screen;
    if (screen === "home" && MODES.includes(tab)) state.homeTab = tab;
    return true;
  }

  function restoreFocus() {
    if (focusKey) {
      const hit = screensEl.querySelector(`[data-focus="${focusKey}"], #${CSS.escape(focusKey)}`);
      if (hit) { hit.focus({ preventScroll: true }); focusKey = null; return; }
    }
    const h = screensEl.querySelector("h1, h2");
    if (h) { if (!h.hasAttribute("tabindex")) h.setAttribute("tabindex", "-1"); h.focus({ preventScroll: true }); }
  }

  function formatGrams(g) { return g >= 1000 ? `${(g / 1000).toFixed(g % 1000 === 0 ? 0 : 1)}kg` : `${g}g`; }
  function priceForWeight(pricePerKg, grams) { return Math.round(pricePerKg * (grams / 1000)); }

  function logoSvg(size = 48) {
    return `<svg width="${size}" height="${size}" viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <rect x="8" y="30" width="40" height="22" rx="6" fill="#C4785A"/>
      <rect x="12" y="34" width="32" height="14" rx="3" fill="#F8EBD3"/>
      <circle cx="18" cy="54" r="4" fill="#212529"/>
      <circle cx="38" cy="54" r="4" fill="#212529"/>
      <rect x="28" y="14" width="18" height="26" rx="4" fill="#212529"/>
      <rect x="31" y="18" width="12" height="16" rx="2" fill="#F5C6AA"/>
      <path d="M46 18c6 4 10 8 10 14a8 8 0 1 1-16 0c0-4 2-7 4-10 2 3 3 4 5 4 0-4 .5-6.5 0-8z" fill="#E8B86D"/>
      <path d="M52 16c3 2 5 4 5 7a4 4 0 1 1-8 0c0-2 1-3.5 2-5" fill="#C9953A"/>
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
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 340"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#FFF6E8"/><stop offset="1" stop-color="${item.hue || "#F5C6AA"}"/></linearGradient></defs><rect width="400" height="340" fill="url(#g)"/><circle cx="200" cy="170" r="88" fill="${item.accent || "#C4785A"}" opacity=".85"/><text x="200" y="300" text-anchor="middle" font-family="sans-serif" font-size="28" fill="#212529" font-weight="700">${label}</text></svg>`
    )}`;
    return `<img class="produce-img" alt="${label}" width="400" height="340" src="${item.photo || fallback}" onerror="this.onerror=null;this.src='${fallback}'" />`;
  }

  function cartCount() { return state.cart.reduce((n, i) => n + (i.qty || 1), 0); }
  function itemsBySource(src) { return state.cart.filter((c) => c.source === src); }
  function lineTotal(item) { return item.free ? 0 : ((item.price || 0) + (item.extraCharge || 0)) * (item.qty || 1); }
  function sectionTotal(src) { return itemsBySource(src).reduce((n, i) => n + lineTotal(i), 0); }
  
  function momsVegSelected(kitId = 1) {
    if (state.childMode === "double") {
      return itemsBySource("moms").filter((c) => !c.free && !c.extraKind && MOMS_VEG.some((v) => v.id === c.id));
    }
    const map = state.childSeparateVeggies[kitId] || {};
    return Object.keys(map).map((id) => MOMS_VEG.find((v) => v.id === id)).filter(Boolean);
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
    if (state.childMode === "double") {
      const vegN = momsVegSelected(1).length;
      if (vegN > 0 || itemsBySource("moms").length) {
        lines.push(vegN >= 6 ? { ok: true, text: "Mom’s Kitchen kit complete" } : { ok: false, text: `Mom’s Kitchen: choose ${6 - vegN} more veggie kit${6 - vegN === 1 ? "" : "s"}` });
      }
    } else {
      for (let k = 1; k <= state.kids; k++) {
        const kitName = state.childNames[k] || `Kit ${k}`;
        const n = momsVegSelected(k).length;
        if (n < 6) lines.push({ ok: false, text: `${kitName}: choose ${6 - n} more veggie kits` });
        else lines.push({ ok: true, text: `${kitName} complete` });
      }
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

  async function go(screen, opts = {}) {
    state.screen = screen;
    state.profileOpen = false;
    save();
    syncHash(!!opts.replaceHash);
    if (["hub", "home", "cart", "checkout"].includes(screen) && !opts.silent) await showLoader(120);
    scheduleRender({ keepScroll: !!opts.keepScroll, focus: opts.focus });
    if (!opts.keepScroll) window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function navBar(active) {
    const tabs = [["hub", "Hub", "home"], ["nutri", "Nutri-Tracker", "nutri"], ["orders", "My Orders", "orders"]];
    return `<nav class="bottom-nav" aria-label="Primary">${tabs.map(([id, label, ic]) => `
      <button type="button" class="nav-item ${active === id ? "active" : ""}" data-go="${id}">${icon(ic)}<span>${label}</span></button>`).join("")}</nav>`;
  }
  function profileBtn() {
    return `<button type="button" id="openProfile" class="avatar-btn" aria-label="Open profile">${state.user.avatar}</button>`;
  }
  function brandRow(withProfile = true) {
    return `<div class="brand-row">
      <div class="brand-left">
        <div class="logo-mark sm shrink-0">${logoSvg(26)}</div>
        <div class="min-w-0"><h1 class="brand-title">Smart Green</h1><p class="font-mr brand-tag">तुमचं हिरवं, स्मार्ट घर</p></div>
      </div>
      ${withProfile ? profileBtn() : ""}
    </div>`;
  }

  function stickyCartBar() {
    if (!cartCount() || state.screen !== "home") return "";
    const t = cartTotals();
    return `<div class="sticky-cart ${state.cartBounce ? "pop" : ""}"><button type="button" data-go="cart" class="sticky-cart-btn">
      <span class="sticky-cart-left"><span class="sticky-cart-icon">${icon("cart")}<em>${cartCount()}</em></span>
      <span><strong>${cartCount()} items · ₹${t.subtotal + t.odDelivery}</strong><small>View your basket</small></span></span>
      <span class="sticky-cart-cta">View Cart</span></button></div>`;
  }

  function recommendations(mode) {
    const t = cartTotals();
    const cards = [];
    if (mode === "moms") {
      cards.push({ title: "Multi-Child Kit Setup", body: `Currently configured for ${state.kids} kids (${state.childMode === "separate" ? "Separate customized kits" : "Double exact kits"}).` });
      cards.push({ title: "Free Salads & Aromatics", body: "Includes 1:1 free salads and aromatic seasoning kit for every child kit." });
    }
    if (!cards.length) return "";
    return `<div class="reco-stack">${cards.map((c) => `<aside class="reco-card"><div><p class="reco-kicker">Recommended</p><p class="reco-title">${c.title}</p><p class="reco-body">${c.body}</p></div></aside>`).join("")}</div>`;
  }

  function renderSplash() {
    return `<section class="screen px-6 pt-14 pb-8 justify-between onboarding-screen">
      <div class="flex-1 flex flex-col items-center justify-center text-center hero-float">
        <div class="logo-mark logo-pulse mb-5" style="width:92px;height:92px;border-radius:28px">${logoSvg(58)}</div>
        <h1 class="font-display text-4xl font-semibold tracking-tight">Smart Green</h1>
        <p class="font-mr mt-2 text-lg font-bold text-terra-deep">तुमचं हिरवं, स्मार्ट घर</p>
        <p class="mt-2 text-sm font-bold text-ink-mute">Pack to Pan, As Healthy as You Can</p>
      </div>
      <button type="button" data-go="login" class="w-full h-14 rounded-2xl bg-terra text-white font-extrabold text-lg shadow-lift">Get Started</button>
    </section>`;
  }

  function renderLogin() {
    return `<section class="screen px-5 pt-8 pb-8 onboarding-screen">
      <div class="mb-5">${brandRow(false)}</div>
      <h2 class="font-display text-2xl font-semibold">Welcome back</h2>
      <p class="mt-1 text-ink-mute font-semibold text-[15px]">Login with your mobile number</p>
      <div class="mt-6"><div class="phone-field is-focused">
        <div class="float-wrap"><input id="phoneInput" type="tel" maxlength="10" placeholder=" " value="${state.phone}" /><label for="phoneInput">Mobile number</label></div>
      </div></div>
      <button type="button" id="sendOtp" class="mt-5 w-full h-14 rounded-2xl bg-peach text-ink font-extrabold text-lg shadow-lift">Send OTP</button>
    </section>`;
  }

  function renderOtp() {
    return `<section class="screen px-5 pt-8 pb-8">
      <button type="button" data-go="login" class="text-ink-mute mb-4">${icon("back")}</button>
      <h1 class="font-display text-3xl font-semibold">Enter OTP</h1>
      <p class="mt-2 text-ink-mute font-semibold text-lg">Code sent to <span class="text-ink font-bold">+91 ${state.phone}</span></p>
      <div class="mt-8 flex gap-3 justify-between">
        ${[0,1,2,3].map((i) => `<input data-otp="${i}" maxlength="1" inputmode="numeric" class="w-16 h-16 rounded-2xl bg-white border border-black/10 text-center text-2xl font-extrabold" />`).join("")}
      </div>
      <button type="button" id="verifyOtp" class="mt-8 w-full h-14 rounded-2xl bg-terra text-white font-extrabold text-lg shadow-lift">Verify & Continue</button>
    </section>`;
  }

  function renderLocation() {
    return `<section class="screen px-5 pt-10 pb-8 justify-between">
      <div>
        <div class="logo-mark sm mb-4">${logoSvg(26)}</div>
        <h1 class="font-display text-[1.85rem] font-semibold">Allow location access</h1>
        <p class="mt-3 text-[16px] text-ink-mute font-semibold">We use your location for the nearest dark-store and accurate delivery slots.</p>
      </div>
      <button type="button" id="grantLoc" class="w-full h-14 rounded-2xl bg-terra text-white font-extrabold text-lg">Allow Location</button>
    </section>`;
  }

  function renderHub() {
    return `<section class="screen with-nav px-5 pt-6 pb-12">
      ${brandRow(true)}
      <div class="mt-4 mb-5">
        <h1 class="font-display text-2xl font-semibold">What would you like to plan?</h1>
      </div>
      <div class="space-y-4">
        <button type="button" data-hub-mode="ondemand" class="w-full text-left p-4 rounded-2xl bg-white border border-black/10 shadow-card">
          <span class="text-xs font-extrabold uppercase tracking-wider text-amber-deep">⚡ Express Shopping</span>
          <h2 class="font-display text-xl font-semibold mt-1">On-Demand Grocery</h2>
          <p class="mt-1 text-sm font-semibold text-ink-mute">Pick exact fresh veggies, fruits & staples. ₹200 Min Order.</p>
        </button>
        <button type="button" data-hub-mode="moms" class="w-full text-left p-4 rounded-2xl bg-white border border-black/10 shadow-card">
          <span class="text-xs font-extrabold uppercase tracking-wider text-amber-deep">👧 Kids Special & Tiffins</span>
          <h2 class="font-display text-xl font-semibold mt-1">Mom’s Kitchen</h2>
          <p class="mt-1 text-sm font-semibold text-ink-mute">Multi-child weekly veggie kits with separate customizer & free salads.</p>
        </button>
        <button type="button" data-hub-mode="family" class="w-full text-left p-4 rounded-2xl bg-white border border-black/10 shadow-card">
          <span class="text-xs font-extrabold uppercase tracking-wider text-amber-deep">🩺 Health-Smart Family Basket</span>
          <h2 class="font-display text-xl font-semibold mt-1">Family Kitchen</h2>
          <p class="mt-1 text-sm font-semibold text-ink-mute">Complete weekly basket with Diabetes/BP health tags.</p>
        </button>
      </div>
      ${navBar("hub")}
    </section>`;
  }

  function journeySwitcher() {
    return `<div class="journey-wrap"><div class="flex items-center justify-between px-1 mb-2">
      <button type="button" data-go="hub" class="text-xs font-extrabold text-terra">← Back to Hub</button>
      <span class="text-xs font-bold text-ink-mute">${MODE_META[state.homeTab].label}</span></div></div>`;
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
    const draft = inCart ? { weight: inCart.weight, cut: !!inCart.cut, washed: !!inCart.washed, sprouted: !!inCart.sprouted, qty: inCart.qty || 1 } : draftFor(item.id);
    const price = odUnitPrice(item, draft);
    return `<article class="prod-card ${inCart ? "is-added" : ""}">
      <div class="produce-art">${producePhoto(item)}</div>
      <div class="prod-body">
        <h3 class="prod-name">${item.name}</h3>
        <p class="prod-blurb">${item.blurb || ""}</p>
        ${item.nutri ? `<p class="text-[11px] font-bold text-sage" style="color:var(--sage)">🌿 ${item.nutri}</p>` : ""}
        <div class="variant-row">${[250,500,1000].map((g) => `<button type="button" class="qty-chip ${draft.weight === g ? "active" : ""}" data-od-weight="${item.id}" data-g="${g}">${formatGrams(g)}</button>`).join("")}</div>
        <div class="price-row"><strong class="prod-price">₹${price}</strong></div>
        <button type="button" class="${inCart ? "btn-update" : "btn-add"}" data-od-add="${item.id}"> ${inCart ? "Update Qty" : "Add to Cart"} </button>
      </div>
    </article>`;
  }

  function renderOnDemandPane() {
    const cats = Object.keys(CATALOG);
    const items = CATALOG[state.odCategory];
    const t = cartTotals();
    return `<div class="mode-pane" data-pane="ondemand">
      <div class="mov-panel ${t.onDemand >= MOV ? "met" : ""}">
        <div class="mov-head"><span>ON-DEMAND CART</span><strong>₹${t.onDemand} / ₹${MOV}</strong></div>
        <div class="mov-track"><div class="mov-fill" style="width:${t.movPct}%"></div></div>
      </div>
      <div class="pill-scroll mt-2">${cats.map((c) => `<button type="button" data-od-cat="${c}" class="cat-pill ${state.odCategory === c ? "active" : ""}">${c}</button>`).join("")}</div>
      <div class="prod-grid">${items.map(odCard).join("")}</div>
    </div>`;
  }

  function renderMomsPane() {
    const g = state.kids * GRAMS_PER_KID;
    return `<div class="mode-pane" data-pane="moms">
      <div class="mode-hero"><h2>Mom’s Kitchen</h2><p>Smart weekly veggie kits & nutritional tiffins for kids</p></div>
      <section class="panel">
        <p class="panel-kicker">Step 1: Number of Kids / Kits</p>
        <div class="kids-stepper">
          <button type="button" data-kids="-1" class="step-btn">−</button>
          <div class="kids-count"><strong>${state.kids}</strong><span>${state.kids === 1 ? "Kit / Child" : "Kits / Children"}</span></div>
          <button type="button" data-kids="1" class="step-btn">+</button>
        </div>
        <p class="auto-note">Each kit contains ${formatGrams(g)} of freshly sorted kid-friendly vegetables.</p>
        
        <div class="mt-4 pt-3 border-t border-black/5">
          <p class="text-xs font-extrabold uppercase text-ink-mute mb-2">Kit Customization Mode</p>
          <div class="seg w-full" style="display:flex">
            <button type="button" data-child-mode="double" class="flex-1 ${state.childMode === "double" ? "on" : ""}">Double exact same kit</button>
            <button type="button" data-child-mode="separate" class="flex-1 ${state.childMode === "separate" ? "on" : ""}">Separate custom kits</button>
          </div>
        </div>
      </section>

      ${state.childMode === "separate" ? `
        <div class="space-y-4">
          ${Array.from({ length: state.kids }, (_, i) => i + 1).map((kId) => {
            const kitName = state.childNames[kId] || `Kit ${kId}`;
            const selectedList = momsVegSelected(kId);
            return `<section class="panel" style="border:2px solid var(--terra)">
              <div class="flex items-center justify-between mb-2">
                <input type="text" class="font-display text-lg font-semibold bg-transparent border-b border-terra/30 pb-1" value="${kitName}" data-kit-name-input="${kId}" placeholder="Enter name (e.g. Aarav)" />
                <span class="count-pill ${selectedList.length >= 6 ? "ok" : ""}">${selectedList.length} / 6 veggies</span>
              </div>
              <p class="text-xs text-ink-mute mb-3">Quantity per item: <strong>${formatGrams(g)}</strong></p>
              <div class="kit-grid">${MOMS_VEG.map((item) => {
                const isSelected = !!(state.childSeparateVeggies[kId] && state.childSeparateVeggies[kId][item.id]);
                return `<button type="button" data-moms-sep-toggle="${kId}:${item.id}" class="kit-card ${isSelected ? "selected" : ""}">
                  <div class="produce-art mini">${producePhoto(item)}</div>${isSelected ? `<span class="sel-check">✓</span>` : ""}
                  <p class="kit-name">${item.name}</p>
                  <p class="kit-meta text-[10px]" style="color:var(--terra-deep)">🌱 ${item.nutri}</p>
                </button>`;
              }).join("")}</div>
            </section>`;
          }).join("")}
        </div>
      ` : `
        <section class="panel">
          <div class="panel-row"><div><p class="panel-kicker">Step 2</p><h3 class="panel-title">Choose vegetables for all ${state.kids} kits</h3></div>
            <span class="count-pill ${momsVegSelected(1).length >= 6 ? "ok" : ""}">${momsVegSelected(1).length} / 6</span></div>
          <div class="kit-grid">${MOMS_VEG.map((item) => {
            const on = !!state.cart.find((c) => c.key === `moms:${item.id}`);
            return `<button type="button" data-moms-toggle="${item.id}" class="kit-card ${on ? "selected" : ""}">
              <div class="produce-art mini">${producePhoto(item)}</div>
              ${on ? `<span class="sel-check">✓</span>` : ""}
              <p class="kit-name">${item.name}</p>
              <p class="kit-meta text-[10px]" style="color:var(--terra-deep)">🌱 ${item.nutri}</p>
            </button>`;
          }).join("")}</div>
        </section>
      `}

      <section class="benefits-panel">
        <h3>Included Free Benefits per Kit</h3>
        <div class="benefit-row">
          <div class="benefit"><span class="badge-included">✓ Free</span><strong>1:1 Free Salads</strong><small>Matching your selected veggie kits</small></div>
          <div class="benefit"><span class="badge-included">✓ Free</span><strong>Free Aromatic Kit</strong><small>Garlic, Coriander, Lemon & Curry leaves</small></div>
        </div>
      </section>

      ${recommendations("moms")}
      <button type="button" id="reviewMomsKit" class="primary-cta">Review Mom’s Kit in Cart</button>
    </div>`;
  }

  function renderFamilyPane() {
    const vegN = Object.keys(state.family.veggies).length;
    const value = familyBasketValue();
    return `<div class="mode-pane" data-pane="family">
      <div class="mode-hero"><h2>Family Kitchen</h2><p>Health-Smart Weekly Family Basket with Medical & Dietary Guidance</p></div>
      <section class="panel">
        <div class="panel-row"><div><p class="panel-kicker">Sorted Veggies</p><h3 class="panel-title">Choose up to 6 (Health-Smart Tagged)</h3></div>
          <span class="count-pill ${vegN >= 6 ? "ok" : ""}">${vegN} / 6</span></div>
        <div class="kit-grid">${CATALOG.Veggies.slice(0, 6).map((v) => {
          const on = !!state.family.veggies[v.id];
          return `<button type="button" data-fam-veg="${v.id}" class="kit-card ${on ? "selected" : ""}">
            <div class="produce-art mini">${producePhoto(v)}</div>${on ? `<span class="sel-check">✓</span>` : ""}
            <p class="kit-name">${v.name}</p>
            <p class="kit-meta text-[10px]" style="color:var(--ink-mute)">${v.nutri}</p>${v.diabetesWarn ? `<span class="mt-1 inline-block text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-amber-soft text-amber-deep">⚠️ Caution for strict Diabetes</span>` : `<span class="mt-1 inline-block text-[9px] font-extrabold px-1.5 py-0.5 rounded" style="background:#e7f0e4;color:var(--sage)">✅ Heart & BP Friendly</span>`}
          </button>`;
        }).join("")}</div>
      </section>
      <div class="basket-footer"><p>Basket value <strong>₹${value}</strong></p>
        <button type="button" id="addFamilyBasket" class="primary-cta">Add Weekly Basket to Cart</button></div>
    </div>`;
  }

  function renderHome() {
    const panes = { ondemand: renderOnDemandPane, moms: renderMomsPane, family: renderFamilyPane };
    return `<section class="screen with-nav with-sticky-cart">
      <header class="home-header">
        ${brandRow(true)}
        <div class="loc-row">
          <button type="button" class="loc-chip" data-go="location">
            <span class="text-terra">${icon("pin")}</span>
            <span class="min-w-0 flex-1 text-left"><span class="loc-kicker">Delivering to</span>
            <span class="loc-line">${state.user.address} · <em>Change</em></span></span>
          </button>
        </div>
        ${journeySwitcher()}
      </header>
      <div class="swipe-stage" id="swipeStage">${panes[state.homeTab]()}</div>
      ${stickyCartBar()}
      ${navBar("hub")}
    </section>`;
  }

  function cartItemRow(item) {
    return `<article class="cart-item">
      <div class="cart-item-top"><div>
        <p class="ci-name">${item.name}</p>
        <p class="ci-meta">${item.free ? "FREE · Included" : item.meta || formatGrams(item.weight || 0)}</p>
      </div><p class="ci-price">${item.free ? "₹0" : `₹${lineTotal(item)}`}</p></div>
    </article>`;
  }

  function renderCart() {
    const t = cartTotals();
    const status = cartStatusLines();
    const moms = itemsBySource("moms");
    const empty = !state.cart.length;
    return `<section class="screen">
      <header class="page-header">
        <button type="button" data-go="hub" class="icon-back">${icon("back")}</button>
        <div class="flex-1"><h1>Your Cart</h1><p>${cartCount()} items</p></div>
      </header>
      <div class="page-body cart-body">
        ${empty ? `<div class="empty-cart"><h2>Your basket is empty</h2><button type="button" data-go="hub">Explore Hub</button></div>` : `
        ${status.length ? `<section class="status-panel">${status.map((s) => `<p class="${s.ok ? "ok" : "warn"}">${s.ok ? "✓" : "⚠"} ${s.text}</p>`).join("")}</section>` : ""}
        <section class="cart-sec">
          <div class="cart-sec-head"><div><h2>Mom’s Kitchen</h2><p>Weekly Kids’ Kits · ${state.kids} Kits</p></div><strong>₹${t.moms}</strong></div>${moms.length ? moms.map(cartItemRow).join("") : `<p class="empty-sec">No kit added yet</p>`}
        </section>
        <section class="summary-panel">
          <div class="sum-total"><span>TOTAL</span><strong>₹${t.subtotal}</strong></div>
        </section>`}
      </div>
      <div class="sticky-cta"><button type="button" id="toCheckout" class="primary-cta flat" data-go="checkout">Proceed to Checkout</button></div>
    </section>`;
  }

  function renderCheckout() {
    return `<section class="screen px-5 pt-8 pb-8">
      <button type="button" data-go="cart" class="text-ink-mute mb-4">${icon("back")}</button>
      <h1 class="font-display text-3xl font-semibold">Checkout</h1>
      <p class="mt-2 text-ink-mute">Order placed successfully in demo mode!</p>
      <button type="button" data-go="hub" class="mt-8 w-full h-14 rounded-2xl bg-terra text-white font-extrabold text-lg">Back to Hub</button>
    </section>`;
  }

  function renderNutri() {
    return `<section class="screen with-nav px-4 pt-4 pb-4">
      <h1 class="font-display text-3xl font-semibold">Nutri-Tracker</h1>
      ${navBar("hub")}
    </section>`;
  }

  function renderOrders() {
    return `<section class="screen with-nav px-4 pt-4 pb-4">
      <h1 class="font-display text-3xl font-semibold">My Orders</h1>
      ${navBar("hub")}
    </section>`;
  }

  function syncMomsCart() {
    state.cart = state.cart.filter((c) => c.source !== "moms");
    if (state.childMode === "double") {
      const vegs = momsVegSelected(1);
      for (const v of vegs) {
        upsertCart({
          key: `moms:${v.id}`, id: v.id, name: `${v.name} (Kit for ${state.kids} kids)`, source: "moms",
          price: v.price, weight: state.kids * GRAMS_PER_KID, qty: 1, meta: `Mom’s Kit · ${formatGrams(state.kids * GRAMS_PER_KID)}`,
        });
      }
      if (vegs.length > 0) {
        upsertCart({ key: "moms:free-salad", name: `${vegs.length} Free Salads`, source: "moms", free: true, weight: 0, price: 0, qty: 1, meta: "Included free 1:1" });
        upsertCart({ key: "moms:free-aroma", name: "Free Aromatic Kit", source: "moms", free: true, weight: 0, price: 0, qty: 1, meta: "Included free" });
      }
    } else {
      for (let k = 1; k <= state.kids; k++) {
        const kitName = state.childNames[k] || `Kit ${k}`;
        const map = state.childSeparateVeggies[k] || {};
        for (const id of Object.keys(map)) {
          const v = MOMS_VEG.find((x) => x.id === id);
          if (!v) continue;
          upsertCart({
            key: `moms:sep:${k}:${id}`, id, name: `${v.name} — ${kitName}`, source: "moms",
            price: v.price, weight: GRAMS_PER_KID, qty: 1, meta: `${kitName} · ${formatGrams(GRAMS_PER_KID)}`,
          });
        }
        upsertCart({ key: `moms:sep:salad:${k}`, name: `Free Salad — ${kitName}`, source: "moms", free: true, weight: 0, price: 0, qty: 1, meta: "Included free" });
      }
      upsertCart({ key: "moms:free-aroma-sep", name: "Free Aromatic Kits (Separate)", source: "moms", free: true, weight: 0, price: 0, qty: 1, meta: "Included free" });
    }
  }

  function syncFamilyToCart() {
    state.cart = state.cart.filter((c) => c.source !== "family");
    let total = 0;
    for (const [id] of Object.entries(state.family.veggies)) {
      const meta = CATALOG.Veggies.find((v) => v.id === id);
      const price = priceForWeight(meta.pricePerKg, 500);
      total += price;
      upsertCart({ key: `family:veg:${id}`, name: meta.name, source: "family", price, weight: 500, qty: 1, meta: "Sorted veggies" });
    }
    return total;
  }

  function scheduleRender(opts = {}) {
    if (opts.focus) focusKey = opts.focus;
    cancelAnimationFrame(renderTimer);
    renderTimer = requestAnimationFrame(() => render(opts));
  }

  function render(opts = {}) {
    const map = {
      splash: renderSplash, login: renderLogin, otp: renderOtp, location: renderLocation, hub: renderHub,
      home: renderHome, cart: renderCart, checkout: renderCheckout, nutri: renderNutri, orders: renderOrders,
    };
    screensEl.innerHTML = (map[state.screen] || renderSplash)();
    setTitle();
    bind();
    if (focusKey || opts.announce) restoreFocus();
    else focusKey = null;
  }

  function bind() {
    screensEl.querySelectorAll("[data-go]").forEach((btn) => btn.addEventListener("click", () => go(btn.dataset.go)));
    screensEl.querySelectorAll("[data-hub-mode]").forEach((btn) => btn.addEventListener("click", () => go("home", { homeTab: btn.dataset.hubMode })));
    screensEl.querySelectorAll("[data-home-tab]").forEach((btn) => {
      btn.addEventListener("click", () => { state.homeTab = btn.dataset.homeTab; save(); scheduleRender({ keepScroll: true }); });
    });

    $("#sendOtp")?.addEventListener("click", () => { state.phone = $("#phoneInput")?.value || "9876543210"; go("otp"); });
    $("#verifyOtp")?.addEventListener("click", () => go("hub"));
    $("#grantLoc")?.addEventListener("click", () => go("hub"));

    // Mom's Kitchen bindings
    screensEl.querySelectorAll("[data-kids]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.kids = Math.min(4, Math.max(1, state.kids + Number(btn.dataset.kids)));
        syncMomsCart(); save(); render();
      });
    });
    screensEl.querySelectorAll("[data-child-mode]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.childMode = btn.dataset.childMode;
        syncMomsCart(); save(); render();
      });
    });
    screensEl.querySelectorAll("[data-kit-name-input]").forEach((input) => {
      input.addEventListener("input", () => {
        const kId = input.dataset.kitNameInput;
        state.childNames[kId] = input.value || `Kit ${kId}`;
        save();
      });
    });
    screensEl.querySelectorAll("[data-moms-sep-toggle]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const [kIdStr, id] = btn.dataset.momsSepToggle.split(":");
        const kId = Number(kIdStr);
        if (!state.childSeparateVeggies[kId]) state.childSeparateVeggies[kId] = {};
        if (state.childSeparateVeggies[kId][id]) delete state.childSeparateVeggies[kId][id];
        else {
          if (Object.keys(state.childSeparateVeggies[kId]).length >= 6) return toast("Max 6 veggies per kit");
          state.childSeparateVeggies[kId][id] = true;
        }
        syncMomsCart(); save(); render();
      });
    });
    screensEl.querySelectorAll("[data-moms-toggle]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.momsToggle; const key = `moms:${id}`; const meta = MOMS_VEG.find((v) => v.id === id);
        if (state.cart.find((c) => c.key === key)) removeCart(key);
        else {
          if (momsVegSelected(1).length >= 6) return toast("You already have 6 veggie kits");
          upsertCart({ key, id, name: meta.name, source: "moms", price: meta.price, weight: state.kids * GRAMS_PER_KID, qty: 1, meta: `Included · ${formatGrams(state.kids * GRAMS_PER_KID)}` });
        }
        syncMomsCart(); render();
      });
    });
    $("#reviewMomsKit")?.addEventListener("click", () => { syncMomsCart(); go("cart"); });

    // Family & On-Demand
    screensEl.querySelectorAll("[data-od-cat]").forEach((btn) => btn.addEventListener("click", () => { state.odCategory = btn.dataset.odCat; scheduleRender({ keepScroll: true }); }));
    screensEl.querySelectorAll("[data-od-add]").forEach((btn) => {
      const id = btn.dataset.odAdd; const meta = Object.values(CATALOG).flat().find((x) => x.id === id);
      upsertCart({ key: `od:${id}`, id, name: meta.name, source: "ondemand", weight: 500, price: priceForWeight(meta.pricePerKg, 500), qty: 1, meta: "500g" });
      toast("Added to cart"); render();
    });
    screensEl.querySelectorAll("[data-fam-veg]").forEach((btn) => {
      const id = btn.dataset.famVeg;
      if (state.family.veggies[id]) delete state.family.veggies[id];
      else state.family.veggies[id] = { cut: false, washed: false };
      render();
    });
    $("#addFamilyBasket")?.addEventListener("click", () => { syncFamilyToCart(); go("cart"); });
  }

  load();
  if (!applyHash()) { if (state.locationGranted && state.phone) state.screen = "hub"; }
  syncHash(true);
  scheduleRender();
})();
