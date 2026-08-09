import { Link } from "react-router-dom";
import { Toaster } from "sonner";
import { VariantPicker } from "../components/VariantPicker";
import { useTaraStore } from "../store";
import { QuietDesk } from "../variants/QuietDesk";
import { StandupBoard } from "../variants/StandupBoard";
import { CommandSurface } from "../variants/CommandSurface";

export function PrototypePage() {
  const variant = useTaraStore((s) => s.variant);

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 14,
          right: 14,
          zIndex: 50,
          display: "flex",
          gap: 8,
        }}
      >
        <Link
          to="/"
          style={{
            textDecoration: "none",
            fontSize: 12,
            fontWeight: 700,
            padding: "8px 12px",
            borderRadius: 999,
            background: "rgba(255,255,255,0.8)",
            border: "1px solid var(--line)",
            backdropFilter: "blur(12px)",
          }}
        >
          Case study
        </Link>
      </div>

      {variant === "quiet" && <QuietDesk />}
      {variant === "standup" && <StandupBoard />}
      {variant === "command" && <CommandSurface />}

      <VariantPicker />
      <Toaster position="top-center" richColors closeButton />
    </>
  );
}
