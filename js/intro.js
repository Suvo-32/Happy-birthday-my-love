const images = [
  "images/intro/1.jpeg",
  "images/intro/2.jpeg",
  "images/intro/3.jpeg",
  "images/intro/4.jpeg",
  "images/intro/5.jpeg",
  "images/intro/6.jpeg",
  "images/intro/7.jpeg",
  "images/intro/8.jpeg",
  "images/intro/9.jpeg",
  "images/intro/10.jpeg"
];

const container = document.querySelector(".intro-images");

/* CREATE INTRO IMAGES */
images.forEach((src, i) => {
  const img = document.createElement("img");
  img.src = src;

  img.style.top = Math.random() * 70 + "%";
  img.style.left = Math.random() * 70 + "%";
  img.style.setProperty("--fromX", `${Math.random() * 600 - 300}px`);
  img.style.setProperty("--fromY", `${Math.random() * 600 - 300}px`);
  img.style.setProperty("--delay", `${i * 0.18}s`);

  makeDraggable(img);
  container.appendChild(img);
});

/* DRAG + HEARTS */
function makeDraggable(el) {
  let dragging = false, offsetX = 0, offsetY = 0;

  el.addEventListener("mousedown", start);
  el.addEventListener("touchstart", start);

  function start(e) {
    dragging = true;
    const r = el.getBoundingClientRect();
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    const y = e.touches ? e.touches[0].clientY : e.clientY;
    offsetX = x - r.left;
    offsetY = y - r.top;

    document.addEventListener("mousemove", move);
    document.addEventListener("touchmove", move);
    document.addEventListener("mouseup", end);
    document.addEventListener("touchend", end);
  }

  function move(e) {
    if (!dragging) return;
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - offsetX;
    const y = (e.touches ? e.touches[0].clientY : e.clientY) - offsetY;
    el.style.left = x + "px";
    el.style.top = y + "px";
    createHeart(x + el.offsetWidth / 2, y);
  }

  function end() {
    dragging = false;
    document.removeEventListener("mousemove", move);
    document.removeEventListener("touchmove", move);
    document.removeEventListener("mouseup", end);
    document.removeEventListener("touchend", end);
  }
}

/* HEART */
function createHeart(x, y) {
  const h = document.createElement("div");
  h.className = "heart";
  h.innerHTML = "💜";
  h.style.left = x + "px";
  h.style.top = y + "px";
  document.body.appendChild(h);
  setTimeout(() => h.remove(), 1200);
}

/* CHAPTER REVEAL */
const chapters = document.querySelectorAll(".chapter");
window.addEventListener("scroll", () => {
  chapters.forEach(ch => {
    if (ch.getBoundingClientRect().top < window.innerHeight - 150) {
      ch.classList.add("show");
    }
  });
});

// ✨ SPARKLES ON IMAGE HOVER
document.querySelectorAll(".chapter-images img").forEach(img => {
  img.addEventListener("mousemove", e => {
    const sparkle = document.createElement("span");
    sparkle.innerHTML = "✨";
    sparkle.style.position = "absolute";
    sparkle.style.left = e.pageX + "px";
    sparkle.style.top = e.pageY + "px";
    sparkle.style.fontSize = "12px";
    sparkle.style.pointerEvents = "none";
    sparkle.style.animation = "sparkleFade 1s ease forwards";
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 1000);
  });
});

const revealSections = document.querySelectorAll(".chapter, .chapter-two");

window.addEventListener("scroll", () => {
  revealSections.forEach(sec => {
    if (sec.getBoundingClientRect().top < window.innerHeight - 150) {
      sec.classList.add("show");
    }
  });
});

/* =========================
   BIRTHDAY MAGIC
========================= */

const birthdayText = `
Today is not just your birthday…
It’s the day the universe decided
to gift the world my favorite soul.

You are my calm, my chaos,
my moon, my sunflower.

Happy Birthday, my love.
Forever yours ❤️
`;

const birthdaySection = document.getElementById("birthday");
const birthdayTextEl = document.getElementById("birthday-text");
let typed = false;

/* TYPEWRITER EFFECT */
function typeBirthdayText() {
  let i = 0;
  function type() {
    if (i < birthdayText.length) {
      birthdayTextEl.innerHTML += birthdayText.charAt(i);
      i++;
      setTimeout(type, 50);
    }
  }
  type();
}

/* SPARKLES GENERATOR */
function createSparkle() {
  const sparkle = document.createElement("div");
  sparkle.className = "sparkle";
  sparkle.innerHTML = "✨";
  sparkle.style.left = Math.random() * window.innerWidth + "px";
  sparkle.style.top = Math.random() * window.innerHeight + "px";
  document.body.appendChild(sparkle);
  setTimeout(() => sparkle.remove(), 1800);
}

/* TRIGGER ON SCROLL */
window.addEventListener("scroll", () => {
  const top = birthdaySection.getBoundingClientRect().top;

  if (top < window.innerHeight - 150 && !typed) {
    typed = true;
    typeBirthdayText();

    // Sparkles burst
    for (let i = 0; i < 40; i++) {
      setTimeout(createSparkle, i * 120);
    }
  }
});

