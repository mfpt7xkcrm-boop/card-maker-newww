// =========================
// 要素取得
// =========================

const card = document.getElementById("card");

const cardName =
document.getElementById("cardName");

const cardNameDisplay =
document.getElementById("cardNameDisplay");

const nameSize =
document.getElementById("nameSize");

const nameColor =
document.getElementById("nameColor");

const effectText =
document.getElementById("effectText");

const effectDisplay =
document.getElementById("effectDisplay");

const flavorText =
document.getElementById("flavorText");

const flavorDisplay =
document.getElementById("flavorDisplay");

const effectSize =
document.getElementById("effectSize");

const cardNumber =
document.getElementById("cardNumber");

const numberDisplay =
document.getElementById("numberDisplay");

const creator =
document.getElementById("creator");

const creatorDisplay =
document.getElementById("creatorDisplay");

const rarity =
document.getElementById("rarity");

const rarityDisplay =
document.getElementById("rarityDisplay");

const starCount =
document.getElementById("starCount");

const stars =
document.getElementById("stars");

const holo =
document.getElementById("holo");

const holoLayer =
document.getElementById("holoLayer");

const frameSelect =
document.getElementById("frameSelect");

const frameCategory =
document.getElementById("frameCategory");

const imageUpload =
document.getElementById("imageUpload");

const cardImage =
document.getElementById("cardImage");

const imageZoom =
document.getElementById("imageZoom");

// =========================
// フレーム一覧
// =========================

const frameData = {

basic:[
["water","水"],
["fire","火"],
["nature","自然"],
["light","光"],
["dark","闇"],
["rainbow","虹"],
["space","宇宙"],
["blue","青"],
["red","赤"],
["green","緑"],
["purple","紫"]
],

premium:[
["dragon-blue","青ドラゴン"],
["dragon-red","赤ドラゴン"],
["dragon-green","緑ドラゴン"],
["dragon-purple","紫ドラゴン"],
["holy","聖騎士"],
["devil","悪魔"],
["machine","機械"],
["cosmos","宇宙"]
]

};

// =========================
// フレーム読込
// =========================

function loadFrames(){

frameSelect.innerHTML="";

frameData[
frameCategory.value
].forEach(frame=>{

const option =
document.createElement("option");

option.value=frame[0];
option.textContent=frame[1];

frameSelect.appendChild(option);

});

}

loadFrames();

frameCategory.addEventListener(
"change",
loadFrames
);

// =========================
// カード名
// =========================

cardName.addEventListener(
"input",
()=>{
cardNameDisplay.textContent =
cardName.value || "カード名";
}
);

nameSize.addEventListener(
"input",
()=>{
cardNameDisplay.style.fontSize =
nameSize.value + "px";
}
);

nameColor.addEventListener(
"input",
()=>{
cardNameDisplay.style.color =
nameColor.value;
}
);

// =========================
// 説明
// =========================

effectText.addEventListener(
"input",
()=>{
effectDisplay.textContent =
effectText.value;
}
);

flavorText.addEventListener(
"input",
()=>{
flavorDisplay.textContent =
flavorText.value;
}
);

effectSize.addEventListener(
"input",
()=>{
effectDisplay.style.fontSize =
effectSize.value + "px";
}
);

// =========================
// 番号
// =========================

cardNumber.addEventListener(
"input",
()=>{
numberDisplay.textContent =
cardNumber.value;
}
);

// =========================
// 作者
// =========================

creator.addEventListener(
"input",
()=>{
creatorDisplay.textContent =
creator.value;
}
);

// =========================
// 星
// =========================

function updateStars(){

stars.innerHTML="";

const count =
Number(starCount.value);

for(let i=0;i<count;i++){

const star =
document.createElement("span");

star.textContent="⭐";

if(count===5){

star.classList.add(
"rainbow-star"
);

}

stars.appendChild(star);

}

}

updateStars();

starCount.addEventListener(
"input",
updateStars
);

// =========================
// レア
// =========================

rarity.addEventListener(
"change",
()=>{

rarityDisplay.textContent =
rarity.value;

rarityDisplay.className =
"rarity";

if(rarity.value){

rarityDisplay.classList.add(
rarity.value.toLowerCase()
);

}

}
);

// =========================
// ホロ
// =========================

holo.addEventListener(
"change",
()=>{

if(holo.checked){

holoLayer.classList.add(
"active"
);

}else{

holoLayer.classList.remove(
"active"
);

}

}
);

// =========================
// フレーム
// =========================

frameSelect.addEventListener(
"change",
()=>{

card.className="card";

card.classList.add(
"frame-" +
frameSelect.value
);

}
);

// =========================
// 画像アップロード
// =========================

imageUpload.addEventListener(
"change",
(event)=>{

const file =
event.target.files[0];

if(!file) return;

const reader =
new FileReader();

reader.onload=(e)=>{

cardImage.src =
e.target.result;

};

reader.readAsDataURL(file);

}
);

// =========================
// ズーム
// =========================

let zoom = 1;

imageZoom.addEventListener(
"input",
()=>{

zoom =
imageZoom.value / 100;

updateTransform();

}
);

// =========================
// ドラッグ
// =========================

let posX = 0;
let posY = 0;

let dragging = false;

const artArea =
document.querySelector(
".art-area"
);

artArea.addEventListener(
"pointerdown",
()=>{

dragging=true;

}
);

window.addEventListener(
"pointerup",
()=>{

dragging=false;

}
);

window.addEventListener(
"pointermove",
(e)=>{

if(!dragging) return;

posX += e.movementX;
posY += e.movementY;

updateTransform();

}
);

function updateTransform(){

cardImage.style.transform =
`translate(calc(-50% + ${posX}px),
calc(-50% + ${posY}px))
scale(${zoom})`;

}

// =========================
// PNG保存
// =========================

document
.getElementById("savePNG")
.addEventListener(
"click",
()=>{

html2canvas(card,{

scale:4,
useCORS:true

}).then(canvas=>{

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

}
);

// =========================
// JPG保存
// =========================

document
.getElementById("saveJPG")
.addEventListener(
"click",
()=>{

html2canvas(card,{

scale:4,
useCORS:true

}).then(canvas=>{

const link =
document.createElement("a");

link.download =
"card.jpg";

link.href =
canvas.toDataURL(
"image/jpeg",
0.95
);

link.click();

});

}
);

// =========================
// タブ切替
// =========================

document
.querySelectorAll(
".bottom-nav button"
)
.forEach(btn=>{

btn.addEventListener(
"click",
()=>{

document
.querySelectorAll(
".panel"
)
.forEach(panel=>{

panel.classList.remove(
"active"
);

});

document
.getElementById(
"panel-" +
btn.dataset.panel
)
.classList.add(
"active"
);

});

});
