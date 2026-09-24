import { GREY, GRADIENT, TYPE } from "@/components/mid-fidelity"

/**
 * Zero warehouse history: add first product line or import manifest.
 * Prompt: prompts/05-edge-states.md
 */
export function EmptyOnboarding({
  onAddProduct,
  onImportManifest,
}: {
  onAddProduct: () => void
  onImportManifest: () => void
}) {
  return (
    <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-center gap-6 px-6 py-24 text-center">
      <div
        className="flex h-16 w-16 items-center justify-center rounded-full"
        style={{ background: GREY.well, border: `1px solid ${GREY.hairline}` }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={GREY.muted} strokeWidth="1.5">
          <path d="M3 7l9-4 9 4-9 4-9-4z" />
          <path d="M3 7v10l9 4 9-4V7" />
          <path d="M12 11v10" />
        </svg>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className={TYPE.heroFigure} style={{ color: GREY.text }}>
          No warehouse history yet
        </h2>
        <p className={`max-w-md ${TYPE.meta}`} style={{ color: GREY.muted }}>
          Add your first product line or import an existing manifest to start tracking stock, restocks, and dispatches.
        </p>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onAddProduct}
          className={`rounded-[var(--radius-sm)] px-4 py-2.5 transition-opacity hover:opacity-90 ${TYPE.control}`}
          style={{ background: GRADIENT, color: "#FFFFFF" }}
        >
          + Add First Product Line
        </button>
        <button
          type="button"
          onClick={onImportManifest}
          className={`rounded-[var(--radius-sm)] px-4 py-2.5 transition-opacity hover:opacity-90 ${TYPE.control}`}
          style={{ background: GREY.panel, color: GREY.text, border: `1px solid ${GREY.bar}` }}
        >
          Import Manifest
        </button>
      </div>
    </div>
  )
}
