//parallax 3d con mouse//
const scene = document.querySelector(".scene");
const envelopeEl = document.querySelector(".envelope");

scene.addEventListener("mousemove", (e) => {
  const { innerWidth, innerHeight } = window;

  // Normalizamos la posición del mouse (-0.5 a 0.5)
  const x = e.clientX / innerWidth - 0.5;
  const y = e.clientY / innerHeight - 0.5;

  const rotateY = x * 16; // rotación horizontal
  const rotateX = -y * 12; // rotación vertical

  envelopeEl.style.transform = `
    rotateY(${rotateY}deg)
    rotateX(${rotateX}deg)
    translateY(${isOpen ? "-20px" : "0px"})
    scale(${isOpen ? "1.02" : "1"})
  `;
});

// Reset suave cuando el mouse sale
scene.addEventListener("mouseleave", () => {
  envelopeEl.style.transform = "rotateX(0deg) rotateY(0deg)";
});

//parallax 3d con giroscpio para el movil//
window.addEventListener("deviceorientation", (event) => {
  const { beta, gamma } = event;

  if (!beta || !gamma) return;

  const rotateX = Math.max(-15, Math.min(15, beta - 45)) * 0.2;
  const rotateY = Math.max(-15, Math.min(15, gamma)) * 0.5;

  envelopeEl.style.transform = `
    rotateX(${rotateX}deg)
    rotateY(${rotateY}deg)
    translateY(${isOpen ? "-20px" : "0px"})
    scale(${isOpen ? "1.02" : "1"})
  `;
});
