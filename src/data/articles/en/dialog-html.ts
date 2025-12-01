import type { Article } from "../../articles";

const article: Article = {
  locale: "en",
  slug: "dialog-html",
  title: "The power of <dialog>: native modals made simple",
  excerpt:
    "Learn how to use the <dialog> element with no external libraries — accessible, native patterns for modals, confirmations, and system messages.",
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
        "The &lt;dialog&gt; element has quietly become one of the most useful tools in front-end development. It's native, stable, and solves many everyday headaches: it manages focus, creates its own backdrop, and gives you simple methods like show(), showModal(), and close(). Less code, fewer dependencies, and smoother UX.",
    },
    {
      kind: "p",
      text:
        "From an accessibility standpoint, &lt;dialog&gt; handles a lot for you, but it still needs some care: provide a clear title (visible or with aria-label), keep a logical tab order, return focus to the trigger element, and prevent background interaction. Custom overlays often break one of these behaviors.",
    },

    {
      kind: "list",
      items: [
        "**Accessible modal** — `showModal()` blocks the background; focus the first relevant control or use `autofocus`.",
        "**Non-modal** — `show()` keeps the background accessible — great for banners, notifications, or inline prompts.",
        "**Effortless confirmations** — with `method=\"dialog\"`, buttons close the dialog and return a `returnValue` automatically.",
      ],
    },

    {
      kind: "note",
      text:
        "Quick tip: forms using `method=\"dialog\"` are perfect for confirmations or short messages. They close the dialog automatically and expose which button was pressed.",
    },
    {
      kind: "code",
      language: "html",
      text: `<dialog id="confirm">
  <form method="dialog" class="stack">
    <h1 class="title">Confirm delete</h1>
    <p>Are you sure you want to delete this item?</p>
    <menu class="row">
      <button value="cancel">Cancel</button>
      <button value="confirm" autofocus>Confirm</button>
    </menu>
  </form>
</dialog>

<button type="button" id="open">Open</button>
<script>
  const dlg = document.getElementById('confirm');
  open.addEventListener('click', () => dlg.showModal());
  dlg.addEventListener('close', () => {
    if (dlg.returnValue === 'confirm') {
      // Perform action
    }
    open.focus(); // Return focus to the trigger
  });
</script>`,
    },

    {
      kind: "note",
      text:
        "Styling tips: `:modal` only applies when the dialog is in modal mode, and `::backdrop` lets you darken or blur the background without extra markup.",
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
        "Want smooth open/close animations with zero JavaScript? Use the `open` attribute — CSS transitions will handle the rest.",
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
        "If the page scrolls when your modal opens, you can lock the body scroll easily with the new :has() selector.",
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
        "To prevent accidental closes: cancel the 'cancel' event (ESC) only if you provide a clear, visible way to exit. And if you don’t want clicks on the backdrop to close the dialog, check whether the event target is the dialog itself before closing.",
    },
    {
      kind: "code",
      language: "html",
      text: `<dialog id="edit">
  <!-- content -->
</dialog>
<script>
  const edit = document.getElementById('edit');

  edit.addEventListener('cancel', (e) => {
    e.preventDefault(); // Prevent closing with ESC if there's no visible exit
  });

  edit.addEventListener('pointerdown', (e) => {
    if (e.target === edit) edit.close('backdrop');
  });
</script>`,
    },

    {
      kind: "list",
      items: [
        "**Top layer** — modals opened with `showModal()` live in the browser’s top layer — `z-index` doesn’t apply there. If overlapping, reopening brings it to the front.",
        "**Initial focus** — use `autofocus` for the obvious first control, or manage focus manually on open/close.",
        "**Accessible title** — use `aria-labelledby` to link the visible heading, or `aria-label` if no title exists.",
        "**No nesting** — dialogs can’t be nested. If you need multiple steps, reuse the same one or close before opening another.",
      ],
    },

    {
      kind: "p",
      text:
        "Quick checklist before shipping: 1) works fully with keyboard, 2) screen reader announces the title, 3) focus returns to the trigger, 4) background clicks have a clear alternative close option, and 5) scroll is locked if needed.",
    },
    {
      kind: "p",
      text:
        "Want to dive deeper? Check out the official reference and examples on <a href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog' target='_blank' rel='noopener noreferrer'>MDN Web Docs</a>.",
    },
  ],
  coverGradient: "from-indigo-500 via-sky-500 to-cyan-500",
  coverAlt: "Hero image",
};

export default article;
