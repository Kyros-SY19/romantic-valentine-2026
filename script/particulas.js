/* Corazones flotando en el fondo (versión más viva) */
const canvas = document.getElementById("particles-canvas");
const ctx = canvas.getContext("2d");

let hearts = [];
let isLightMode = false;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function createHeart() {
  return {
    x: Math.random() * canvas.width,
    y: canvas.height + Math.random() * 80,
    size: Math.random() * 10 + 8,
    speed: Math.random() * 3 + 3, // ⬅️ más rápido
    sway: Math.random() * 2 + 2, // ⬅️ más movimiento lateral
    phase: Math.random() * Math.PI * 2,
    opacity: Math.random() * 0.4 + 0.4,
  };
}

function drawHeart(x, y, size, opacity) {
  ctx.save();
  ctx.globalAlpha = opacity;
  ctx.fillStyle = "#f472b6";
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.bezierCurveTo(
    x - size,
    y - size,
    x - size * 1.4,
    y + size / 3,
    x,
    y + size,
  );
  ctx.bezierCurveTo(x + size * 1.4, y + size / 3, x + size, y - size, x, y);
  ctx.fill();
  ctx.restore();
}

function animateHearts() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // ⬇️ más densidad inicial
  if (hearts.length < 60) {
    hearts.push(createHeart());
  }

  hearts.forEach((h, i) => {
    h.y -= h.speed;
    h.x += Math.sin(h.phase) * h.sway * 0.4;
    h.phase += 0.04; // ⬅️ más movimiento orgánico

    drawHeart(h.x, h.y, h.size, h.opacity);

    if (h.y < -40) hearts.splice(i, 1);
  });

  requestAnimationFrame(animateHearts);
}

animateHearts();
