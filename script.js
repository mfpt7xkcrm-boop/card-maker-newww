const EMPTY_PIXEL = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";

// ===== DOM =====
const card = document.getElementById("card");
const holoLayer = document.getElementById("holoLayer");

const cardName = document.getElementById("cardName");
const cardNameDisplay = document.getElementById("cardNameDisplay");
const nameSize = document.getElementById("nameSize");
const nameColor = document.getElementById("nameColor");
const outlineColor = document.getElementById("outlineColor");

const cardNumber = document.getElementById("cardNumber");
const numberDisplay = document.getElementById("numberDisplay");

const creator = document.getElementById("creator");
const creatorDisplay = document.getElementById("creatorDisplay");

const imageUpload = document.getElementById("imageUpload");
const cardImage = document.getElementById("cardImage");

const frameCategory = document.getElementById("frameCategory");
const frameSelect = document.getElementById("frameSelect");

const starCount = document.getElementById("starCount");
const stars = document.getElementById("stars");

const effectText = document.getElementById("effectText");
const effectDisplay = document.getElementById("effectDisplay");
const effectSize = document.getElementById("effectSize");

const flavorText = document.getElementById("flavorText");
const flavorDisplay = document.getElementById("flavorDisplay");
const flavorDivider = document.getElementById("flavorDivider");
const showFlavor = document.getElementById("showFlavor");
const flavorFont = document.getElementById("flavorFont");
const flavorSize = document.getElementById("flavorSize");

const rarity = document.getElementById("rarity");
const rarityDisplay = document.getElementById("rarityDisplay");
const holo = document.getElementById("holo");

const savePNG = document.getElementById("savePNG");
const saveJPG = document.getElementById("saveJPG");
const saveJSON = document.getElementById("saveJSON");
const loadJSONBtn = document.getElementById("loadJSONBtn");
const loadJSON = document.getElementById("loadJSON");

const panels = document.querySelectorAll(".panel");
const tabButtons = document.querySelectorAll(".bottom-nav button");

const flavorFontMap = {
  mincho: '"Yu Mincho", "Hiragino Mincho ProN", "MS PMincho", serif',
  gothic: '"Yu Gothic", "Meiryo", sans-serif',
  serif: 'Georgia, "Times New Roman", serif'
};

// ===== Frame data =====
const frameData = {
  basic: [
    ["water", "水"],
    ["fire", "火"],
    ["nature", "自然"],
    ["light", "光"],
    ["dark", "闇"],
    ["rainbow", "虹"],
    ["space", "宇宙"],
    ["blue", "青"],
    ["red", "赤"],
    ["green", "緑"],
    ["purple", "紫"]
  ],
  premium: [
    ["dragon-blue", "青ドラゴン"],
    ["dragon-red", "赤ドラゴン"],
    ["dragon-green", "緑ドラゴン"],
    ["dragon-purple", "紫ドラゴン"],
    ["holy", "聖騎士"],
    ["devil", "悪魔"],
    ["machine", "機械"],
    ["cosmos", "宇宙"]
  ]
};

// ===== helpers =====
function escapeHTML(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function setNameOutline() {
  const c = outlineColor.value;
  cardNameDisplay.style.textShadow = `
    3px 3px 0 ${c},
   -3px 3px 0 ${c},
    3px -3px 0 ${c},
   -3px -3px 0 ${c}
  `;
}

function updateCardName() {
  cardNameDisplay.textContent = cardName.value.trim() || "カード名";
}

function updateNumber() {
  numberDisplay.textContent = cardNumber.value.trim();
}

function updateCreator() {
  creatorDisplay.textContent = creator.value.trim();
}

function renderEffect() {
  const raw = effectText.value.replace(/\r\n/g, "\n");
  const lines = raw.split("\n");

  effectDisplay.innerHTML = lines
    .map(line => {
      const t = line.trim();
      if (!t) return `<div class="effect-gap"></div>`;
      return `<div class="effect-line">■ ${escapeHTML(t)}</div>`;
    })
    .join("");
}

function renderFlavor() {
  flavorDisplay.textContent = flavorText.value.trim();
}

function updateFlavorVisibility() {
  const visible = showFlavor.checked;
  flavorDisplay.classList.toggle("hidden", !visible);
  flavorDivider.classList.toggle("hidden", !visible);
}

function updateFlavorFont() {
  flavorDisplay.style.fontFamily =
    flavorFontMap[flavorFont.value] || flavorFontMap.mincho;
}

function updateEffectSize() {
  effectDisplay.style.fontSize = `${effectSize.value}px`;
}

function updateFlavorSize() {
  flavorDisplay.style.fontSize = `${flavorSize.value}px`;
}

function updateStars() {
  stars.innerHTML = "";
  const count = Number(starCount.value);

  for (let i = 0; i < count; i++) {
    const span = document.createElement("span");
    span.className = "star";
    span.textContent = "★";
    if (count === 5) span.classList.add("rainbow");
    stars.appendChild(span);
  }
}

function updateRarity() {
  const value = rarity.value.trim();
  rarityDisplay.className = "rarity";

  if (!value) {
    rarityDisplay.textContent = "";
    return;
  }

  rarityDisplay.textContent = value;
  rarityDisplay.classList.add(value.toLowerCase());
}

function updateHolo() {
  holoLayer.classList.toggle("active", holo.checked);
}

function applyFrame() {
  card.className = `card frame-${frameSelect.value}`;
}

function buildFrameOptions() {
  const items = frameData[frameCategory.value] || frameData.basic;
  frameSelect.innerHTML = "";

  items.forEach(([value, label]) => {
    const opt = document.createElement("option");
    opt.value = value;
    opt.textContent = label;
    frameSelect.appendChild(opt);
  });

  applyFrame();
}

function exportCard(mimeType, filename) {
  html2canvas(card, {
    scale: 4,
    useCORS: true,
    backgroundColor: null
  }).then(canvas => {
    const quality = mimeType === "image/jpeg" ? 0.95 : undefined;
    const dataURL = canvas.toDataURL(mimeType, quality);

    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

    if (isIOS) {
      showSaveOverlay(dataURL, filename);
      return;
    }

    const a = document.createElement("a");
    a.href = dataURL;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
  });
}

function showSaveOverlay(dataURL, filename) {
  const overlay = document.createElement("div");
  overlay.className = "save-overlay";

  overlay.innerHTML = `
    <div class="hint">
      画像を長押しして保存してください。<br>
      端末によっては下のボタンでも保存できます。
    </div>

    <img src="${dataURL}" alt="保存用プレビュー">

    <div class="buttons">
      <a href="${dataURL}" download="${filename}">保存を試す</a>
      <button type="button" id="closeSaveOverlay">閉じる</button>
    </div>
  `;

  document.body.appendChild(overlay);

  overlay.querySelector("#closeSaveOverlay").addEventListener("click", () => {
    overlay.remove();
  });
}

function collectState() {
  return {
    cardName: cardName.value,
    nameSize: nameSize.value,
    nameColor: nameColor.value,
    outlineColor: outlineColor.value,
    cardNumber: cardNumber.value,
    creator: creator.value,
    frameCategory: frameCategory.value,
    frame: frameSelect.value,
    starCount: starCount.value,
    effectText: effectText.value,
    effectSize: effectSize.value,
    flavorText: flavorText.value,
    showFlavor: showFlavor.checked,
    flavorFont: flavorFont.value,
    flavorSize: flavorSize.value,
    rarity: rarity.value,
    holo: holo.checked,
    imageData: cardImage.src && cardImage.src !== EMPTY_PIXEL ? cardImage.src : ""
  };
}

function applyState(state) {
  cardName.value = state.cardName || "";
  nameSize.value = state.nameSize || 52;
  nameColor.value = state.nameColor || "#ffffff";
  outlineColor.value = state.outlineColor || "#000000";

  cardNumber.value = state.cardNumber || "";
  creator.value = state.creator || "";

  frameCategory.value = state.frameCategory || "basic";
  buildFrameOptions();
  frameSelect.value = state.frame || frameSelect.options[0]?.value || "water";
  applyFrame();

  starCount.value = state.starCount ?? 0;
  effectText.value = state.effectText || "";
  effectSize.value = state.effectSize || 20;
  flavorText.value = state.flavorText || "";
  showFlavor.checked = state.showFlavor ?? true;
  flavorFont.value = state.flavorFont || "mincho";
  flavorSize.value = state.flavorSize || 14;
  rarity.value = state.rarity || "";
  holo.checked = !!state.holo;

  cardImage.src = state.imageData || EMPTY_PIXEL;

  updateCardName();
  setNameOutline();
  updateNumber();
  updateCreator();
  renderEffect();
  updateEffectSize();
  renderFlavor();
  updateFlavorVisibility();
  updateFlavorFont();
  updateFlavorSize();
  updateStars();
  updateRarity();
  updateHolo();
}

function loadJSONFile(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result);
      applyState(data);
    } catch (err) {
      alert("JSONの読み込みに失敗したよ。");
      console.error(err);
    }
  };
  reader.readAsText(file);
}

// ===== initialization =====
buildFrameOptions();
applyState({
  cardName: "",
  nameSize: 52,
  nameColor: "#ffffff",
  outlineColor: "#000000",
  cardNumber: "",
  creator: "",
  frameCategory: "basic",
  frame: "water",
  starCount: 0,
  effectText: "",
  effectSize: 20,
  flavorText: "",
  showFlavor: true,
  flavorFont: "mincho",
  flavorSize: 14,
  rarity: "",
  holo: false,
  imageData: ""
});

// ===== listeners =====
cardName.addEventListener("input", updateCardName);
nameSize.addEventListener("input", () => {
  cardNameDisplay.style.fontSize = `${nameSize.value}px`;
});
nameColor.addEventListener("input", () => {
  cardNameDisplay.style.color = nameColor.value;
});
outlineColor.addEventListener("input", setNameOutline);

cardNumber.addEventListener("input", updateNumber);
creator.addEventListener("input", updateCreator);

imageUpload.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    cardImage.src = e.target.result;
  };
  reader.readAsDataURL(file);
});

frameCategory.addEventListener("change", () => {
  buildFrameOptions();
});

frameSelect.addEventListener("change", applyFrame);

starCount.addEventListener("input", updateStars);

effectText.addEventListener("input", renderEffect);
effectSize.addEventListener("input", updateEffectSize);

flavorText.addEventListener("input", renderFlavor);
showFlavor.addEventListener("change", updateFlavorVisibility);
flavorFont.addEventListener("change", updateFlavorFont);
flavorSize.addEventListener("input", updateFlavorSize);

rarity.addEventListener("change", updateRarity);
holo.addEventListener("change", updateHolo);

savePNG.addEventListener("click", () => {
  exportCard("image/png", "card.png");
});

saveJPG.addEventListener("click", () => {
  exportCard("image/jpeg", "card.jpg");
});

saveJSON.addEventListener("click", () => {
  const data = collectState();
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json"
  });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "card.json";
  document.body.appendChild(a);
  a.click();
  a.remove();

  setTimeout(() => URL.revokeObjectURL(url), 1000);
});

loadJSONBtn.addEventListener("click", () => {
  loadJSON.click();
});

loadJSON.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) return;
  loadJSONFile(file);
  event.target.value = "";
});

tabButtons.forEach(button => {
  button.addEventListener("click", () => {
    tabButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    panels.forEach(panel => panel.classList.remove("active"));
    document.getElementById(`panel-${button.dataset.panel}`).classList.add("active");
  });
});
