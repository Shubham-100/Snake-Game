// Initializes the drawing canvas
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// all the constants
const FPS = 12;
const tile = 30;
const tileSize = canvas.width / tile; // 600/30 = 20

// SCORE
let score = 0;
let gameOver = false;

// SNAKE
let sx = 0;
let sy = 0;
let delta = 20;
let xspeed = 0;
let yspeed = 0;
let tail = 2;
const snakeParts = [];

let gameStarted = false;

// FOOD
let fx = tileSize * Math.floor(Math.random() * tile);
let fy = tileSize * Math.floor(Math.random() * tile);

class snakePart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

// driver function, start of the program
main();

// driver function, start of the program
function main() {
  fillBackground("black");
  if (!gameOver) {
    changeCoordinates();
    drawScore();
    drawFood("red");
    drawSnake("green");
    detectCollision();
    detectGameOver();
    setTimeout(main, 1000 / FPS);
  } else {
    ctx.fillStyle = "white";
    ctx.font = "20px verdana";
    ctx.fillText("GAME OVER!!!", canvas.width / 2 - 50, canvas.width / 2);
    ctx.fillText(
      "Your score: " + score,
      canvas.width / 2 - 50,
      canvas.width / 2 + 20
    );
  }
}

// add event listener
document.addEventListener("keydown", keyDown);

function detectGameOver() {
  if (sx < 0 || sx > canvas.width || sy < 0 || sy > canvas.height) {
    gameOver = true;
  }

  if (gameStarted) {
    for (let i = 0; i < snakeParts.length; i++) {
      let part = snakeParts[i];
      if (part.x == sx && part.y == sy) {
        gameOver = true;
        break;
      }
    }
  }
}

function keyDown(event) {
  if (event.keyCode == 37) {
    if (xspeed == 1) return;
    // LEFT
    xspeed = -delta;
    yspeed = 0;
  } else if (event.keyCode == 38 && yspeed != 1) {
    // UP
    xspeed = 0;
    yspeed = -delta;
  } else if (event.keyCode == 39 && xspeed != -1) {
    // RIGHT
    xspeed = delta;
    yspeed = 0;
  } else if (event.keyCode == 40 && yspeed != -1) {
    // DOWN
    xspeed = 0;
    yspeed = delta;
  } else if (event.keyCode == 32 && gameOver == true) {
    gameOver = false;
  }
}

function changeCoordinates() {
  sx += xspeed;
  sy += yspeed;
}

function fillBackground(color) {
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake(color) {
  ctx.fillStyle = color;

  for (let i = 0; i < snakeParts.length; i++) {
    let part = snakeParts[i];
    ctx.fillRect(part.x, part.y, tileSize, tileSize);
  }

  snakeParts.push(new snakePart(sx, sy));
  if (snakeParts.length > tail) {
    snakeParts.shift();
  }

  // head
  ctx.fillStyle = "orange";
  ctx.fillRect(sx, sy, tileSize, tileSize);
}

function drawFood(color) {
  ctx.fillStyle = color;
  ctx.fillRect(fx, fy, tileSize, tileSize);
}

function detectCollision() {
  if (fx == sx && fy == sy) {
    fx = tileSize * Math.floor(Math.random() * tile);
    fy = tileSize * Math.floor(Math.random() * tile);
    score++;
    tail++;
  }
}

function drawScore() {
  ctx.fillStyle = "white";
  ctx.font = "20px verdana";
  ctx.fillText(score, canvas.width - 25, 25);
}
