const card = document.getElementById("card");

const cardName = document.getElementById("cardName");
const cardNameDisplay = document.getElementById("cardNameDisplay");

const nameSize = document.getElementById("nameSize");
const nameColor = document.getElementById("nameColor");
const outlineColor = document.getElementById("outlineColor");

const frameSelect = document.getElementById("frameSelect");
const elementSelect = document.getElementById("elementSelect");

const starCount = document.getElementById("starCount");
const stars = document.getElementById("stars");

const imageUpload = document.getElementById("imageUpload");
const cardImage = document.getElementById("cardImage");

const effectText = document.getElementById("effectText");
const effectDisplay = document.getElementById("effectDisplay");

const flavorText = document.getElementById("flavorText");
const flavorDisplay = document.getElementById("flavorDisplay");

const atkBox = document.getElementById("atkBox");
const defBox = document.getElementById("defBox");

const atkValue = document.getElementById("atkValue");
const defValue = document.getElementById("defValue");

const showAtk = document.getElementById("showAtk");
const showDef = document.getElementById("showDef");

const saveBtn = document.getElementById("saveBtn");

const attributeIcon = document.getElementById("attributeIcon");

/* ===== 名前 ===== */

cardName.addEventListener("input", () => {
    cardNameDisplay.textContent = cardName.value;
});

nameSize.addEventListener("input", () => {
    cardNameDisplay.style.fontSize =
        nameSize.value + "px";
});

nameColor.addEventListener("input", () => {
    cardNameDisplay.style.color =
        nameColor.value;
});

outlineColor.addEventListener("input", () => {

    const c = outlineColor.value;

    cardNameDisplay.style.textShadow = `
        3px 3px 0 ${c},
       -3px 3px 0 ${c},
        3px -3px 0 ${c},
       -3px -3px 0 ${c}
    `;
});

/* ===== フレーム ===== */

frameSelect.addEventListener("change", () => {

    card.className = "card";

    card.classList.add(
        "frame-" + frameSelect.value
    );
});

/* ===== 属性 ===== */

elementSelect.addEventListener("change", () => {

    const value = elementSelect.value;

    attributeIcon.className =
        "attribute " + value;

    let symbol = "";

    switch(value){

        case "water":
            symbol = "💧";
            break;

        case "fire":
            symbol = "🔥";
            break;

        case "nature":
            symbol = "🌿";
            break;

        case "dark":
            symbol = "🌙";
            break;

        case "light":
            symbol = "☀";
            break;

        case "none":
            symbol = "◆";
            break;
    }

    attributeIcon.textContent = symbol;
});

/* ===== 星 ===== */

function updateStars(){

    stars.innerHTML = "";

    const count =
        Number(starCount.value);

    for(let i=0;i<count;i++){

        const span =
            document.createElement("span");

        span.textContent = "★";

        if(count === 5){
            span.classList.add(
                "rainbow-star"
            );
        }

        stars.appendChild(span);
    }
}

starCount.addEventListener(
    "input",
    updateStars
);

updateStars();

/* ===== 画像 ===== */

imageUpload.addEventListener(
    "change",
    e => {

    const file =
        e.target.files[0];

    if(!file) return;

    const reader =
        new FileReader();

    reader.onload = function(event){

        cardImage.src =
            event.target.result;
    };

    reader.readAsDataURL(file);
});

/* ===== 効果 ===== */

effectText.addEventListener(
    "input",
    () => {

    effectDisplay.innerText =
        effectText.value;
});

/* ===== フレーバー ===== */

flavorText.addEventListener(
    "input",
    () => {

    flavorDisplay.innerText =
        flavorText.value;
});

/* ===== ATK ===== */

atkValue.addEventListener(
    "input",
    () => {

    atkBox.textContent =
        "ATK " + atkValue.value;
});

/* ===== DEF ===== */

defValue.addEventListener(
    "input",
    () => {

    defBox.textContent =
        "DEF " + defValue.value;
});

/* ===== 表示切替 ===== */

showAtk.addEventListener(
    "change",
    () => {

    atkBox.style.display =
        showAtk.checked
        ? "block"
        : "none";
});

showDef.addEventListener(
    "change",
    () => {

    defBox.style.display =
        showDef.checked
        ? "block"
        : "none";
});

/* ===== PNG保存 ===== */

saveBtn.addEventListener(
    "click",
    async () => {

    const canvas =
        await html2canvas(
            card,
            {
                scale:3,
                backgroundColor:null,
                useCORS:true
            }
        );

    const link =
        document.createElement("a");

    link.download =
        "orica.png";

    link.href =
        canvas.toDataURL(
            "image/png"
        );

    link.click();
});