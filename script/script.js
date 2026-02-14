/* Selectores del DOM */
const envelope = document.getElementById("envelope");
const typewriterEl = document.getElementById("typewriter");
const musicToggle = document.getElementById("musicToggle");
const backgroundMusic = document.getElementById("backgroundMusic");

//mensaje personalizado desde la url
const params = new URLSearchParams(window.location.search);

const nameFromUrl = params.get("name");
const fromFromUrl = params.get("from");

const name = nameFromUrl ? decodeURIComponent(nameFromUrl) : "Amor";
const from = fromFromUrl ? decodeURIComponent(fromFromUrl) : "alguien especial";

const messages = [
  `${name}, desde que llegaste a mi vida,
las cosas simples se volvieron mágicas
y los días normales se volvieron especiales.

Con cariño,
${from} ❤️`,

  `${name}, apareciste sin avisar,
y desde entonces el mundo
aprendió a latir distinto.

Con amor,
${from} ✨`,

  `${name}, llegaste
y sin darte cuenta
te volviste mi lugar favorito.

Con amor,
${from} ❤️`,
];

const message = messages[Math.floor(Math.random() * messages.length)];

//Ocultar formulario si se crea link  //
const formContainer = document.querySelector(".link-generator");

if (
  nameFromUrl &&
  fromFromUrl &&
  nameFromUrl.trim() !== "" &&
  fromFromUrl.trim() !== "" &&
  formContainer
) {
  formContainer.style.display = "none";
}

/* Estado de la UI */
let isOpen = false;
let isTyping = false;
let musicPlaying = false;

/* Efecto de máquina de escribir */
function typeWriter(text, element, speed = 100) {
  if (isTyping) return;

  isTyping = true;
  element.textContent = "";
  let index = 0;

  const interval = setInterval(() => {
    element.textContent += text.charAt(index);
    index++;

    if (index >= text.length) {
      clearInterval(interval);
      isTyping = false;
      launchHearts();

      // Pequeña vibración al terminar (feedback visual)
      envelope.animate(
        [
          { transform: "translateX(0px)" },
          { transform: "translateX(-2px)" },
          { transform: "translateX(2px)" },
          { transform: "translateX(0px)" },
        ],
        {
          duration: 300,
          easing: "ease-in-out",
        },
      );
    }
  }, speed);
}

/* Control de la música */
function playMusic() {
  if (!musicPlaying) {
    backgroundMusic.play().catch(() => {
      // Por si el navegador bloquea el autoplay
    });
    musicPlaying = true;
    musicToggle.textContent = "🔈 Música ON";
  }
}

function pauseMusic() {
  if (musicPlaying) {
    backgroundMusic.pause();
    musicPlaying = false;
    musicToggle.textContent = "🔊 Música OFF";
  }
}

/* Abrir / cerrar el sobre */
envelope.addEventListener("click", () => {
  isOpen = !isOpen;
  envelope.classList.toggle("open", isOpen);

  if (isOpen) {
    typeWriter(message, typewriterEl, 45);
    playMusic(); // suena al abrir
    sparkleBurst(); //  destellos al abrir
  } else {
    typewriterEl.textContent = "";
    pauseMusic(); // se pausa al cerrar
  }
});

/* Botón de música manual */
musicToggle.addEventListener("click", () => {
  if (!musicPlaying) {
    playMusic();
  } else {
    pauseMusic();
  }
});

/*sss */

const nameInput = document.getElementById("nameInput");
const fromInput = document.getElementById("fromInput");
const generateLinkBtn = document.getElementById("generateLink");
const resultLinkInput = document.getElementById("resultLink");
const copyLinkBtn = document.getElementById("copyLink");

generateLinkBtn.addEventListener("click", () => {
  const name = encodeURIComponent(nameInput.value.trim() || "Amor");
  const from = encodeURIComponent(fromInput.value.trim() || "alguien especial");

  const baseUrl = window.location.origin + window.location.pathname;
  const link = `${baseUrl}?name=${name}&from=${from}`;

  resultLinkInput.value = link;
});

copyLinkBtn.addEventListener("click", async () => {
  if (!resultLinkInput.value) return;

  try {
    await navigator.clipboard.writeText(resultLinkInput.value);
    copyLinkBtn.textContent = "Copiado ✅";
    setTimeout(() => {
      copyLinkBtn.textContent = "Copiar";
    }, 1500);
  } catch {
    alert("No se pudo copiar el link ");
  }
});
