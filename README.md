# Jonathan Ruiz - Full Stack Developer Portfolio

Personal portfolio website built with clean, accessible, semantic HTML5, modern CSS, and vanilla JavaScript (no build step or external dependencies required). Designed to be hosted on GitHub Pages.

**Live site:** [cynox336.github.io](https://cynox336.github.io)

---

## 🚀 Overview

- **Lightweight & Fast:** Pure HTML, CSS, and vanilla JS with zero dependencies.
- **Responsive Design:** Optimized for mobile, tablet, and desktop screens with CSS Grid and Flexbox.
- **Dark Mode:** Supports automatic system preference (`prefers-color-scheme`) and manual toggle with `localStorage` persistence.
- **Accessibility (a11y):** ARIA landmarks, focus-visible states, keyboard-navigable carousel, and semantic markup.
- **Project Showcase:** Interactive image gallery and native `<dialog>` video modal for project demos.

---

## 📁 Project Structure

```text
portfolio/
├── index.html              # Main HTML document
├── styles.css              # Global styles and responsive layout
├── script.js               # Theme toggle, carousel, modal, and gallery logic
├── README.md               # Repository documentation
└── src/
    ├── cv/                 # Resume / CV PDF files
    ├── img/                # Project screenshots and thumbnails (.webp / .png)
    └── video/              # Demo video recordings (.mp4)
```

---

## 🖼️ Media & Asset Guidelines

- **Screenshots:** Placed in `src/img/`. Recommended format is `.webp` with `-thumb.webp` companion thumbnails for fast loading.
- **Demo Videos:** Placed in `src/video/` (e.g. `aura-demo.mp4`). Recommended codec is H.264 MP4 under 20 MB.
- **CV / Resume:** Stored in `src/cv/CV_Jonathan_Ruiz_Full_Stack_Junior.pdf`.

---

## 🛠️ Local Development

Simply open `index.html` in your browser, or run a lightweight local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (via npx serve)
npx serve
```

Then visit `http://localhost:8000`.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
