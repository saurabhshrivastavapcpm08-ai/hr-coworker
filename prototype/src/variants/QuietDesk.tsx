import type { CSSProperties } from "react";
import { Score, SourceChip, ShellFrame, TopNav, useTaraActions } from "../components/shared";

/** Axis: density & restraint — borders over shadows, calm daily-use tool. */
export function QuietDesk() {
  const a = useTaraActions();

  return (
    <ShellFrame>
      <TopNav title="Quiet desk" onHome={() => a.setView("home")} />

      {a.view === "home" && (
        <section>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
              margin: "0 0 8px",
            }}
          >
            {a.standup.greeting}
          </h1>
          <p style={{ margin: "0 0 28px", color: "var(--ink-soft)", maxWidth: 520 }}>
            Today’s work, without the noise. Review what Tara prepared, then decide.
          </p>

          <div style={{ display: "grid", gap: 0, borderTop: "1px solid var(--line)" }}>
            {a.standup.tasks.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => a.setView(t.id === "t2" ? "outreach" : "job")}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 16,
                  textAlign: "left",
                  padding: "16px 4px",
                  border: 0,
                  borderBottom: "1px solid var(--line)",
                  background: "transparent",
                  transition: "background 150ms var(--ease-out)",
                }}
              >
                <div>
                  <div style={{ fontWeight: 600 }}>{t.label}</div>
                  <div style={{ fontSize: 13, color: "var(--ink-soft)", marginTop: 2 }}>{t.meta}</div>
                </div>
                {t.urgent && (
                  <span style={{ fontSize: 12, color: "var(--warn)", fontWeight: 600 }}>Due</span>
                )}
              </button>
            ))}
          </div>
        </section>
      )}

      {a.view === "job" && (
        <section>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 16, marginBottom: 20 }}>
            <div>
              <div style={{ fontSize: 12, color: "var(--ink-soft)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                {a.job.team} · {a.job.urgency}
              </div>
              <h2 style={{ margin: "4px 0 0", fontFamily: "var(--font-display)", letterSpacing: "-0.03em" }}>
                {a.job.title}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => a.setView("outreach")}
              disabled={a.accepted.length === 0}
              style={{
                border: "1px solid var(--line)",
                background: a.accepted.length ? "var(--ink)" : "transparent",
                color: a.accepted.length ? "#fff" : "var(--ink-soft)",
                padding: "10px 14px",
                borderRadius: 10,
                opacity: a.accepted.length ? 1 : 0.5,
              }}
            >
              Ask Tara to reach out ({a.accepted.length})
            </button>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
              gap: 12,
              marginBottom: 20,
              fontSize: 13,
            }}
          >
            {[
              ["Sourced", a.job.sourced],
              ["Shortlist", a.job.shortlisted],
              ["Outreach", a.job.outreach],
              ["Interviews", a.job.interviews],
            ].map(([k, v]) => (
              <div key={String(k)} style={{ borderTop: "2px solid var(--ink)", paddingTop: 8 }}>
                <div style={{ color: "var(--ink-soft)" }}>{k}</div>
                <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.03em" }}>{v}</div>
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gap: 0, borderTop: "1px solid var(--line)" }}>
            {a.candidates.map((c, i) => {
              const state = a.feedback[c.id];
              const open = a.selected?.id === c.id;
              return (
                <div
                  key={c.id}
                  className="quiet-row"
                  style={{
                    borderBottom: "1px solid var(--line)",
                    animation: `quietIn 280ms var(--ease-out) ${Math.min(i * 40, 160)}ms both`,
                  }}
                >
                  <button
                    type="button"
                    onClick={() => a.setSelectedId(open ? null : c.id)}
                    style={{
                      width: "100%",
                      display: "grid",
                      gridTemplateColumns: "56px 1fr auto",
                      gap: 14,
                      alignItems: "center",
                      padding: "14px 4px",
                      border: 0,
                      background: open ? "rgba(42,107,90,0.06)" : "transparent",
                      textAlign: "left",
                    }}
                  >
                    <Score value={c.score} />
                    <div>
                      <div style={{ fontWeight: 600 }}>
                        {c.name}{" "}
                        <span style={{ color: "var(--ink-soft)", fontWeight: 500 }}>· {c.title}</span>
                      </div>
                      <div style={{ fontSize: 13, color: "var(--ink-soft)" }}>
                        {c.company} · {c.location} · <SourceChip source={c.source} />
                      </div>
                    </div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: state === "accept" ? "var(--good)" : state === "reject" ? "var(--danger)" : "var(--ink-soft)" }}>
                      {state === "accept" ? "Accepted" : state === "reject" ? "Passed" : c.tier}
                    </div>
                  </button>
                  {open && (
                    <div style={{ padding: "0 4px 16px 70px" }}>
                      <p style={{ margin: "0 0 10px", color: "var(--ink-soft)", maxWidth: 640 }}>{c.why}</p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
                        {c.matched.map((m) => (
                          <span key={m} style={{ fontSize: 12, border: "1px solid var(--line)", padding: "4px 8px", borderRadius: 999 }}>
                            {m}
                          </span>
                        ))}
                      </div>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button type="button" onClick={() => a.accept(c.id)} style={btnSolid}>
                          Accept
                        </button>
                        <button type="button" onClick={() => a.reject(c.id)} style={btnGhost}>
                          Too senior / pass
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {a.view === "outreach" && <QuietOutreach a={a} />}
      <style>{`
        @keyframes quietIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .quiet-row { animation: none !important; }
        }
      `}</style>
    </ShellFrame>
  );
}

function QuietOutreach({ a }: { a: ReturnType<typeof useTaraActions> }) {
  const targets = a.accepted.length ? a.accepted : a.candidates.slice(0, 2);
  return (
    <section>
      <h2 style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.03em" }}>Outreach drafts</h2>
      <p style={{ color: "var(--ink-soft)", marginTop: 0 }}>Tara drafted these into Outlook. Nothing sends until you approve.</p>
      <div style={{ display: "grid", gap: 12 }}>
        {targets.map((c) => (
          <article key={c.id} style={{ border: "1px solid var(--line)", borderRadius: 12, padding: 16 }}>
            <div style={{ fontWeight: 600, marginBottom: 6 }}>To: {c.name}</div>
            <div style={{ fontSize: 13, color: "var(--ink-soft)", marginBottom: 10 }}>
              Subject: Backend role at our Platform team — your {c.company} work stood out
            </div>
            <p style={{ margin: 0, lineHeight: 1.5, fontSize: 14 }}>
              Hi {c.name.split(" ")[0]}, I noticed your work on {c.matched[0]} at {c.company}. We’re hiring a Backend Engineer
              for Platform in Bangalore and thought your background could be a strong fit. Open to a quick chat this week?
            </p>
          </article>
        ))}
      </div>
      <button
        type="button"
        onClick={a.sendOutreach}
        disabled={a.outreachApproved}
        style={{ ...btnSolid, marginTop: 16 }}
      >
        {a.outreachApproved ? "Approved & sent" : "Approve & send"}
      </button>
    </section>
  );
}

const btnSolid: CSSProperties = {
  border: 0,
  background: "var(--ink)",
  color: "#fff",
  padding: "10px 14px",
  borderRadius: 10,
  fontWeight: 600,
};

const btnGhost: CSSProperties = {
  border: "1px solid var(--line)",
  background: "transparent",
  color: "var(--ink)",
  padding: "10px 14px",
  borderRadius: 10,
  fontWeight: 600,
};
