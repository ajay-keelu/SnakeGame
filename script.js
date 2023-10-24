let snakeMove = document.querySelectorAll(".snake-move");
let i = 0;
let row = [];
alert("use arrows for snake moves");
alert("click start  to start the game");
let curScoreEle = document.querySelector("#curScore");
let highestScore = document.querySelector("#highestScore");
var highScore = 0;
var curScore = 0;
let j = 0;
let snakeTable = [];
snakeMove.forEach((ele) => {
  ele.setAttribute("data-row", i);
  ele.setAttribute("data-col", j);
  row.push(ele);
  j++;
  if (j == 20) {
    snakeTable.push(row);
    row = [];
    i++;
    j = 0;
  }
});
let food = () => {
  let flag = true;
  while (flag) {
    foodi = Math.floor(Math.random() * 20);
    foodj = Math.floor(Math.random() * 20);
    for (let i = 0; i < snakeBody.length; i++) {
      let ele = snakeBody[i];
      if (ele[0] == foodi && ele[1] == foodj) {
        flag = true;
        break;
      } else {
        flag = false;
      }
    }
  }
  snakeMove.forEach((ele) => {
    if (
      ele.getAttribute("data-row") == foodi &&
      ele.getAttribute("data-col") == foodj
    ) {
      ele.classList.add("food");
    } else {
      if (ele.classList.contains("food")) ele.classList.remove("food");
    }
  });
};

snakeMove = Array.from(snakeMove);
//{
// snake body move
/**
 * dir 0 -> left   i--
 * dir 1 -> bottom j++
 * dir 2 -> right i++
 * dir 3 -> top j--
 */
let snakeBody = [[0, 0]];
var smiX = 0;
var smiY = 0;
var dir = 2;
var foodi;
var foodj;
let snakeChange = () => {
  if (smiX === foodi && smiY === foodj) {
    food();
    curScore++;
    if (highScore < curScore) highScore = curScore;
    curScoreEle.innerHTML = curScore;
    highestScore.innerHTML = highScore;
    snakeBody.push([
      snakeBody[snakeBody.length - 1][0],
      snakeBody[snakeBody.length - 1][1],
    ]);
  }
  snakeMove.forEach((ele) => {
    if (ele.classList.contains("s-head")) {
      ele.classList.remove("s-head");
    }
    if (ele.classList.contains("s-body")) {
      ele.classList.remove("s-body");
    }
  });
  for (let ind = snakeBody.length - 1; ind > 0; ind--) {
    snakeBody[ind][0] = snakeBody[ind - 1][0];
    snakeBody[ind][1] = snakeBody[ind - 1][1];
  }
  snakeBody[0][0] = smiX;
  snakeBody[0][1] = smiY;
  for (let i = 0; i < snakeBody.length; i++) {
    let ele = snakeBody[i];
    let rowele = document.querySelectorAll('[data-row="' + ele[0] + '"]');
    if (i === 0) {
      rowele.forEach((colele) => {
        if (colele.getAttribute("data-col") == ele[1])
          colele.classList.add("s-head");
      });
    } else {
      rowele.forEach((colele) => {
        if (colele.getAttribute("data-col") == ele[1])
          colele.classList.add("s-body");
      });
    }
  }
  //{
  for (let i = 1; i < snakeBody.length; i++) {
    if (
      snakeBody[0][0] === snakeBody[i][0] &&
      snakeBody[0][1] === snakeBody[i][1]
    ) {
      alert("gameOver");
      GameOver();
      snakeBody = [[0, 0]];
      smiX = 0;
      smiY = 0;
      dir = 2;
    }
  }
  //}
  if (dir == 2) {
    smiY++;
  } else if (dir == 3) {
    smiX--;
  } else if (dir == 0) {
    smiY--;
  } else {
    smiX++;
  }
  if (smiX < 0) {
    smiX = 19;
  }
  if (smiX >= 20) {
    smiX = 0;
  }
  if (smiY < 0) {
    smiY = 19;
  }
  if (smiY >= 20) {
    smiY = 0;
  }
};
// snakeChange();
let gameOn;
//{
let startGame = document.querySelector("#startGame");
let stopGame = document.querySelector("#stopGame");
let restart = document.querySelector("#restart");
startGame.addEventListener("click", () => {
  gameStart();
  curScoreEle.innerHTML = curScore;
});
stopGame.addEventListener("click", () => {
  GameOver();
});
restart.addEventListener("click", () => {
  GameOver();
  snakeBody = [[0, 0]];
  smiX = 0;
  smiY = 0;
  dir = 2;
  curScore = 0;
  curScoreEle.innerHTML = 0;
  gameStart();
});
//}

let gameStart = () => {
  GameOver();
  food();
  gameOn = setInterval(snakeChange, 150);
};

//} game Over
const GameOver = () => {
  clearInterval(gameOn);
  curScoreEle.innerHTML = curScore;
};
//}
/**
 * dir 0 -> left
 * dir 1 -> bottom
 * dir 2 -> right
 * dir 3 -> top
 */
document.querySelector("#top").addEventListener("click", () => {
  if (dir === 0 || dir === 2) dir = 3;
});
document.querySelector("#left").addEventListener("click", () => {
  if (dir === 1 || dir === 3) dir = 0;
});
document.querySelector("#right").addEventListener("click", () => {
  if (dir === 1 || dir === 3) dir = 2;
});
document.querySelector("#bottom").addEventListener("click", () => {
  if (dir === 0 || dir === 2) dir = 1;
});
document.addEventListener("keyup", (e) => {
  if (e.key === "ArrowDown") {
    if (dir === 0 || dir === 2) dir = 1;
  }
  if (e.key === "ArrowUp") {
    if (dir === 0 || dir === 2) dir = 3;
  }
  if (e.key === "ArrowLeft") {
    if (dir === 1 || dir === 3) dir = 0;
  }
  if (e.key === "ArrowRight") {
    if (dir === 1 || dir === 3) dir = 2;
  }
});

let mouse = document.querySelector(".mouse");
document.addEventListener("mousemove", (e) => {
  mouse.style.left = e.clientX + "px";
  mouse.style.top = e.clientY + "px";
  mouse.style.display = "block";
});
