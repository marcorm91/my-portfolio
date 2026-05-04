"use client";

import { useId, useState } from "react";

type DemoCopy = {
  modeLabel: string;
  normalLabel: string;
  reducedLabel: string;
  normalHint: string;
  reducedHint: string;
  cardTitle: string;
  cardBody: string;
  actionLabel: string;
  openLabel: string;
  closeLabel: string;
  panelLabel: string;
  modalTitle: string;
  modalBody: string;
  modalCaption: string;
  modalEyebrow: string;
  modalMeta: string;
  modalStatus: string;
  previewTitle: string;
  previewBody: string;
  previewNote: string;
  issueTitle: string;
  issueBody: string;
  alternativeTitle: string;
  alternativeBody: string;
};

const copyByLocale: Record<"es" | "en", DemoCopy> = {
  es: {
    modeLabel: "Modo de movimiento",
    normalLabel: "Normal",
    reducedLabel: "Reducido",
    normalHint: "Hover con desplazamiento y sombra amplia.",
    reducedHint: "Hover sin desplazamiento, con feedback más estable.",
    cardTitle: "Tarjeta interactiva",
    cardBody: "La jerarquía visual se mantiene, pero el recorrido desaparece cuando reduces movimiento.",
    actionLabel: "Abrir demo",
    openLabel: "Ver demo",
    closeLabel: "Cerrar",
    panelLabel: "Panel contextual",
    modalTitle: "Revisión rápida de accesibilidad",
    modalBody:
      "La versión reducida mantiene el cambio de estado y la jerarquía, pero sustituye el desplazamiento lateral por una aparición más directa.",
    modalCaption:
      "En lugar del modal genérico de siempre, aquí la comparación usa un panel contextual sobre una preview editorial.",
    modalEyebrow: "Accessibility review",
    modalMeta: "2 issues · 1 recommendation",
    modalStatus: "Needs review",
    previewTitle: "Landing hero refresh",
    previewBody:
      "Nueva propuesta visual con CTA principal, bloque editorial y un lateral con métricas de lectura.",
    previewNote:
      "Este patrón muestra mejor la diferencia entre entrada lateral y fade reducido sin parecer una maqueta genérica.",
    issueTitle: "Motion issue",
    issueBody:
      "La entrada lateral añade recorrido innecesario antes de que el contenido principal sea legible.",
    alternativeTitle: "Reduced alternative",
    alternativeBody:
      "Mantén la jerarquía, reduce el recorrido y deja que el cambio de estado haga el trabajo.",
  },
  en: {
    modeLabel: "Motion mode",
    normalLabel: "Normal",
    reducedLabel: "Reduced",
    normalHint: "Hover uses vertical travel and a larger shadow.",
    reducedHint: "Hover removes travel and keeps steadier feedback.",
    cardTitle: "Interactive card",
    cardBody: "The visual hierarchy stays intact, but the travel disappears when motion is reduced.",
    actionLabel: "Open demo",
    openLabel: "View demo",
    closeLabel: "Close",
    panelLabel: "Context panel",
    modalTitle: "Quick accessibility review",
    modalBody:
      "The reduced version keeps the state change and hierarchy, but swaps lateral travel for a more direct appearance.",
    modalCaption:
      "Instead of the usual stock modal, this comparison uses a contextual panel over an editorial preview.",
    modalEyebrow: "Accessibility review",
    modalMeta: "2 issues · 1 recommendation",
    modalStatus: "Needs review",
    previewTitle: "Landing hero refresh",
    previewBody:
      "Updated visual proposal with a primary CTA, editorial block, and a side rail for reading metrics.",
    previewNote:
      "This pattern shows the difference between lateral travel and reduced fade more clearly without looking generic.",
    issueTitle: "Motion issue",
    issueBody:
      "The lateral entrance adds unnecessary travel before the main content becomes readable.",
    alternativeTitle: "Reduced alternative",
    alternativeBody:
      "Keep the hierarchy, reduce the travel, and let the state change do the work.",
  },
};

function MotionModeToggle({
  locale,
  reduced,
  setReduced,
}: {
  locale: "es" | "en";
  reduced: boolean;
  setReduced: (next: boolean) => void;
}) {
  const copy = copyByLocale[locale];
  const baseButton =
    "rounded-full px-3 py-1.5 text-xs font-semibold transition-colors duration-150 border";

  return (
    <div className="mb-4 flex flex-wrap items-center gap-2">
      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
        {copy.modeLabel}
      </span>
      <div className="inline-flex rounded-full border border-slate-200 bg-white p-1 dark:border-slate-700 dark:bg-slate-900">
        <button
          type="button"
          onClick={() => setReduced(false)}
          aria-pressed={!reduced}
          className={`${baseButton} ${
            !reduced
              ? "border-sky-300 bg-sky-100 text-sky-900 dark:border-sky-700 dark:bg-sky-900/50 dark:text-sky-100"
              : "border-transparent text-slate-600 dark:text-slate-300"
          }`}
        >
          {copy.normalLabel}
        </button>
        <button
          type="button"
          onClick={() => setReduced(true)}
          aria-pressed={reduced}
          className={`${baseButton} ${
            reduced
              ? "border-emerald-300 bg-emerald-100 text-emerald-900 dark:border-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-100"
              : "border-transparent text-slate-600 dark:text-slate-300"
          }`}
        >
          {copy.reducedLabel}
        </button>
      </div>
    </div>
  );
}

export function MotionPreferenceDemo({ locale = "es" }: { locale?: "es" | "en" }) {
  const [reduced, setReduced] = useState(false);
  const copy = copyByLocale[locale];

  return (
    <section className="my-6 rounded-3xl border border-slate-200/80 bg-linear-to-br from-white to-slate-50 p-5 shadow-sm dark:border-slate-700 dark:from-slate-950 dark:to-slate-900">
      <MotionModeToggle locale={locale} reduced={reduced} setReduced={setReduced} />
      <p className="mb-4 text-sm text-slate-600 dark:text-slate-300">
        {reduced ? copy.reducedHint : copy.normalHint}
      </p>

      <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div
          className="rounded-2xl border border-slate-200 bg-linear-to-br from-cyan-50 via-white to-sky-100 p-5 dark:border-slate-700 dark:from-slate-800 dark:via-slate-900 dark:to-sky-950"
          style={{
            transform: reduced ? "none" : "translateY(0)",
            transition: reduced
              ? "opacity 120ms ease, box-shadow 120ms ease, border-color 120ms ease"
              : "transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease",
            boxShadow: reduced
              ? "0 0 0 2px rgba(14, 165, 233, 0.18)"
              : "0 10px 30px rgba(14, 165, 233, 0.10)",
          }}
          onMouseEnter={(event) => {
            const element = event.currentTarget;
            element.style.transform = reduced ? "none" : "translateY(-6px)";
            element.style.boxShadow = reduced
              ? "0 0 0 2px rgba(14, 165, 233, 0.28)"
              : "0 18px 36px rgba(14, 165, 233, 0.18)";
            element.style.borderColor = "rgba(14, 165, 233, 0.35)";
          }}
          onMouseLeave={(event) => {
            const element = event.currentTarget;
            element.style.transform = "translateY(0)";
            element.style.boxShadow = reduced
              ? "0 0 0 2px rgba(14, 165, 233, 0.18)"
              : "0 10px 30px rgba(14, 165, 233, 0.10)";
            element.style.borderColor = "";
          }}
        >
          <div className="mb-3 flex items-center justify-between gap-3">
            <span className="rounded-full bg-slate-900 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white dark:bg-slate-100 dark:text-slate-900">
              {copy.actionLabel}
            </span>
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" aria-hidden="true" />
          </div>
          <h4 className="mb-2 text-base font-semibold text-slate-900 dark:text-slate-100">
            {copy.cardTitle}
          </h4>
          <p className="m-0 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {copy.cardBody}
          </p>
        </div>
      </div>
    </section>
  );
}

export function ModalMotionDemo({ locale = "es" }: { locale?: "es" | "en" }) {
  const [reduced, setReduced] = useState(false);
  const [open, setOpen] = useState(false);
  const copy = copyByLocale[locale];
  const titleId = useId();

  return (
    <section className="my-6 rounded-3xl border border-slate-200/80 bg-linear-to-br from-white to-slate-50 p-5 shadow-sm dark:border-slate-700 dark:from-slate-950 dark:to-slate-900">
      <MotionModeToggle locale={locale} reduced={reduced} setReduced={setReduced} />
      <p className="mb-4 text-sm text-slate-600 dark:text-slate-300">{copy.modalCaption}</p>

      <div className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-950">
        <div className="relative overflow-hidden rounded-[24px] border border-slate-200 bg-linear-to-br from-orange-50 via-white to-cyan-50 p-5 dark:border-slate-700 dark:from-slate-900 dark:via-slate-950 dark:to-sky-950">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                Editorial preview
              </p>
              <h4 className="m-0 text-base font-semibold text-slate-900 dark:text-slate-100">
                {copy.previewTitle}
              </h4>
            </div>
            <span className="rounded-full border border-slate-300 px-2.5 py-1 text-[11px] font-medium text-slate-700 dark:border-slate-600 dark:text-slate-200">
              {copy.modalStatus}
            </span>
          </div>

          <div className="grid gap-4 md:grid-cols-[1.55fr_0.85fr]">
            <div className="rounded-[20px] border border-slate-200 bg-white p-4 shadow-[0_18px_50px_rgba(15,23,42,0.06)] dark:border-slate-700 dark:bg-slate-900">
              <div className="mb-4 h-32 rounded-[18px] bg-linear-to-br from-orange-300 via-amber-100 to-sky-200 dark:from-orange-500/50 dark:via-slate-800 dark:to-cyan-900" />
              <div className="mb-3 h-3 w-24 rounded-full bg-slate-200 dark:bg-slate-700" />
              <div className="mb-2 h-5 w-4/5 rounded-full bg-slate-900/90 dark:bg-slate-100/90" />
              <div className="mb-4 h-5 w-3/5 rounded-full bg-slate-900/90 dark:bg-slate-100/90" />
              <p className="m-0 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {copy.previewBody}
              </p>
            </div>

            <div className="rounded-[20px] border border-dashed border-slate-300 bg-white/75 p-4 dark:border-slate-600 dark:bg-slate-900/60">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                {copy.panelLabel}
              </p>
              <p className="mb-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {copy.previewNote}
              </p>
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white no-underline transition-colors duration-150 hover:bg-sky-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-sky-200"
              >
                {copy.openLabel}
              </button>
            </div>
          </div>
          {open ? (
            <div className="fixed inset-x-0 top-20 bottom-0 z-30 overflow-y-auto p-4 md:p-8">
              <div className="absolute inset-0 bg-slate-950/42 backdrop-blur-[2px]" />
              <div className="relative mx-auto grid min-h-full max-w-6xl items-start gap-4 pt-2 md:grid-cols-[1.1fr_0.9fr] md:pt-6">
                <div className="relative rounded-[20px] border border-white/10 bg-[linear-gradient(135deg,_rgba(15,23,42,0.96),_rgba(30,41,59,0.9))] p-5 text-white shadow-[0_20px_60px_rgba(15,23,42,0.35)]">
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <div>
                      <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-200/80">
                        {copy.modalEyebrow}
                      </p>
                      <h4 className="m-0 text-lg font-semibold text-white">{copy.previewTitle}</h4>
                    </div>
                    <span className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[11px] font-medium text-white/90">
                      {copy.modalMeta}
                    </span>
                  </div>
                  <div className="mb-4 h-36 rounded-[18px] bg-linear-to-br from-orange-300 via-amber-100 to-sky-200 opacity-85" />
                  <div className="mb-3 h-3 w-28 rounded-full bg-white/25" />
                  <div className="mb-2 h-4 w-5/6 rounded-full bg-white/85" />
                  <div className="mb-2 h-4 w-2/3 rounded-full bg-white/85" />
                  <div className="h-4 w-3/4 rounded-full bg-white/30" />
                </div>

                <div
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby={titleId}
                  className="relative self-start justify-self-end w-full max-w-[320px] rounded-[18px] border border-white/12 bg-white p-5 text-slate-900 shadow-[0_24px_60px_rgba(15,23,42,0.35)] dark:bg-slate-950 dark:text-slate-100"
                  style={{
                    opacity: 1,
                    transform: "translateX(0)",
                    transition: reduced
                      ? "opacity 120ms linear"
                      : "opacity 220ms ease-out, transform 220ms ease-out",
                    animation: reduced ? "mdx-panel-fade 120ms linear" : "mdx-panel-slide 240ms ease-out",
                  }}
                >
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div>
                      <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-700 dark:text-sky-300">
                        {copy.modalEyebrow}
                      </p>
                      <h4 id={titleId} className="m-0 text-base font-semibold">
                        {copy.modalTitle}
                      </h4>
                    </div>
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="rounded-full border border-slate-200 px-2.5 py-1 text-sm font-medium text-slate-700 transition-colors duration-150 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                    >
                      {copy.closeLabel}
                    </button>
                  </div>

                  <p className="mb-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {copy.modalBody}
                  </p>

                  <div className="space-y-3">
                    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-3 dark:border-amber-700/40 dark:bg-amber-950/30">
                      <p className="m-0 text-sm font-medium text-amber-900 dark:text-amber-100">
                        {copy.issueTitle}
                      </p>
                      <p className="m-0 text-sm text-amber-800 dark:text-amber-200">
                        {copy.issueBody}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-3 dark:border-emerald-700/40 dark:bg-emerald-950/30">
                      <p className="m-0 text-sm font-medium text-emerald-900 dark:text-emerald-100">
                        {copy.alternativeTitle}
                      </p>
                      <p className="m-0 text-sm text-emerald-800 dark:text-emerald-200">
                        {copy.alternativeBody}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <style jsx>{`
        @keyframes mdx-panel-slide {
          from {
            opacity: 0;
            transform: translateX(36px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes mdx-panel-fade {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
}
