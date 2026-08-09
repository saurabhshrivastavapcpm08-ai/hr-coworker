import type { CSSProperties, ReactNode } from "react";
import clsx from "clsx";
import { toast } from "sonner";
import {
  ACTIVITY,
  BRIEFING_DRAFT,
  FUNNEL_STEPS,
  JOB,
  JOBS_SUMMARY,
  NAV_ITEMS,
  ROLE_BRIEF,
  SLOTS,
  STANDUP,
  type Candidate,
  type ViewId,
} from "../data/tara";
import { useTaraStore } from "../store";

export function Score({ value }: { value: number }) {
  return (
    <span style={{ fontVariantNumeric: "tabular-nums", fontWeight: 700, letterSpacing: "-0.02em" }}>
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
        letterSpacing: "0.04em",
        textTransform: "uppercase",
        color: "var(--ink-soft)",
      }}
    >
      {source}
    </span>
  );
}

export function useTaraActions() {
  const store = useTaraStore();
  const selected = store.candidates.find((c) => c.id === store.selectedId) ?? null;
  const accepted = store.candidates.filter((c) => store.feedback[c.id] === "accept");
  const rejected = store.candidates.filter((c) => store.feedback[c.id] === "reject");

  const accept = (id: string) => {
    store.setFeedback(id, "accept");
    toast.success("Added to shortlist", {
      description: "Tara logged your judgment.",
      action: { label: "Undo", onClick: () => store.undoLast() },
    });
  };

  const reject = (id: string, reason = "Passed") => {
    store.setFeedback(id, "reject");
    toast.message(reason, {
      description: "Feedback helps Tara learn for similar roles.",
      action: { label: "Undo", onClick: () => store.undoLast() },
    });
  };

  const approveBrief = () => {
    store.approveBrief();
    toast.success("Role brief approved", { description: "Tara is sourcing across Zoho, LinkedIn, Naukri, and Workday." });
    store.setView("job");
  };

  const sendOutreach = () => {
    if (!accepted.length) {
      toast.error("Select at least one candidate first");
      store.setView("job");
      return;
    }
    store.approveOutreach();
    toast.success("Outreach approved", { description: "Sent from Outlook · WhatsApp nudges queued." });
    store.setView("schedule");
  };

  const confirmSchedule = () => {
    if (!store.selectedSlotId) {
      toast.error("Pick a slot to continue");
      return;
    }
    store.confirmSchedule();
    toast.success("Interviews confirmed", {
      description: "Calendar invites created · Slack DMs sent to interviewers.",
    });
    store.setView("briefing");
  };

  const sendBriefing = () => {
    store.sendBriefing();
    toast.success("Briefing sent to Priya", { description: "Logged in activity trail." });
    store.setView("home");
  };

  return {
    ...store,
    selected,
    accepted,
    rejected,
    accept,
    reject,
    approveBrief,
    sendOutreach,
    confirmSchedule,
    sendBriefing,
    job: JOB,
    jobs: JOBS_SUMMARY,
    standup: STANDUP,
    brief: ROLE_BRIEF,
    slots: SLOTS,
    briefing: BRIEFING_DRAFT,
    activity: ACTIVITY,
    funnel: FUNNEL_STEPS,
    nav: NAV_ITEMS,
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
        padding: "20px 16px 110px",
        maxWidth: 1240,
        margin: "0 auto",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

const btnBase: CSSProperties = {
  border: 0,
  borderRadius: 12,
  padding: "10px 14px",
  fontWeight: 700,
  fontSize: 14,
};

export const btnPrimary: CSSProperties = {
  ...btnBase,
  background: "var(--ink)",
  color: "#fff",
};

export const btnAccent: CSSProperties = {
  ...btnBase,
  background: "var(--accent)",
  color: "#fff",
};

export const btnGhost: CSSProperties = {
  ...btnBase,
  background: "transparent",
  border: "1px solid var(--line)",
  color: "var(--ink)",
};

export function AppChrome({
  tone = "solid",
  children,
}: {
  tone?: "solid" | "glass" | "editorial";
  children: ReactNode;
}) {
  const a = useTaraActions();

  return (
    <ShellFrame>
      <header
        className="app-chrome-header"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          marginBottom: 18,
          padding: tone === "glass" ? "12px 14px" : 0,
          borderRadius: tone === "glass" ? 16 : 0,
          background: tone === "glass" ? "rgba(255,255,255,0.55)" : "transparent",
          backdropFilter: tone === "glass" ? "blur(18px) saturate(160%)" : undefined,
          border: tone === "glass" ? "1px solid rgba(255,255,255,0.5)" : undefined,
        }}
      >
        <button
          type="button"
          onClick={() => a.setView("home")}
          style={{ border: 0, background: "transparent", display: "flex", alignItems: "center", gap: 10, padding: 0 }}
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
            }}
          >
            T
          </span>
          <div style={{ textAlign: "left" }}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, letterSpacing: "-0.03em", fontSize: 18 }}>
              Tara
            </div>
            <div style={{ fontSize: 12, color: "var(--ink-soft)" }}>{a.job.title} · with Aditi</div>
          </div>
        </button>
        <div style={{ fontSize: 13, color: "var(--ink-soft)" }}>
          {a.briefApproved ? "Brief live" : "Awaiting brief"} · {a.accepted.length} shortlisted
        </div>
      </header>

      <FunnelProgress current={a.view} briefApproved={a.briefApproved} outreachApproved={a.outreachApproved} scheduleConfirmed={a.scheduleConfirmed} briefingSent={a.briefingSent} onJump={a.setView} tone={tone} />

      <div
        className="app-layout"
        style={{
          display: "grid",
          gridTemplateColumns: "200px minmax(0, 1fr)",
          gap: 18,
          marginTop: 18,
          alignItems: "start",
        }}
      >
        <nav aria-label="Workflows" className="side-nav" style={{ position: "sticky", top: 16 }}>
          {a.nav.map((item) => {
            const active = a.view === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => a.setView(item.id)}
                aria-current={active ? "page" : undefined}
                style={{
                  width: "100%",
                  textAlign: "left",
                  border: 0,
                  borderRadius: 12,
                  padding: "10px 12px",
                  marginBottom: 4,
                  background: active
                    ? tone === "editorial"
                      ? "var(--ink)"
                      : "rgba(42,107,90,0.12)"
                    : "transparent",
                  color: active && tone === "editorial" ? "#fff" : "var(--ink)",
                  transition: "background 150ms var(--ease-out)",
                }}
              >
                <div style={{ fontWeight: 700, fontSize: 14 }}>{item.label}</div>
                <div style={{ fontSize: 12, opacity: 0.7, marginTop: 2 }}>{item.hint}</div>
              </button>
            );
          })}
        </nav>
        <main id="workflow-main">{children}</main>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .app-layout { grid-template-columns: 1fr !important; }
          .side-nav {
            position: relative !important;
            display: flex;
            gap: 6px;
            overflow-x: auto;
            padding-bottom: 6px;
            margin-bottom: 8px;
          }
          .side-nav button { min-width: 132px; margin-bottom: 0 !important; }
        }
      `}</style>
    </ShellFrame>
  );
}

function FunnelProgress({
  current,
  briefApproved,
  outreachApproved,
  scheduleConfirmed,
  briefingSent,
  onJump,
  tone,
}: {
  current: ViewId;
  briefApproved: boolean;
  outreachApproved: boolean;
  scheduleConfirmed: boolean;
  briefingSent: boolean;
  onJump: (v: ViewId) => void;
  tone: "solid" | "glass" | "editorial";
}) {
  const done: Record<string, boolean> = {
    brief: briefApproved,
    job: briefApproved,
    outreach: outreachApproved,
    schedule: scheduleConfirmed,
    briefing: briefingSent,
  };

  return (
    <div
      aria-label="Hiring funnel progress"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${FUNNEL_STEPS.length}, minmax(0,1fr))`,
        gap: 8,
        padding: tone === "glass" ? 12 : 0,
        borderRadius: 14,
        background: tone === "glass" ? "rgba(255,255,255,0.45)" : "transparent",
      }}
    >
      {FUNNEL_STEPS.map((step, i) => {
        const active = current === step.id;
        const complete = !!done[step.id] && step.id !== "job";
        const shortlistStarted = step.id === "job" && briefApproved;
        return (
          <button
            key={step.id}
            type="button"
            onClick={() => onJump(step.id as ViewId)}
            style={{
              border: 0,
              background: "transparent",
              textAlign: "left",
              padding: "6px 2px",
              borderTop: `3px solid ${active || complete || shortlistStarted ? "var(--accent)" : "var(--line)"}`,
            }}
          >
            <div style={{ fontSize: 11, color: "var(--ink-soft)", letterSpacing: "0.04em" }}>
              0{i + 1}
            </div>
            <div style={{ fontWeight: 700, fontSize: 13 }}>{step.label}</div>
          </button>
        );
      })}
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap", marginBottom: 18 }}>
      <div style={{ maxWidth: 640 }}>
        {eyebrow && (
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 6 }}>
            {eyebrow}
          </div>
        )}
        <h1 style={{ margin: 0, fontFamily: "var(--font-display)", letterSpacing: "-0.04em", fontSize: "clamp(1.6rem, 3vw, 2.2rem)", lineHeight: 1.05 }}>
          {title}
        </h1>
        {description && <p style={{ margin: "8px 0 0", color: "var(--ink-soft)", lineHeight: 1.45 }}>{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function EmptyHint({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        border: "1px dashed var(--line)",
        borderRadius: 16,
        padding: 20,
        color: "var(--ink-soft)",
        background: "rgba(255,255,255,0.4)",
      }}
    >
      {children}
    </div>
  );
}
