# Portfolio de Jonathan Ruiz

Web estática (HTML, CSS y JavaScript, sin dependencias). Ábrela con doble clic en `index.html`
o súbela a GitHub Pages, Netlify o Hostinger.

## Dónde poner imágenes y vídeos

    src/
      img/    capturas de los proyectos (.png o .jpg)
      video/  vídeos de demostración (.mp4)
      cv/     tu CV en PDF

Nombres que espera el código ahora mismo (puedes cambiarlos en `script.js`):

- Aura, WoWElemental y Duckstore (ya incluidas): `aura-*.webp`, `wowelemental-*.webp`, `duckstore-*.webp`, `bis-tracker-*.webp`, `knekro-bot.webp` y sus miniaturas `-thumb.webp`
- Otras imágenes: `streamer-bot.png`
- Vídeo: `aura-demo.mp4`

La imagen `aura-inicio.webp` también se muestra en la portada.

## Cómo añadir un vídeo a otro proyecto

1. Guarda el vídeo en `src/video/`, por ejemplo `wowelemental-demo.mp4`.
2. En `index.html`, dentro del `<div class="shot">` de ese proyecto, añade debajo de la imagen:

       <button class="play" type="button" data-video="src/video/wowelemental-demo.mp4" aria-label="Ver vídeo de demostración de WoWElemental">Ver demo</button>

Consejo: usa .mp4 (H.264) y pesos bajos (menos de 20 MB) para que cargue rápido.

## Cómo añadir un proyecto nuevo

En `index.html`, copia un bloque `<article class="project"> ... </article>` de la sección Proyectos y cambia
sus textos, el nombre de la imagen y los enlaces. Cuando subas Streamer-BOT a GitHub, añade su enlace
con `<p class="links"><a href="..." target="_blank" rel="noopener">Código en GitHub</a></p>`.

## Cambios técnicos

- Todo el contenido está en HTML (visible sin JavaScript y legible para buscadores).
- `script.js` solo gestiona la ventana de vídeo y las imágenes que faltan.
- Imágenes con `loading="lazy"` (la de portada con prioridad), tamaños declarados y script con `defer`.

## Portada y modo oscuro

- El carrusel de la portada usa la primera imagen de cada proyecto. Las capturas que aún no existen se
  quitan solas del carrusel, así que se irá completando según añadas imágenes.
- El botón "Modo oscuro" de la cabecera recuerda tu elección; la primera vez sigue el tema del sistema.
- El carrusel se detiene al pasar el ratón o al usar el teclado, y no avanza solo si el sistema pide menos animaciones.
