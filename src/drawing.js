const canvas = document.getElementById("canvas");
const increaseBtn = document.getElementById("increase");
const decreaseBtn = document.getElementById("decrease");
const sizeElement = document.getElementById("size");
const colorElement = document.getElementById("color");
const clearBtn = document.getElementById("clear");
const context = canvas.getContext("2d");

let size = 10; // 初始画笔大小
let isPressed = false;
let color = colorElement.value; // 当前颜色

// 更新颜色
colorElement.addEventListener("input", (e) => {
  color = e.target.value;
});

// 增加画笔大小
increaseBtn.addEventListener("click", () => {
  size = Math.min(size + 1, 50); // 最大设置为50
  sizeElement.textContent = size; // 更新显示的大小
});

// 减小画笔大小
decreaseBtn.addEventListener("click", () => {
  size = Math.max(size - 1, 1); // 最小设置为1
  sizeElement.textContent = size; // 更新显示的大小
});

let x;
let y;

canvas.addEventListener("mousedown", (e) => {
  const rect = canvas.getBoundingClientRect();
  x = e.clientX - rect.left;
  y = e.clientY - rect.top;
  isPressed = true;
});

canvas.addEventListener("mouseup", () => {
  isPressed = false;
  x = undefined;
  y = undefined;
});

canvas.addEventListener("mousemove", (e) => {
  if (isPressed) {
    const rect = canvas.getBoundingClientRect();
    const x2 = e.clientX - rect.left;
    const y2 = e.clientY - rect.top;

    drawCircle(x2, y2); // 画圆
    drawLine(x, y, x2, y2); // 画线

    x = x2;
    y = y2;
  }
});

// 画圆
function drawCircle(x, y) {
  context.beginPath();
  context.arc(x, y, size / 2, 0, Math.PI * 2);
  context.fillStyle = color; // 使用当前颜色
  context.fill();
}

// 划线
function drawLine(x1, y1, x2, y2) {
  context.beginPath();
  context.moveTo(x1, y1);

  context.lineTo(x2, y2);
  context.strokeStyle = color; // 使用当前颜色
  context.lineWidth = size; // 使用当前画笔大小
  context.stroke();
}

// 清空画布
clearBtn.addEventListener("click", () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
});
// 清空画布
clearBtn.addEventListener("click", () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
});

// 处理键盘事件
window.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    // 空格键
    context.clearRect(0, 0, canvas.width, canvas.height); // 清空画布
  }

  if (e.code === "ArrowUp") {
    // 上箭头键
    size = Math.min(size + 1, 50); // 最大设置为50
    sizeElement.textContent = size; // 更新显示的大小
  }

  if (e.code === "ArrowDown") {
    // 下箭头键
    size = Math.max(size - 1, 1); // 最小设置为1
    sizeElement.textContent = size; // 更新显示的大小
  }
  if (e.code === "KeyS") {
    // S键
    drawSquare(x, y); // 在当前位置画正方形
  }
});
function drawSquare(x, y) {
  context.fillStyle = color; // 使用当前颜色
  context.fillRect(x - size / 2, y - size / 2, size, size); // 画正方形，中心在 (x, y)
}
