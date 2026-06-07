/* =========================
   パネル切替
========================= */

const panels = document.querySelectorAll(".panel");

document
.querySelectorAll(".bottom-tabs button")
.forEach(btn=>{

    btn.addEventListener("click",()=>{

        const target =
        btn.dataset.panel;

        panels.forEach(panel=>{

            panel.classList.remove(
                "active"
            );

        });

        document
        .getElementById(
            "panel-"+target
        )
        .classList.add("active");

    });

});

/* =========================
   カード名
========================= */

const cardName =
document.getElementById("cardName");

const cardNameDisplay =
document.getElementById(
"cardNameDisplay"
);

cardName.addEventListener(
"input",
()=>{

cardNameDisplay.textContent =
cardName.value || "カード名";

});

/* =========================
   カード番号
========================= */

const cardNumber =
document.getElementById(
"cardNumber"
);

const numberDisplay =
document.getElementById(
"numberDisplay"
);

cardNumber.addEventListener(
"input",
()=>{

numberDisplay.textContent =
cardNumber.value;

});

/* =========================
   作者名
========================= */

const creator =
document.getElementById(
"creator"
);

const creatorDisplay =
document.getElementById(
"creatorDisplay"
);

creator.addEventListener(
"input",
()=>{

creatorDisplay.textContent =
creator.value;

});

/* =========================
   効果文
========================= */

const effectText =
document.getElementById(
"effectText"
);

const effectDisplay =
document.getElementById(
"effectDisplay"
);

effectText.addEventListener(
"input",
()=>{

effectDisplay.innerText =
effectText.value;

});

/* =========================
   効果文字サイズ
========================= */

const effectSize =
document.getElementById(
"effectSize"
);

effectSize.addEventListener(
"input",
()=>{

effectDisplay.style.fontSize =
effectSize.value + "px";

});

/* =========================
   レアリティ
========================= */

const rarity =
document.getElementById(
"rarity"
);

const rarityDisplay =
document.getElementById(
"rarityDisplay"
);

function updateRarity(){

const value =
rarity.value;

rarityDisplay.textContent =
value === "なし"
? ""
: value;

rarityDisplay.className =
"rarity";

switch(value){

case "N":

rarityDisplay.style.color =
"#cccccc";

break;

case "R":

rarityDisplay.style.color =
"#4da6ff";

break;

case "SR":

rarityDisplay.style.color =
"#c266ff";

break;

case "SSR":

rarityDisplay.style.color =
"#ffd700";

break;

case "UR":

rarityDisplay.style.background =
"linear-gradient(90deg,red,orange,yellow,green,cyan,blue,violet)";

rarityDisplay.style.webkitBackgroundClip =
"text";

rarityDisplay.style.color =
"transparent";

break;

case "LR":

rarityDisplay.style.background =
"linear-gradient(90deg,#ffd700,red,orange,yellow,green,cyan,blue,violet)";

rarityDisplay.style.webkitBackgroundClip =
"text";

rarityDisplay.style.color =
"transparent";

rarityDisplay.style.filter =
"drop-shadow(0 0 8px gold)";

break;

default:

rarityDisplay.style.color =
"white";

}

}

rarity.addEventListener(
"change",
updateRarity
);

updateRarity();

/* =========================
   PNG保存
========================= */

const savePNG =
document.getElementById(
"savePNG"
);

savePNG.addEventListener(
"click",
async ()=>{

const card =
document.getElementById(
"card"
);

const canvas =
await html2canvas(
card,
{
scale:4,
useCORS:true,
backgroundColor:null
}
);

const link =
document.createElement("a");

link.download =
"card.png";

link.href =
canvas.toDataURL(
"image/png"
);

link.click();

});

/* =========================
   JPG保存
========================= */

const saveJPG =
document.getElementById(
"saveJPG"
);

saveJPG.addEventListener(
"click",
async ()=>{

const card =
document.getElementById(
"card"
);

const canvas =
await html2canvas(
card,
{
scale:4,
useCORS:true
}
);

const link =
document.createElement("a");

link.download =
"card.jpg";

link.href =
canvas.toDataURL(
"image/jpeg",
1.0
);

link.click();

});

/* =========================
   JSON保存
========================= */

const saveJSON =
document.getElementById(
"saveJSON"
);

saveJSON.addEventListener(
"click",
()=>{

const data = {

name:
cardName.value,

number:
cardNumber.value,

creator:
creator.value,

effect:
effectText.value,

rarity:
rarity.value

};

const blob =
new Blob(
[
JSON.stringify(
data,
null,
2
)
],
{
type:
"application/json"
}
);

const link =
document.createElement("a");

link.href =
URL.createObjectURL(
blob
);

link.download =
"card.json";

link.click();

});

/* =========================
   JSON読込
========================= */

const loadJSON =
document.getElementById(
"loadJSON"
);

loadJSON.addEventListener(
"click",
()=>{

const input =
document.createElement(
"input"
);

input.type = "file";

input.accept =
".json";

input.onchange =
event=>{

const file =
event.target.files[0];

if(!file) return;

const reader =
new FileReader();

reader.onload = ()=>{

const data =
JSON.parse(
reader.result
);

cardName.value =
data.name || "";

cardNumber.value =
data.number || "";

creator.value =
data.creator || "";

effectText.value =
data.effect || "";

rarity.value =
data.rarity || "なし";

cardName.dispatchEvent(
new Event("input")
);

cardNumber.dispatchEvent(
new Event("input")
);

creator.dispatchEvent(
new Event("input")
);

effectText.dispatchEvent(
new Event("input")
);

updateRarity();

};

reader.readAsText(
file
);

};

input.click();

});

/* =========================
   初期表示
========================= */

cardNameDisplay.textContent =
"カード名";

numberDisplay.textContent =
"";

creatorDisplay.textContent =
"";

effectDisplay.textContent =
"";
