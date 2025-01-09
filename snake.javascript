const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const boxSize = 20;
const canvasSize = 400;
const rows = canvasSize / boxSize;
const cols = canvasSize / boxSize;

let snake = [{ x: 5, y: 5 }];
let direction = { x: 1, y: 0 };
let food = { x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows) };
let score = 0;

function drawBox(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x * boxSize, y * boxSize, boxSize, boxSize);
}

function drawSnake() {
  snake.forEach(segment => drawBox(segment.x, segment.y, "lime"));
}

function drawFood() {
  drawBox(food.x, food.y, "red");
}

function moveSnake() {
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

  // Check collision with walls or itself
  if (
    head.x < 0 || head.x >= cols || 
    head.y < 0 || head.y >= rows || 
    snake.some(segment => segment.x === head.x && segment.y === head.y)
  ) {
    alert(`Game Over! Your score: ${score}`);
    resetGame();
    return;
  }

  snake.unshift(head);

  // Check collision with food
  if (head.x === food.x && head.y === food.y) {
    score++;
    food = { x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows) };
  } else {
    snake.pop(); // Remove the last segment
  }
}

function resetGame() {
  snake = [{ x: 5, y: 5 }];
  direction = { x: 1, y: 0 };
  food = { x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows) };
  score = 0;
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawSnake();
  drawFood();
  moveSnake();
}

function changeDirection(event) {
  const key = event.key;
  if (key === "ArrowUp" && direction.y === 0) direction = { x: 0, y: -1 };
  if (key === "ArrowDown" && direction.y === 0) direction = { x: 0, y: 1 };
  if (key === "ArrowLeft" && direction.x === 0) direction = { x: -1, y: 0 };
  if (key === "ArrowRight" && direction.x === 0) direction = { x: 1, y: 0 };
}

document.addEventListener("keydown", changeDirection);

setInterval(update, 100);
