import "./styles.css";

let playerState = "idle";
const dropdown = document.getElementById("animations");
dropdown.addEventListener("change", function (e) {
  playerState = e.target.value;
});

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
//console.log(ctx);

const CANVAS_WIDTH = (canvas.width = 600);
const CANVAS_HEIGHT = (canvas.height = 600);

const playerImage = new Image();
playerImage.src = "../assets/img/shadow_dog.png";
const spriteWidth = 575;
const spriteHeight = 523;

//let playerState = "roll";

//let frameX = 0;
//let frameY = 0;
let gameFrame = 0;
const staggerFrame = 5;
const spriteAnimations = [];

const animationStates = [
  {
    name: "idle",
    frames: 7
  },
  {
    name: "jump",
    frames: 7
  },
  {
    name: "fall",
    frames: 7
  },
  {
    name: "run",
    frames: 9
  },
  {
    name: "dizzy",
    frames: 11
  },
  {
    name: "sit",
    frames: 5
  },
  {
    name: "roll",
    frames: 7
  },
  {
    name: "bite",
    frames: 7
  },
  {
    name: "ko",
    frames: 12
  },
  {
    name: "getHit",
    frames: 4
  }
];

// 자료구조를 생성하는 이 코드가 project1의 핵심
animationStates.forEach((state, index) => {
  let f = {
    loc: []
  };
  for (let j = 0; j < state.frames; j++) {
    let positionX = j * spriteWidth;
    let positionY = index * spriteHeight;
    f.loc.push({ x: positionX, y: positionY });
  }
  //console.log(f);
  spriteAnimations[state.name] = f;
});

//console에서 얘는 아무것도 보여주지 않음
//console.log(spriteAnimations);

// 다행히 얘는 정상적으로 출력됨
//console.log(spriteAnimations["idle"].loc);

//let x = 0;

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  //ctx.fillRect(50, 50, 100, 100);
  //ctx.fillRect(x, 50, 100, 100)
  //x++;

  //let position = Math.floor(gameFrame / staggerFrame) % 6;
  // 0/5 = 0    Math.floor(0) = 0
  // 1/5 = 0.2  Math.floor(0.2) = 0
  // 2/5 = 0.4  Math.floor(0.4) = 0
  // 3/5 = 0.6  Math.floor(0.6) = 0
  // 4/5 = 0.8  Math.floor(0.8) = 0
  // 5/5 = 1    Math.floor(1) = 1    1 % 6 = 1
  //                                 2 % 6 = 2
  //                                 3 % 6 = 3
  //                                 4 % 6 = 4
  //                                 5 % 6 = 5
  //                                 6 % 6 = 0
  //                                 7 % 6 = 1
  //                                 8 % 6 = 2
  //                                 9 % 6 = 3
  //                                 10 % 6 = 4

  let position =
    Math.floor(gameFrame / staggerFrame) %
    spriteAnimations[playerState].loc.length;

  let frameX = spriteWidth * position;
  let frameY = spriteAnimations[playerState].loc[position].y;

  //ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
  ctx.drawImage(
    playerImage,
    frameX,
    frameY,
    spriteWidth,
    spriteHeight,
    0,
    0,
    spriteWidth,
    spriteHeight
  );

  /*
  if (gameFrame % staggerFrame == 0) {
   if (frameX < 6) frameX++
   else frameX = 0;
  }
  */

  gameFrame++;
  requestAnimationFrame(animate);
}

animate();
