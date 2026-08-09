import type { CSSProperties } from "react";
import { Score, SourceChip, ShellFrame, TopNav, useTaraActions } from "../components/shared";

/** Axis: personality — narrative coworker standup; large type, briefing-first. */
export function StandupBoard() {
  const a = useTaraActions();

  return (
    <ShellFrame>
      <TopNav title="Your junior teammate" onHome={() => a.setView("home")} />

      {a.view === "home" && (
        <section className="standup-hero">
          <p
            style={{
              margin: 0,
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--accent)",
            }}
          >
            End-of-day standup
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.4rem, 6vw, 4.2rem)",
              letterSpacing: "-0.05em",
              lineHeight: 0.98,
              margin: "10px 0 18px",
              maxWidth: "14ch",
            }}
          >
            {a.standup.greeting.replace(", Aditi", "")}.
            <span style={{ color: "var(--accent)" }}> Here’s what I moved.</span>
          </h1>

          <div
            style={{
              display: "grid",
              gap: 10,
              marginBottom: 28,
              maxWidth: 720,
            }}
          >
            {a.standup.lines.map((line) => (
              <p
                key={line}
                style={{
                  margin: 0,
                  fontSize: "clamp(1.05rem, 2vw, 1.25rem)",
                  lineHeight: 1.35,
                  color: "var(--ink-soft)",
                  borderLeft: "3px solid var(--accent-soft)",
                  paddingLeft: 14,
                }}
              >
                {line}
              </p>
            ))}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 12,
            }}
          >
            {a.standup.tasks.map((t, i) => (
              <button
                key={t.id}
                type="button"
                className="hover-lift"
                onClick={() => a.setView(t.id === "t2" ? "outreach" : "job")}
                style={{
                  textAlign: "left",
                  border: 0,
                  borderRadius: 18,
                  padding: 18,
                  background: i === 0 ? "var(--ink)" : "rgba(255,255,255,0.72)",
                  color: i === 0 ? "#fff" : "var(--ink)",
                  boxShadow: "0 1px 0 rgba(255,255,255,0.6) inset",
                  transition: "transform 160ms var(--ease-out)",
                }}
              >
                <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 8 }}>Next up</div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 20, letterSpacing: "-0.03em", fontWeight: 700 }}>
                  {t.label}
                </div>
                <div style={{ fontSize: 13, marginTop: 8, opacity: 0.75 }}>{t.meta}</div>
              </button>
            ))}
          </div>
        </section>
      )}

      {a.view === "job" && (
        <section>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 16, marginBottom: 22 }}>
            <div>
              <div style={{ color: "var(--accent)", fontWeight: 600, fontSize: 13 }}>Role brief approved · sourcing complete</div>
              <h2
                style={{
                  margin: "6px 0 0",
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                }}
              >
                Shortlist for {a.job.title}
              </h2>
              <p style={{ color: "var(--ink-soft)", maxWidth: 520 }}>
                I hunted across Zoho, LinkedIn, Naukri, and internal mobility. You decide who moves.
              </p>
            </div>
            <button
              type="button"
              onClick={() => a.setView("outreach")}
              disabled={a.accepted.length === 0}
              style={{
                alignSelf: "start",
                border: 0,
                background: "var(--accent)",
                color: "#fff",
                padding: "12px 16px",
                borderRadius: 999,
                fontWeight: 700,
                opacity: a.accepted.length ? 1 : 0.45,
              }}
            >
              Ask Tara to reach out · {a.accepted.length}
            </button>
          </div>

          <div style={{ display: "grid", gap: 14 }}>
            {a.candidates.map((c) => {
              const state = a.feedback[c.id];
              const open = a.selected?.id === c.id;
              return (
                <article
                  key={c.id}
                  style={{
                    background: "rgba(255,255,255,0.78)",
                    borderRadius: 20,
                    padding: 18,
                    outline: open ? "2px solid var(--accent)" : "1px solid transparent",
                    transition: "outline-color 180ms var(--ease-out)",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => a.setSelectedId(open ? null : c.id)}
                    style={{
                      width: "100%",
                      border: 0,
                      background: "transparent",
                      display: "grid",
                      gridTemplateColumns: "auto 1fr auto",
                      gap: 16,
                      textAlign: "left",
                      padding: 0,
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        width: 56,
                        height: 56,
                        borderRadius: 16,
                        display: "grid",
                        placeItems: "center",
                        background: "var(--accent-soft)",
                        color: "var(--accent)",
                        fontSize: 20,
                      }}
                    >
                      <Score value={c.score} />
                    </div>
                    <div>
                      <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, letterSpacing: "-0.03em" }}>
                        {c.name}
                      </div>
                      <div style={{ color: "var(--ink-soft)" }}>
                        {c.title} · {c.company} · <SourceChip source={c.source} />
                      </div>
                    </div>
                    <div style={{ fontWeight: 700, color: state === "accept" ? "var(--good)" : "var(--ink-soft)" }}>
                      {state === "accept" ? "In shortlist" : state === "reject" ? "Passed" : "Review"}
                    </div>
                  </button>

                  {open && (
                    <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid var(--line)" }}>
                      <h3 style={{ margin: "0 0 6px", fontSize: 14, letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--accent)" }}>
                        Why I picked this person
                      </h3>
                      <p style={{ margin: "0 0 12px", fontSize: 16, lineHeight: 1.45 }}>{c.why}</p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
                        {c.matched.map((m) => (
                          <span key={m} style={{ background: "var(--accent-soft)", color: "var(--accent)", padding: "6px 10px", borderRadius: 999, fontSize: 13, fontWeight: 600 }}>
                            {m}
                          </span>
                        ))}
                      </div>
                      {c.risks.map((r) => (
                        <div key={r} style={{ fontSize: 13, color: "var(--warn)", marginBottom: 12 }}>
                          Risk · {r}
                        </div>
                      ))}
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        <button type="button" onClick={() => a.accept(c.id)} style={pillDark}>
                          Accept for outreach
                        </button>
                        <button type="button" onClick={() => a.reject(c.id)} style={pillLight}>
                          Too senior
                        </button>
                        <button type="button" onClick={() => a.reject(c.id)} style={pillLight}>
                          Wrong domain
                        </button>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </section>
      )}

      {a.view === "outreach" && (
        <section>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 4vw, 2.6rem)", letterSpacing: "-0.04em", marginBottom: 8 }}>
            Outreach that doesn’t feel like spam
          </h2>
          <p style={{ color: "var(--ink-soft)", maxWidth: 560 }}>
            Personalized drafts from each profile + role brief. Sitting in Outlook Drafts until you say go.
          </p>
          <div style={{ display: "grid", gap: 14, marginTop: 18 }}>
            {(a.accepted.length ? a.accepted : a.candidates.slice(0, 2)).map((c) => (
              <article key={c.id} style={{ background: "rgba(255,255,255,0.8)", borderRadius: 20, padding: 18 }}>
                <div style={{ fontWeight: 700, fontFamily: "var(--font-display)", fontSize: 18 }}>{c.name}</div>
                <p style={{ lineHeight: 1.5, color: "var(--ink-soft)" }}>
                  Hi {c.name.split(" ")[0]} — your {c.matched[0]} work at {c.company} caught my eye for our Backend Engineer role on Platform.
                  Would you be open to a short conversation this week?
                </p>
              </article>
            ))}
          </div>
          <button type="button" onClick={a.sendOutreach} disabled={a.outreachApproved} style={{ ...pillDark, marginTop: 16 }}>
            {a.outreachApproved ? "Sent — I’ll watch replies" : "Approve & send"}
          </button>
        </section>
      )}
      <style>{`
        .standup-hero {
          animation: standupIn 400ms var(--ease-out) both;
        }
        @keyframes standupIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .standup-hero { animation: none !important; }
        }
      `}</style>
    </ShellFrame>
  );
}

const pillDark: CSSProperties = {
  border: 0,
  background: "var(--ink)",
  color: "#fff",
  padding: "12px 16px",
  borderRadius: 999,
  fontWeight: 700,
};

const pillLight: CSSProperties = {
  border: "1px solid var(--line)",
  background: "#fff",
  color: "var(--ink)",
  padding: "12px 16px",
  borderRadius: 999,
  fontWeight: 600,
};
