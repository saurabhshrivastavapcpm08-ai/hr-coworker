import { useEffect } from "react";
import clsx from "clsx";
import { useTaraStore, type VariantId } from "../store";

const VARIANTS: { id: VariantId; label: string; key: string }[] = [
  { id: "quiet", label: "Quiet Desk", key: "1" },
  { id: "standup", label: "Standup Board", key: "2" },
  { id: "command", label: "Command Surface", key: "3" },
];

/** Picker chrome — not a design contestant. Instant switch, number keys. */
export function VariantPicker() {
  const variant = useTaraStore((s) => s.variant);
  const setVariant = useTaraStore((s) => s.setVariant);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) return;
      const hit = VARIANTS.find((v) => v.key === e.key);
      if (hit) setVariant(hit.id);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setVariant]);

  return (
    <div className="variant-picker" role="toolbar" aria-label="Prototype variants">
      {VARIANTS.map((v) => (
        <button
          key={v.id}
          type="button"
          aria-pressed={variant === v.id}
          className={clsx(variant === v.id && "is-active")}
          onClick={() => setVariant(v.id)}
        >
          <span style={{ opacity: 0.55, marginRight: 6 }}>{v.key}</span>
          {v.label}
        </button>
      ))}
      <span className="hint">1–3 to flip</span>
    </div>
  );
}
