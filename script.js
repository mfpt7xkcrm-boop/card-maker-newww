// =====================
// 要素取得
// =====================

const card = document.getElementById("card");

const cardName = document.getElementById("cardName");
const cardNameDisplay = document.getElementById("cardNameDisplay");

const nameSize = document.getElementById("nameSize");
const nameColor = document.getElementById("nameColor");

const cardNumber = document.getElementById("cardNumber");
const numberDisplay = document.getElementById("numberDisplay");

const creator = document.getElementById("creator");
const creatorDisplay = document.getElementById("creatorDisplay");

const effectText = document.getElementById("effectText");
const effectDisplay = document.getElementById("effectDisplay");

const flavorText = document.getElementById("flavorText");
const flavorDisplay = document.getElementById("flavorDisplay");

const effectSize = document.getElementById("effectSize");

const stars = document.getElementById("stars");
const starCount = document.getElementById("starCount");

const rarity = document.getElementById("rarity");
const rarityDisplay = document.getElementById("rarityDisplay");

const holo = document.getElementById("holo");
const holoLayer = document.getElementById("holoLayer");

const frameSelect = document.getElementById("frameSelect");
const frameCategory = document.getElementById("frameCategory");

// =====================
// フレーム一覧
// =====================

const frameData = {

    basic: [

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

// =====================
// フレーム読込
// =====================

function loadFrames(){

    frameSelect.innerHTML="";

    frameData[
        frameCategory.value
    ].forEach(frame=>{

        const option =
        document.createElement("option");

        option.value = frame[0];
        option.textContent = frame[1];

        frameSelect.appendChild(option);

    });

}

loadFrames();

frameCategory.addEventListener(
"change",
loadFrames
);

// =====================
// カード名
// =====================

cardName.addEventListener(
"input",
()=>{
    cardNameDisplay.textContent =
    cardName.value || "カード名";
}
);

// =====================
// 名前サイズ
// =====================

nameSize.addEventListener(
"input",
()=>{
    cardNameDisplay.style.fontSize =
    nameSize.value + "px";
}
);

// =====================
// 名前色
// =====================

nameColor.addEventListener(
"input",
()=>{
    cardNameDisplay.style.color =
    nameColor.value;
}
);

// =====================
// カード番号
// =====================

cardNumber.addEventListener(
"input",
()=>{
    numberDisplay.textContent =
    cardNumber.value;
}
);

// =====================
// 作者
// =====================

creator.addEventListener(
"input",
()=>{
    creatorDisplay.textContent =
    creator.value;
}
);

// =====================
// 説明文
// =====================

effectText.addEventListener(
"input",
()=>{
    effectDisplay.textContent =
    effectText.value;
}
);

// =====================
// フレーバー
// =====================

flavorText.addEventListener(
"input",
()=>{
    flavorDisplay.textContent =
    flavorText.value;
}
);

// =====================
// 説明サイズ
// =====================

effectSize.addEventListener(
"input",
()=>{
    effectDisplay.style.fontSize =
    effectSize.value + "px";
}
);

// =====================
// 星
// =====================

function updateStars(){

    stars.innerHTML="";

    const count =
    Number(starCount.value);

    for(let i=0;i<count;i++){

        const span =
        document.createElement("span");

        span.textContent = "⭐";

        if(count===5){

            span.classList.add(
            "rainbow-star"
            );

        }

        stars.appendChild(span);

    }

}

updateStars();

starCount.addEventListener(
"input",
updateStars
);

// =====================
// レアリティ
// =====================

rarity.addEventListener(
"change",
()=>{

    rarityDisplay.textContent =
    rarity.value;

    rarityDisplay.className =
    "rarity";

    const value =
    rarity.value.toLowerCase();

    if(value){

        rarityDisplay.classList.add(
        value
        );

    }

}
);

// =====================
// ホログラム
// =====================

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

// =====================
// フレーム変更
// =====================

frameSelect.addEventListener(
"change",
()=>{

    card.className =
    "card frame-" +
    frameSelect.value;

}
);

// =====================
// タブ切替
// =====================

document
.querySelectorAll(".bottom-nav button")
.forEach(button=>{

    button.addEventListener(
    "click",
    ()=>{

        document
        .querySelectorAll(".panel")
        .forEach(panel=>{

            panel.classList.remove(
            "active"
            );

        });

        document
        .getElementById(
        "panel-" +
        button.dataset.panel
        )
        .classList.add(
        "active"
        );

    });

});
