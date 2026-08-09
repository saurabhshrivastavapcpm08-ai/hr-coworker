import { animate } from "motion";
import { useEffect, useRef, type PointerEvent as ReactPointerEvent } from "react";
import { Score, SourceChip, ShellFrame, TopNav, useTaraActions } from "../components/shared";
import type { Candidate } from "../data/tara";

/** Axis: interaction model — translucent materials + interruptible sheet review. */
export function CommandSurface() {
  const a = useTaraActions();
  const sheetRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ y: number; start: number; lastY: number; lastT: number; v: number } | null>(null);

  useEffect(() => {
    if (!a.selected || !sheetRef.current) return;
    const el = sheetRef.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      el.style.transform = "translateY(0)";
      el.style.opacity = "1";
      return;
    }
    animate(
      el as HTMLElement,
      { transform: ["translateY(18%)", "translateY(0%)"], opacity: [0, 1] },
      { type: "spring", bounce: 0, duration: 0.42 },
    );
  }, [a.selected?.id]);

  const closeSheet = (velocity = 0) => {
    const el = sheetRef.current;
    if (!el) {
      a.setSelectedId(null);
      return;
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      a.setSelectedId(null);
      return;
    }
    animate(
      el as HTMLElement,
      { transform: "translateY(110%)", opacity: 0.6 },
      {
        type: "spring",
        bounce: 0.15,
        duration: 0.4,
        velocity,
        onComplete: () => a.setSelectedId(null),
      },
    );
  };

  const onPointerDown = (e: ReactPointerEvent) => {
    const el = sheetRef.current;
    if (!el) return;
    el.setPointerCapture(e.pointerId);
    drag.current = { y: 0, start: e.clientY, lastY: e.clientY, lastT: performance.now(), v: 0 };
  };

  const onPointerMove = (e: ReactPointerEvent) => {
    if (!drag.current || !sheetRef.current) return;
    const dy = Math.max(0, e.clientY - drag.current.start);
    const now = performance.now();
    const dt = Math.max(1, now - drag.current.lastT);
    drag.current.v = ((e.clientY - drag.current.lastY) / dt) * 1000;
    drag.current.lastY = e.clientY;
    drag.current.lastT = now;
    drag.current.y = dy;
    sheetRef.current.style.transform = `translateY(${dy}px)`;
  };

  const onPointerUp = () => {
    if (!drag.current || !sheetRef.current) return;
    const { y, v } = drag.current;
    drag.current = null;
    // Project momentum (Apple-style) then decide commit vs reverse
    const projected = y + (v / 1000) * 0.998 / (1 - 0.998);
    if (projected > 140 || v > 900) {
      closeSheet(v);
    } else {
      animate(sheetRef.current as HTMLElement, { transform: "translateY(0px)" }, { type: "spring", bounce: 0.2, duration: 0.4, velocity: v });
    }
  };

  return (
    <ShellFrame
      style={{
        maxWidth: 1240,
        background:
          "radial-gradient(800px 400px at 20% 0%, rgba(42,107,90,0.16), transparent), transparent",
      }}
    >
      <TopNav title="Command surface" onHome={() => a.setView("home")} tone="glass" />

      {a.view === "home" && (
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.2fr) minmax(280px, 0.8fr)",
            gap: 16,
          }}
          className="command-home"
        >
          <div
            style={{
              background: "rgba(255,255,255,0.55)",
              backdropFilter: "blur(22px) saturate(170%)",
              border: "1px solid rgba(255,255,255,0.55)",
              borderRadius: 24,
              padding: 22,
            }}
          >
            <div style={{ fontSize: 13, color: "var(--ink-soft)", marginBottom: 8 }}>Tara Home</div>
            <h1 style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.04em", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", margin: "0 0 14px" }}>
              What should you work on next?
            </h1>
            <div style={{ display: "grid", gap: 8 }}>
              {a.standup.tasks.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => a.setView(t.id === "t2" ? "outreach" : "job")}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 12,
                    textAlign: "left",
                    border: 0,
                    borderRadius: 14,
                    padding: "14px 14px",
                    background: t.urgent ? "rgba(42,107,90,0.12)" : "rgba(255,255,255,0.55)",
                    transition: "transform 140ms var(--ease-out)",
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600 }}>{t.label}</div>
                    <div style={{ fontSize: 13, color: "var(--ink-soft)" }}>{t.meta}</div>
                  </div>
                  <span aria-hidden style={{ opacity: 0.45 }}>↗</span>
                </button>
              ))}
            </div>
          </div>

          <aside
            style={{
              background: "rgba(20,24,32,0.88)",
              color: "#fff",
              borderRadius: 24,
              padding: 22,
              backdropFilter: "blur(20px)",
            }}
          >
            <div style={{ opacity: 0.65, fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase" }}>Activity</div>
            <ul style={{ listStyle: "none", padding: 0, margin: "14px 0 0", display: "grid", gap: 12 }}>
              {a.standup.lines.map((l) => (
                <li key={l} style={{ fontSize: 14, lineHeight: 1.4, opacity: 0.92 }}>
                  {l}
                </li>
              ))}
            </ul>
          </aside>
        </section>
      )}

      {a.view === "job" && (
        <section>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 12,
              marginBottom: 16,
              background: "rgba(255,255,255,0.55)",
              backdropFilter: "blur(18px)",
              borderRadius: 20,
              padding: 16,
              border: "1px solid rgba(255,255,255,0.5)",
            }}
          >
            <div>
              <div style={{ fontSize: 12, color: "var(--ink-soft)" }}>{a.job.team}</div>
              <h2 style={{ margin: 0, fontFamily: "var(--font-display)", letterSpacing: "-0.03em" }}>{a.job.title}</h2>
            </div>
            <button
              type="button"
              onClick={() => a.setView("outreach")}
              disabled={!a.accepted.length}
              style={{
                border: 0,
                borderRadius: 14,
                padding: "10px 14px",
                background: "var(--accent)",
                color: "#fff",
                fontWeight: 700,
                opacity: a.accepted.length ? 1 : 0.4,
              }}
            >
              Reach out · {a.accepted.length}
            </button>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: 12,
            }}
          >
            {a.candidates.map((c) => (
              <CandidateTile
                key={c.id}
                c={c}
                state={a.feedback[c.id]}
                onOpen={() => a.setSelectedId(c.id)}
              />
            ))}
          </div>
        </section>
      )}

      {a.view === "outreach" && (
        <section
          style={{
            background: "rgba(255,255,255,0.6)",
            backdropFilter: "blur(20px)",
            borderRadius: 24,
            padding: 22,
            border: "1px solid rgba(255,255,255,0.55)",
          }}
        >
          <h2 style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.03em", marginTop: 0 }}>Approve outreach</h2>
          <p style={{ color: "var(--ink-soft)" }}>Human confirmation required. Tara never sends the first batch alone.</p>
          {(a.accepted.length ? a.accepted : a.candidates.slice(0, 2)).map((c) => (
            <div key={c.id} style={{ padding: "12px 0", borderTop: "1px solid var(--line)" }}>
              <strong>{c.name}</strong>
              <div style={{ color: "var(--ink-soft)", fontSize: 14, marginTop: 4 }}>
                Draft ready in Outlook · WhatsApp nudge queued
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={a.sendOutreach}
            disabled={a.outreachApproved}
            style={{
              marginTop: 12,
              border: 0,
              borderRadius: 14,
              padding: "12px 16px",
              background: "var(--ink)",
              color: "#fff",
              fontWeight: 700,
            }}
          >
            {a.outreachApproved ? "Sent" : "Approve & send"}
          </button>
        </section>
      )}

      {a.selected && a.view === "job" && (
        <div
          role="presentation"
          onClick={() => closeSheet()}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(20,24,32,0.35)",
            zIndex: 40,
            display: "grid",
            alignItems: "end",
          }}
        >
          <div
            ref={sheetRef}
            role="dialog"
            aria-label={`Candidate ${a.selected.name}`}
            onClick={(e) => e.stopPropagation()}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            style={{
              background: "rgba(247,248,250,0.92)",
              backdropFilter: "blur(24px) saturate(180%)",
              borderRadius: "24px 24px 0 0",
              padding: "10px 20px 28px",
              maxWidth: 720,
              width: "100%",
              margin: "0 auto",
              border: "1px solid rgba(255,255,255,0.7)",
              borderBottom: 0,
              boxShadow: "0 -20px 60px rgba(0,0,0,0.18)",
              touchAction: "none",
            }}
          >
            <div
              aria-hidden
              style={{
                width: 42,
                height: 5,
                borderRadius: 99,
                background: "rgba(20,24,32,0.18)",
                margin: "6px auto 16px",
              }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 26, letterSpacing: "-0.04em", fontWeight: 700 }}>
                  {a.selected.name}
                </div>
                <div style={{ color: "var(--ink-soft)" }}>
                  {a.selected.title} · {a.selected.company} · <SourceChip source={a.selected.source} />
                </div>
              </div>
              <div
                style={{
                  width: 54,
                  height: 54,
                  borderRadius: 16,
                  display: "grid",
                  placeItems: "center",
                  background: "var(--accent-soft)",
                  color: "var(--accent)",
                  fontSize: 20,
                }}
              >
                <Score value={a.selected.score} />
              </div>
            </div>
            <p style={{ lineHeight: 1.5, marginTop: 14 }}>{a.selected.why}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
              {a.selected.matched.map((m) => (
                <span key={m} style={{ fontSize: 12, fontWeight: 600, padding: "6px 10px", borderRadius: 999, background: "rgba(42,107,90,0.12)", color: "var(--accent)" }}>
                  {m}
                </span>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                type="button"
                onClick={() => {
                  a.accept(a.selected!.id);
                  closeSheet();
                }}
                style={{ flex: 1, border: 0, borderRadius: 14, padding: 14, background: "var(--accent)", color: "#fff", fontWeight: 700 }}
              >
                Accept
              </button>
              <button
                type="button"
                onClick={() => {
                  a.reject(a.selected!.id);
                  closeSheet();
                }}
                style={{ flex: 1, border: "1px solid var(--line)", borderRadius: 14, padding: 14, background: "#fff", fontWeight: 600 }}
              >
                Pass
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 840px) {
          .command-home { grid-template-columns: 1fr !important; }
        }
        @media (prefers-reduced-transparency: reduce) {
          .tara-shell * { backdrop-filter: none !important; }
        }
      `}</style>
    </ShellFrame>
  );
}

function CandidateTile({
  c,
  state,
  onOpen,
}: {
  c: Candidate;
  state?: "accept" | "reject";
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="hover-lift"
      style={{
        textAlign: "left",
        border: 0,
        borderRadius: 20,
        padding: 16,
        background: "rgba(255,255,255,0.58)",
        backdropFilter: "blur(16px)",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.55)",
        transition: "transform 150ms var(--ease-out)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
        <Score value={c.score} />
        <span style={{ fontSize: 12, fontWeight: 700, color: state === "accept" ? "var(--good)" : "var(--ink-soft)" }}>
          {state === "accept" ? "Accepted" : state === "reject" ? "Passed" : c.tier}
        </span>
      </div>
      <div style={{ fontWeight: 700 }}>{c.name}</div>
      <div style={{ fontSize: 13, color: "var(--ink-soft)", marginTop: 2 }}>
        {c.company} · <SourceChip source={c.source} />
      </div>
    </button>
  );
}
