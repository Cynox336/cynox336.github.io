"use strict";

/* Imágenes que no existen: se muestra un marco con el nombre del archivo que falta. */
document.querySelectorAll(".project .shot img").forEach(img => {
  const markEmpty = () => { img.parentElement.classList.add("empty"); img.hidden = true; };
  img.addEventListener("error", markEmpty);
  if (img.complete && img.naturalWidth === 0) markEmpty();
});

/* Vídeo de demostración en una ventana (dialog nativo). */
const dialog = document.getElementById("demo");
const video = document.getElementById("demo-video");
const error = document.getElementById("demo-error");

function openDemo(src) {
  error.hidden = true;
  video.hidden = false;
  video.src = src;
  dialog.showModal();
  video.play().catch(() => {});
}

video.addEventListener("error", () => { video.hidden = true; error.hidden = false; });

document.addEventListener("click", event => {
  const trigger = event.target.closest("[data-video]");
  if (trigger) openDemo(trigger.dataset.video);
});

dialog.querySelector(".close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => { if (event.target === dialog) dialog.close(); });
dialog.addEventListener("close", () => {
  video.pause();
  video.removeAttribute("src");
  video.load();
});

/* Galería de capturas: al pulsar una miniatura se cambia la imagen principal. */
document.querySelectorAll(".thumb").forEach(thumb => {
  thumb.addEventListener("click", () => {
    const project = thumb.closest(".project");
    const main = project.querySelector(".shot img");
    main.hidden = false;
    main.parentElement.classList.remove("empty");
    main.src = thumb.dataset.full;
    main.alt = thumb.dataset.alt;
    project.querySelectorAll(".thumb").forEach(t => t.setAttribute("aria-pressed", String(t === thumb)));
  });
});

/* Modo oscuro: se recuerda la elección y por defecto sigue al sistema. */
const root = document.documentElement;
const themeButton = document.getElementById("theme-toggle");
const themeMeta = document.querySelector('meta[name="theme-color"]');

function applyTheme(theme) {
  root.dataset.theme = theme;
  themeButton.textContent = theme === "dark" ? "Modo claro" : "Modo oscuro";
  if (themeMeta) themeMeta.content = theme === "dark" ? "#0E1524" : "#14284B";
}
applyTheme(root.dataset.theme || "light");
themeButton.addEventListener("click", () => {
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(next);
  try { localStorage.setItem("tema", next); } catch (e) { /* sin almacenamiento */ }
});

/* Carrusel de portada: avance automático con pausa, botones, puntos y teclado. */
const carousel = document.querySelector(".carousel");
if (carousel) {
  const slidesBox = carousel.querySelector(".slides");
  const controls = carousel.querySelector(".controls");
  const dots = carousel.querySelector(".dots");
  const pauseButton = carousel.querySelector(".pause");
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let slides = [...carousel.querySelectorAll(".slide")];
  let index = 0;
  let playing = !reduceMotion;
  let timer = null;

  function render() {
    slides.forEach((slide, i) => {
      const active = i === index;
      slide.classList.toggle("is-active", active);
      slide.setAttribute("aria-hidden", String(!active));
      slide.setAttribute("aria-label", `${i + 1} de ${slides.length}`);
    });
    [...dots.children].forEach((dot, i) => dot.setAttribute("aria-current", String(i === index)));
    slidesBox.setAttribute("aria-live", playing ? "off" : "polite");
    pauseButton.textContent = playing ? "Pausar" : "Reproducir";
    pauseButton.setAttribute("aria-pressed", String(!playing));
  }
  function buildDots() {
    dots.replaceChildren(...slides.map((_, i) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.setAttribute("aria-label", `Ir a la captura ${i + 1}`);
      dot.addEventListener("click", () => { go(i); });
      return dot;
    }));
    controls.hidden = slides.length < 2;
  }
  function go(i) { index = (i + slides.length) % slides.length; render(); schedule(); }
  function schedule() {
    clearInterval(timer);
    if (playing && slides.length > 1) timer = setInterval(() => go(index + 1), 5000);
  }

  /* Si una captura no existe todavía, se quita del carrusel (la última queda como marco vacío). */
  function dropIfBroken(slide) {
    if (slides.length < 2) {
      const shot = slide.querySelector(".shot");
      shot.dataset.hint = "Añade " + shot.querySelector("img").getAttribute("src");
      shot.classList.add("empty");
      shot.querySelector("img").hidden = true;
      return;
    }
    slides = slides.filter(s => s !== slide);
    slide.remove();
    index = Math.min(index, slides.length - 1);
    buildDots(); render(); schedule();
  }
  [...slides].forEach(slide => {
    const img = slide.querySelector("img");
    img.addEventListener("error", () => dropIfBroken(slide));
    if (img.complete && img.naturalWidth === 0) dropIfBroken(slide);
  });

  carousel.querySelector(".prev").addEventListener("click", () => go(index - 1));
  carousel.querySelector(".next").addEventListener("click", () => go(index + 1));
  pauseButton.addEventListener("click", () => { playing = !playing; render(); schedule(); });
  carousel.addEventListener("mouseenter", () => clearInterval(timer));
  carousel.addEventListener("mouseleave", schedule);
  carousel.addEventListener("focusin", () => clearInterval(timer));
  carousel.addEventListener("focusout", schedule);
  carousel.addEventListener("keydown", e => {
    if (e.key === "ArrowLeft") go(index - 1);
    if (e.key === "ArrowRight") go(index + 1);
  });

  buildDots(); render(); schedule();
}
