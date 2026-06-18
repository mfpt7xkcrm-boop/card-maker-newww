// =========================
// 初期設定
// =========================

const EMPTY_PIXEL =
"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";


// =========================
// DOM取得
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


const outlineColor =
document.getElementById("outlineColor");


// 画像

const imageUpload =
document.getElementById("imageUpload");


const cardImage =
document.getElementById("cardImage");


// 星

const starCount =
document.getElementById("starCount");


const stars =
document.getElementById("stars");


// 説明

const effectText =
document.getElementById("effectText");


const effectDisplay =
document.getElementById("effectDisplay");


const effectSize =
document.getElementById("effectSize");


// フレーバー

const showFlavor =
document.getElementById("showFlavor");


const flavorText =
document.getElementById("flavorText");


const flavorDisplay =
document.getElementById("flavorDisplay");


const flavorDivider =
document.getElementById("flavorDivider");


const flavorSize =
document.getElementById("flavorSize");


const flavorFont =
document.getElementById("flavorFont");


// 情報

const numberInput =
document.getElementById("cardNumber");


const numberDisplay =
document.getElementById("numberDisplay");


const creatorInput =
document.getElementById("creator");


const creatorDisplay =
document.getElementById("creatorDisplay");


// レア

const rarity =
document.getElementById("rarity");


const rarityDisplay =
document.getElementById("rarityDisplay");


// ホロ

const holo =
document.getElementById("holo");


const holoLayer =
document.getElementById("holoLayer");


// フレーム

const frameCategory =
document.getElementById("frameCategory");


const frameSelect =
document.getElementById("frameSelect");


// 保存

const savePNG =
document.getElementById("savePNG");


const saveJPG =
document.getElementById("saveJPG");


const saveJSON =
document.getElementById("saveJSON");


const loadJSONBtn =
document.getElementById("loadJSONBtn");


const loadJSON =
document.getElementById("loadJSON");


// タブ

const panels =
document.querySelectorAll(".panel");


const tabs =
document.querySelectorAll(".bottom-nav button");



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
["rainbow","虹"]

],


premium:[

["dragon-blue","青ドラゴン"],
["dragon-red","赤ドラゴン"],
["dragon-green","緑ドラゴン"],
["dragon-purple","紫ドラゴン"],
["holy","聖"],
["devil","悪魔"],
["machine","機械"],
["cosmos","宇宙"]

]

};



// =========================
// 名前更新
// =========================


function updateName(){

cardNameDisplay.textContent =
cardName.value || "カード名";


cardNameDisplay.style.fontSize =
nameSize.value + "px";


cardNameDisplay.style.color =
nameColor.value;


cardNameDisplay.style.textShadow =
`
3px 3px 0 ${outlineColor.value},
-3px 3px 0 ${outlineColor.value},
3px -3px 0 ${outlineColor.value},
-3px -3px 0 ${outlineColor.value}
`;

}


// =========================
// 説明文更新
// =========================


function updateEffect(){

let text =
effectText.value;


text = text.replaceAll(
"\n",
"<br>"
);


effectDisplay.innerHTML =
text;

effectDisplay.style.fontSize =
effectSize.value + "px";

}


// =========================
// フレーバー
// =========================


function updateFlavor(){


flavorDisplay.textContent =
flavorText.value;


flavorDisplay.style.fontSize =
flavorSize.value + "px";


if(showFlavor.checked){

flavorDisplay.classList.remove(
"hidden"
);

flavorDivider.classList.remove(
"hidden"
);

}else{

flavorDisplay.classList.add(
"hidden"
);

flavorDivider.classList.add(
"hidden"
);

}


const fonts = {

mincho:
'"Yu Mincho",serif',

gothic:
'"Yu Gothic",sans-serif',

serif:
'Georgia,serif'

};


flavorDisplay.style.fontFamily =
fonts[flavorFont.value];


}



// =========================
// 星
// =========================


function updateStars(){

stars.innerHTML = "";


const count =
Number(starCount.value);


for(let i=0;i<count;i++){

const star =
document.createElement("span");


star.className =
"star";


if(count === 5){

star.classList.add("five");

}


star.textContent = "★";


stars.appendChild(star);


}

}



// =========================
// レアリティ
// =========================


function updateRarity(){

rarityDisplay.className =
"rarity";


if(!rarity.value){

rarityDisplay.textContent="";
return;

}


rarityDisplay.textContent =
rarity.value;


rarityDisplay.classList.add(
rarity.value.toLowerCase()
);


}



// =========================
// ホロ
// =========================


function updateHolo(){

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



// =========================
// フレーム変更
// =========================


function updateFrameList(){

frameSelect.innerHTML = "";


frameData[
frameCategory.value
].forEach(frame=>{


const option =
document.createElement("option");


option.value =
frame[0];


option.textContent =
frame[1];


frameSelect.appendChild(option);


});


changeFrame();

}


function changeFrame(){

card.className =
"card frame-" +
frameSelect.value;


}
