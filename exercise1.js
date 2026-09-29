const canvas = document.getElementById("pixelCanvas");
const ctx = canvas.getContext("2d", { willReadFrequently: true });

// clear
ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);

function clearScreen(color) {
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function getPixel(x, y) {
  const [r, g, b] = ctx.getImageData(x, y, 1, 1).data;
  // match against the only colors drawPixel can produce, default to white
  if (r === 255 && g === 0 && b === 0) return "red";
  if (r === 0 && g === 128 && b === 0) return "green";
  if (r === 0 && g === 0 && b === 255) return "blue";
  return "black";
}

function checkPixel(x, y, expected, label) {
  let actual = getPixel(x, y)
  if (actual !== expected) console.error(`FAIL: ${label} -> expected "${expected}", got "${actual}"`);
}

function drawPixel(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, 1, 1);
}

function drawHorizontalLine(x, y, color) {
    drawPixel(x, y, color);
    drawPixel(x+1, y, color);
    drawPixel(x+2, y, color);
    drawPixel(x+3, y, color);
    drawPixel(x+4, y, color);
}

function drawVerticalLine(x, y, color) {
    drawPixel(x, y, color);
    drawPixel(x, y+1, color);
    drawPixel(x, y+2, color);
    drawPixel(x, y+3, color);
    drawPixel(x, y+4, color);
}

function drawCircle(x, y, color) {
    drawPixel(x, y-1, color);
    drawPixel(x-1, y-2, color);
    drawPixel(x-3, y-4, color);
    drawPixel(x-4, y-5, color); 
}

clearScreen("black");

// test code 
drawPixel(0,0,"red")
drawPixel(50,50,"green")
drawPixel(99,99,"blue")

checkPixel(0,0, "red", "checkPixel(0,0)")
checkPixel(1,1, "black", "checkPixel(1,1)")

// reset
clearScreen("black");
