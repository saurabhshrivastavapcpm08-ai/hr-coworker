import type { CSSProperties, ReactNode } from "react";
import clsx from "clsx";
import { toast } from "sonner";
import { JOB, ROLE_BRIEF, STANDUP, type Candidate } from "../data/tara";
import { useTaraStore } from "../store";

export function Score({ value }: { value: number }) {
  return (
    <span
      style={{
        fontVariantNumeric: "tabular-nums",
        fontWeight: 700,
        letterSpacing: "-0.02em",
      }}
    >
      {value}
    </span>
  );
}

export function SourceChip({ source }: { source: Candidate["source"] }) {
  return (
    <span
      style={{
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "0.02em",
        textTransform: "uppercase",
        color: "var(--ink-soft)",
        opacity: 0.85,
      }}
    >
      {source}
    </span>
  );
}

export function useTaraActions() {
  const setView = useTaraStore((s) => s.setView);
  const setSelectedId = useTaraStore((s) => s.setSelectedId);
  const setFeedback = useTaraStore((s) => s.setFeedback);
  const approveOutreach = useTaraStore((s) => s.approveOutreach);
  const feedback = useTaraStore((s) => s.feedback);
  const outreachApproved = useTaraStore((s) => s.outreachApproved);
  const candidates = useTaraStore((s) => s.candidates);
  const selectedId = useTaraStore((s) => s.selectedId);
  const view = useTaraStore((s) => s.view);
  const selected = candidates.find((c) => c.id === selectedId) ?? null;
  const accepted = candidates.filter((c) => feedback[c.id] === "accept");

  const accept = (id: string) => {
    setFeedback(id, "accept");
    toast.success("Added to shortlist", { description: "Tara logged your judgment." });
  };
  const reject = (id: string) => {
    setFeedback(id, "reject");
    toast.message("Passed", { description: "Feedback helps Tara learn." });
  };

  const sendOutreach = () => {
    approveOutreach();
    toast.success("Outreach approved", {
      description: "Drafts sent from Outlook · WhatsApp nudges queued.",
    });
    setView("home");
  };

  return {
    view,
    setView,
    selected,
    setSelectedId,
    accept,
    reject,
    feedback,
    accepted,
    outreachApproved,
    sendOutreach,
    candidates,
    job: JOB,
    standup: STANDUP,
    brief: ROLE_BRIEF,
  };
}

export function ShellFrame({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={clsx("tara-shell", className)}
      style={{
        minHeight: "100dvh",
        padding: "24px 20px 96px",
        maxWidth: 1180,
        margin: "0 auto",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function TopNav({
  title,
  onHome,
  tone = "solid",
}: {
  title: string;
  onHome: () => void;
  tone?: "solid" | "glass";
}) {
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        marginBottom: 28,
        padding: tone === "glass" ? "12px 14px" : 0,
        borderRadius: tone === "glass" ? 16 : 0,
        background:
          tone === "glass" ? "rgba(255,255,255,0.55)" : "transparent",
        backdropFilter: tone === "glass" ? "blur(18px) saturate(160%)" : undefined,
        border: tone === "glass" ? "1px solid rgba(255,255,255,0.5)" : undefined,
      }}
    >
      <button
        type="button"
        onClick={onHome}
        style={{
          border: 0,
          background: "transparent",
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: 0,
        }}
      >
        <span
          aria-hidden
          style={{
            width: 34,
            height: 34,
            borderRadius: 10,
            display: "grid",
            placeItems: "center",
            background: "var(--accent)",
            color: "#fff",
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
          }}
        >
          T
        </span>
        <div style={{ textAlign: "left" }}>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              fontSize: 18,
              lineHeight: 1.1,
            }}
          >
            Tara
          </div>
          <div style={{ fontSize: 12, color: "var(--ink-soft)" }}>{title}</div>
        </div>
      </button>
      <div style={{ fontSize: 13, color: "var(--ink-soft)" }}>Aditi · TA</div>
    </header>
  );
}
