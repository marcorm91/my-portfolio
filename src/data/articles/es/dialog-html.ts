import type { Article } from "../../articles";

const article: Article = {
  locale: "es",
  slug: "dialog-html",
  title: "El poder del <dialog>: modales nativos sin complicaciones",
  excerpt:
    "Aprende a usar el elemento <dialog> sin librerías externas: patrones accesibles listos para modales, confirmaciones y avisos del sistema.",
  date: "2025-12-01",
  minutes: 9,
  tags: ["HTML", "A11y", "UI patterns", "dialog"],
  collaborator: {
    name: "Marco Romero",
    linkedin: "https://www.linkedin.com/in/marcorm91/",
    avatar: "/assets/images/profile.png",
  },
  coverImage:
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI0MDAiIHZpZXdCb3g9IjAgMCAxMjAwIDQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwIiB5MT0iMCIgeDI9IjEiIHkyPSIxIj4KICAgIDxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iIzIxODhmZiIvPgogICAgPHN0b3Agb2Zmc2V0PSIwLjUiIHN0b3AtY29sb3I9IiMzN2RiZmYiLz4KICAgIDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzBlMDM2ZCIvPgogIDwvbGluZWFyR3JhZGllbnQ+CiAgPHJlY3Qgd2lkdGg9IjEyMDAiIGhlaWdodD0iNDAwIiBmaWxsPSJ1cmwoI2cpIi8+CiAgPGNpcmNsZSBjeD0iMTkwIiBjeT0iOTUiIHI9IjgwIiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMTIiIC8+CiAgPGNpcmNsZSBjeD0iMTAwMCIgY3k9IjMwMCIgcj0iMTIwIiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDgiIC8+Cjwvc3ZnPg==",
  content: [
    {
      kind: "p",
      text:
        "El elemento &lt;dialog&gt; se ha convertido en un pequeño gran aliado del front. Es nativo, estable y resuelve un montón de problemas habituales: gestiona el foco, genera su propio fondo (backdrop) y te da métodos tan simples como show(), showModal() y close(). En resumen: menos código, menos dependencias y una UX más fluida.",
    },
    {
      kind: "p",
      text:
        "Desde el punto de vista de la accesibilidad, el &lt;dialog&gt; hace gran parte del trabajo por ti, pero sigue habiendo que cuidar los detalles: un título anunciado (visible o con aria-label), orden de tabulación lógico, devolver el foco al disparador y evitar que se interactúe con el fondo. Los overlays caseros suelen fallar en alguno de estos puntos.",
    },

    {
      kind: "list",
      items: [
        "**Modal accesible** → con `showModal()` el fondo queda bloqueado; enfoca el primer control útil o usa `autofocus`.",
        "**No modal** → `show()` deja el fondo accesible, ideal para banners o notificaciones flotantes.",
        "**Confirmaciones sin complicarte** → con `method=\"dialog\"`, los botones cierran el modal y devuelven un `returnValue` sin eventos extra.",
      ],
    },

    {
      kind: "note",
      text:
        "Tip rápido: los formularios con `method=\"dialog\"` son geniales para confirmaciones o avisos cortos. Cierran el modal automáticamente y te devuelven el valor del botón pulsado.",
    },
    {
      kind: "code",
      language: "html",
      text: `<dialog id="confirm">
  <form method="dialog" class="stack">
    <h1 class="title">Confirmar borrado</h1>
    <p>¿Seguro que quieres borrar este elemento?</p>
    <menu class="row">
      <button value="cancel">Cancelar</button>
      <button value="confirm" autofocus>Aceptar</button>
    </menu>
  </form>
</dialog>

<button type="button" id="open">Abrir</button>
<script>
  const dlg = document.getElementById('confirm');
  open.addEventListener('click', () => dlg.showModal());
  dlg.addEventListener('close', () => {
    if (dlg.returnValue === 'confirm') {
      // Ejecutar acción
    }
    open.focus(); // Devuelve el foco al disparador
  });
</script>`,
    },

    {
      kind: "note",
      text:
        "Para estilos: `:modal` aplica solo cuando el diálogo está en modo modal; `::backdrop` te da un fondo oscurecido sin necesidad de crear overlays adicionales.",
    },
    {
      kind: "code",
      language: "css",
      text: `dialog:modal {
  border: 0;
  border-radius: 12px;
  max-width: min(640px, 90vw);
  padding: 1.25rem;
  box-shadow: 0 10px 30px rgb(0 0 0 / 0.25);
}

dialog::backdrop {
  background: rgb(0 0 0 / 0.55);
  backdrop-filter: blur(2px);
}`,
    },

    {
      kind: "p",
      text:
        "¿Quieres animaciones suaves sin JavaScript? Aprovecha el atributo `open`. Puedes definir una transición sencilla con CSS que se dispare automáticamente al abrir o cerrar.",
    },
    {
      kind: "code",
      language: "css",
      text: `dialog {
  opacity: 0;
  transform: translateY(8px) scale(.98);
  transition: opacity .16s ease, transform .16s ease;
}
dialog[open] {
  opacity: 1;
  transform: translateY(0) scale(1);
}`,
    },

    {
      kind: "note",
      text:
        "Si te molesta que el fondo se mueva al abrir el modal, puedes bloquear el scroll del body fácilmente con :has().",
    },
    {
      kind: "code",
      language: "css",
      text: `body:has(dialog[open]) {
  overflow: hidden;
}`,
    },

    {
      kind: "note",
      text:
        "Para evitar cierres accidentales: cancela el evento 'cancel' (ESC) solo si tienes un botón visible para salir. Y si no quieres que se cierre al hacer clic en el fondo, comprueba si el evento apunta al propio &lt;dialog&gt; antes de cerrar.",
    },
    {
      kind: "code",
      language: "html",
      text: `<dialog id="edit">
  <!-- contenido -->
</dialog>
<script>
  const edit = document.getElementById('edit');

  edit.addEventListener('cancel', (e) => {
    e.preventDefault(); // Evita cierre con ESC si no hay alternativa visible
  });

  edit.addEventListener('pointerdown', (e) => {
    if (e.target === edit) edit.close('backdrop');
  });
</script>`,
    },

    {
      kind: "list",
      items: [
        "**Top layer** → los diálogos modales viven en la capa superior del navegador. Olvídate del z-index: aquí no manda.",
        "**Foco inicial** → usa `autofocus` si el primer control es obvio; si no, gestiona tú el foco al abrir o cerrar.",
        "**Título accesible** → usa `aria-labelledby` para asociar el título visible, o `aria-label` si no hay uno claro.",
        "**Nada de anidar** → no puedes abrir un diálogo dentro de otro. Si necesitas varios pasos, reutiliza el mismo componente o cierra uno antes de abrir el siguiente.",
      ],
    },

    {
      kind: "p",
      text:
        "Pequeño checklist para acabar: 1) abre y cierra con teclado, 2) asegúrate de que el lector anuncia el título, 3) devuelve el foco al botón que lo lanzó, 4) si el fondo se puede clicar, ofrece otra forma de cerrar, 5) bloquea el scroll si el diseño lo necesita.",
    },
    {
      kind: "p",
      text:
        "Si quieres profundizar en la API y ver ejemplos oficiales, te dejo la referencia completa en <a href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog' target='_blank' rel='noopener noreferrer'>MDN Web Docs</a>.",
    },
  ],
  coverGradient: "from-indigo-500 via-sky-500 to-cyan-500",
  coverAlt: "Hero imagen",
};

export default article;
