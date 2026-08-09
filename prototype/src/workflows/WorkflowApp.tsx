import {
  AppChrome,
  EmptyHint,
  PageHeader,
  Score,
  SourceChip,
  btnAccent,
  btnGhost,
  btnPrimary,
  useTaraActions,
} from "../components/shared";

export function WorkflowApp({ tone = "solid" }: { tone?: "solid" | "glass" | "editorial" }) {
  const a = useTaraActions();

  return (
    <AppChrome tone={tone}>
      {a.view === "home" && <HomeView />}
      {a.view === "brief" && <BriefView />}
      {a.view === "job" && <ShortlistView />}
      {a.view === "outreach" && <OutreachView />}
      {a.view === "schedule" && <ScheduleView />}
      {a.view === "briefing" && <BriefingView />}
      {a.view === "activity" && <ActivityView />}
    </AppChrome>
  );
}

function HomeView() {
  const a = useTaraActions();
  return (
    <section>
      <PageHeader
        eyebrow="Today with Tara"
        title={a.standup.greeting}
        description="I did the legwork across your stack. You decide what moves next."
      />

      <div style={{ display: "grid", gridTemplateColumns: "1.3fr 0.7fr", gap: 14 }} className="home-grid">
        <div style={{ display: "grid", gap: 10 }}>
          {a.standup.tasks.map((t) => (
            <button
              key={t.id}
              type="button"
              className="hover-lift"
              onClick={() => a.setView(t.view)}
              style={{
                textAlign: "left",
                border: "1px solid var(--line)",
                borderRadius: 16,
                padding: 16,
                background: t.urgent ? "rgba(42,107,90,0.08)" : "rgba(255,255,255,0.7)",
                transition: "transform 150ms var(--ease-out)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                <div style={{ fontWeight: 700 }}>{t.label}</div>
                {t.urgent && <span style={{ fontSize: 12, fontWeight: 700, color: "var(--warn)" }}>Needs you</span>}
              </div>
              <div style={{ fontSize: 13, color: "var(--ink-soft)", marginTop: 4 }}>{t.meta}</div>
            </button>
          ))}
        </div>

        <aside style={{ display: "grid", gap: 12 }}>
          <div style={{ borderRadius: 16, padding: 16, background: "var(--ink)", color: "#fff" }}>
            <div style={{ opacity: 0.65, fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase" }}>Standup</div>
            <ul style={{ margin: "10px 0 0", padding: 0, listStyle: "none", display: "grid", gap: 10 }}>
              {a.standup.lines.map((line) => (
                <li key={line} style={{ fontSize: 14, lineHeight: 1.4, opacity: 0.92 }}>
                  {line}
                </li>
              ))}
            </ul>
          </div>
          <div style={{ borderRadius: 16, padding: 16, border: "1px solid var(--line)", background: "rgba(255,255,255,0.7)" }}>
            <div style={{ fontWeight: 700, marginBottom: 8 }}>Open roles</div>
            {a.jobs.map((j) => (
              <div key={j.id} style={{ display: "flex", justifyContent: "space-between", gap: 8, padding: "8px 0", borderTop: "1px solid var(--line)", fontSize: 13 }}>
                <span>{j.title}</span>
                <span style={{ color: j.health === "warn" ? "var(--warn)" : "var(--accent)", fontWeight: 600 }}>{j.stage}</span>
              </div>
            ))}
          </div>
        </aside>
      </div>
      <style>{`@media (max-width: 860px){ .home-grid{ grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

function BriefView() {
  const a = useTaraActions();
  return (
    <section>
      <PageHeader
        eyebrow="Workflow 1 · JD → criteria"
        title="Approve the role brief"
        description="Tara parsed the Zoho JD into must-haves, nice-to-haves, and exclusions. Edit by approving as-is for the MVP demo."
        action={
          a.briefApproved ? (
            <button type="button" style={btnGhost} onClick={() => a.setView("job")}>
              Continue to shortlist
            </button>
          ) : (
            <button type="button" style={btnAccent} onClick={a.approveBrief}>
              Approve & source
            </button>
          )
        }
      />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }} className="brief-grid">
        <BriefCard title="Must-haves" items={a.brief.must} />
        <BriefCard title="Nice-to-haves" items={a.brief.nice} />
        <BriefCard title="Target companies" items={a.brief.companies} />
        <BriefCard title="Exclude / guardrails" items={a.brief.exclude} tone="warn" />
      </div>

      <div style={{ marginTop: 14, fontSize: 13, color: "var(--ink-soft)" }}>
        Sources Tara will fan out to: {a.brief.sources.join(" · ")}
      </div>

      {a.briefApproved && (
        <div style={{ marginTop: 16 }}>
          <EmptyHint>Brief approved. Tara already prepared an explainable shortlist — review next.</EmptyHint>
        </div>
      )}
      <style>{`@media (max-width: 720px){ .brief-grid{ grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

function BriefCard({ title, items, tone }: { title: string; items: string[]; tone?: "warn" }) {
  return (
    <div style={{ borderRadius: 16, padding: 16, border: "1px solid var(--line)", background: "rgba(255,255,255,0.72)" }}>
      <div style={{ fontWeight: 700, marginBottom: 10, color: tone === "warn" ? "var(--warn)" : "var(--ink)" }}>{title}</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {items.map((item) => (
          <span
            key={item}
            style={{
              fontSize: 13,
              fontWeight: 600,
              padding: "6px 10px",
              borderRadius: 999,
              background: tone === "warn" ? "rgba(155,59,59,0.08)" : "var(--accent-soft)",
              color: tone === "warn" ? "var(--danger)" : "var(--accent)",
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function ShortlistView() {
  const a = useTaraActions();

  if (!a.briefApproved) {
    return (
      <section>
        <PageHeader eyebrow="Workflow 2 · Shortlist" title="Shortlist waiting on role brief" />
        <EmptyHint>
          Approve the role brief first so Tara knows what “good” looks like.{" "}
          <button type="button" onClick={() => a.setView("brief")} style={{ ...btnGhost, marginLeft: 8 }}>
            Review brief
          </button>
        </EmptyHint>
      </section>
    );
  }

  return (
    <section>
      <PageHeader
        eyebrow="Workflow 2 · Explainable shortlist"
        title={`Shortlist for ${a.job.title}`}
        description="Every pick shows why, risks, and source. Accept who should get outreach — Tara never moves stages alone."
        action={
          <button
            type="button"
            style={{ ...btnAccent, opacity: a.accepted.length ? 1 : 0.45 }}
            disabled={!a.accepted.length}
            onClick={() => a.setView("outreach")}
          >
            Reach out · {a.accepted.length}
          </button>
        }
      />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0,1fr))", gap: 10, marginBottom: 16 }} className="stats">
        {[
          ["Sourced", a.job.sourced],
          ["Reviewed", a.accepted.length + a.rejected.length],
          ["Accepted", a.accepted.length],
          ["Passed", a.rejected.length],
        ].map(([k, v]) => (
          <div key={String(k)} style={{ borderTop: "2px solid var(--ink)", paddingTop: 8 }}>
            <div style={{ fontSize: 12, color: "var(--ink-soft)" }}>{k}</div>
            <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.03em" }}>{v}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gap: 10 }}>
        {a.candidates.map((c) => {
          const state = a.feedback[c.id];
          const open = a.selected?.id === c.id;
          return (
            <article
              key={c.id}
              style={{
                borderRadius: 16,
                border: open ? "1px solid var(--accent)" : "1px solid var(--line)",
                background: "rgba(255,255,255,0.78)",
                padding: 14,
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
                  gridTemplateColumns: "56px 1fr auto",
                  gap: 12,
                  textAlign: "left",
                  alignItems: "center",
                  padding: 0,
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 14,
                    display: "grid",
                    placeItems: "center",
                    background: "var(--accent-soft)",
                    color: "var(--accent)",
                    fontSize: 18,
                  }}
                >
                  <Score value={c.score} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 16 }}>
                    {c.name} <span style={{ color: "var(--ink-soft)", fontWeight: 500 }}>· {c.title}</span>
                  </div>
                  <div style={{ fontSize: 13, color: "var(--ink-soft)" }}>
                    {c.company} · {c.location} · <SourceChip source={c.source} />
                  </div>
                </div>
                <div style={{ fontSize: 12, fontWeight: 700, color: state === "accept" ? "var(--good)" : state === "reject" ? "var(--danger)" : "var(--ink-soft)" }}>
                  {state === "accept" ? "Accepted" : state === "reject" ? "Passed" : c.tier}
                </div>
              </button>

              {open && (
                <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid var(--line)" }}>
                  <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 6 }}>
                    Why Tara picked this person
                  </div>
                  <p style={{ margin: "0 0 10px", lineHeight: 1.5 }}>{c.why}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
                    {c.matched.map((m) => (
                      <span key={m} style={{ fontSize: 12, fontWeight: 600, padding: "5px 9px", borderRadius: 999, background: "var(--accent-soft)", color: "var(--accent)" }}>
                        {m}
                      </span>
                    ))}
                  </div>
                  {c.risks.map((r) => (
                    <div key={r} style={{ fontSize: 13, color: "var(--warn)", marginBottom: 10 }}>
                      Risk · {r}
                    </div>
                  ))}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    <button type="button" style={btnPrimary} onClick={() => a.accept(c.id)}>
                      Accept for outreach
                    </button>
                    <button type="button" style={btnGhost} onClick={() => a.reject(c.id, "Too senior")}>
                      Too senior
                    </button>
                    <button type="button" style={btnGhost} onClick={() => a.reject(c.id, "Wrong domain")}>
                      Wrong domain
                    </button>
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
      <style>{`@media (max-width: 720px){ .stats{ grid-template-columns: repeat(2, minmax(0,1fr)) !important; } }`}</style>
    </section>
  );
}

function OutreachView() {
  const a = useTaraActions();
  const targets = a.accepted.length ? a.accepted : [];

  return (
    <section>
      <PageHeader
        eyebrow="Workflow 3 · Outreach"
        title="Approve personalized outreach"
        description="Drafts sit in Outlook until you say go. Tara never sends the first batch alone."
        action={
          <button type="button" style={btnAccent} disabled={!targets.length || a.outreachApproved} onClick={a.sendOutreach}>
            {a.outreachApproved ? "Sent" : `Approve & send · ${targets.length}`}
          </button>
        }
      />

      {!targets.length ? (
        <EmptyHint>
          No accepted candidates yet.{" "}
          <button type="button" style={btnGhost} onClick={() => a.setView("job")}>
            Review shortlist
          </button>
        </EmptyHint>
      ) : (
        <div style={{ display: "grid", gap: 12 }}>
          {targets.map((c) => (
            <article key={c.id} style={{ borderRadius: 16, border: "1px solid var(--line)", padding: 16, background: "rgba(255,255,255,0.78)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
                <div>
                  <div style={{ fontWeight: 700 }}>{c.name}</div>
                  <div style={{ fontSize: 13, color: "var(--ink-soft)" }}>
                    To Outlook Drafts · WhatsApp nudge queued · <SourceChip source={c.source} />
                  </div>
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: "var(--accent)" }}>Personalized</span>
              </div>
              <p style={{ margin: "12px 0 0", lineHeight: 1.5, color: "var(--ink-soft)" }}>{c.emailPreview}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

function ScheduleView() {
  const a = useTaraActions();

  return (
    <section>
      <PageHeader
        eyebrow="Workflow 4 · Scheduling"
        title="Confirm interview slots"
        description="Tara checked Outlook calendars, working hours, and soft conflicts. One confirmation books invites + Slack DMs."
        action={
          <button type="button" style={btnAccent} disabled={a.scheduleConfirmed} onClick={a.confirmSchedule}>
            {a.scheduleConfirmed ? "Confirmed" : "Confirm selected slot"}
          </button>
        }
      />

      {!a.outreachApproved && (
        <div style={{ marginBottom: 12 }}>
          <EmptyHint>Tip: outreach usually lands before scheduling — you can still preview slots now.</EmptyHint>
        </div>
      )}

      <div style={{ display: "grid", gap: 10 }}>
        {a.slots.map((slot) => {
          const selected = a.selectedSlotId === slot.id;
          return (
            <button
              key={slot.id}
              type="button"
              onClick={() => a.setSelectedSlotId(slot.id)}
              style={{
                textAlign: "left",
                borderRadius: 16,
                border: selected ? "2px solid var(--accent)" : "1px solid var(--line)",
                padding: 16,
                background: selected ? "rgba(42,107,90,0.08)" : "rgba(255,255,255,0.78)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
                <div>
                  <div style={{ fontWeight: 700 }}>
                    {slot.day} · {slot.time}
                  </div>
                  <div style={{ fontSize: 13, color: "var(--ink-soft)", marginTop: 4 }}>{slot.interviewers.join(" · ")}</div>
                </div>
                {slot.recommended && <span style={{ fontSize: 12, fontWeight: 700, color: "var(--accent)" }}>Recommended</span>}
              </div>
              {slot.conflict && (
                <div style={{ marginTop: 8, fontSize: 13, color: "var(--warn)" }}>Soft conflict · {slot.conflict}</div>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}

function BriefingView() {
  const a = useTaraActions();
  const text = a.briefingEdited ?? a.briefing.body;

  return (
    <section>
      <PageHeader
        eyebrow="Workflow 5 · Hiring manager visibility"
        title="Send pipeline briefing"
        description={`Draft for ${a.briefing.to}. Edit freely — Tara learns which metrics managers care about.`}
        action={
          <button type="button" style={btnAccent} disabled={a.briefingSent} onClick={a.sendBriefing}>
            {a.briefingSent ? "Sent" : "Send briefing"}
          </button>
        }
      />

      <label style={{ display: "grid", gap: 8 }}>
        <span style={{ fontSize: 13, fontWeight: 700 }}>Subject · {a.briefing.subject}</span>
        <textarea
          value={text}
          onChange={(e) => a.setBriefingEdited(e.target.value)}
          rows={12}
          style={{
            width: "100%",
            borderRadius: 16,
            border: "1px solid var(--line)",
            padding: 16,
            resize: "vertical",
            background: "rgba(255,255,255,0.85)",
            lineHeight: 1.5,
            font: "inherit",
          }}
        />
      </label>
    </section>
  );
}

function ActivityView() {
  const a = useTaraActions();
  return (
    <section>
      <PageHeader
        eyebrow="Trust · explainability"
        title="Activity log"
        description="Every MCP call, ranking decision, and human override is logged. This is how Tara earns autonomy over time."
      />
      <div style={{ display: "grid", gap: 0, borderTop: "1px solid var(--line)" }}>
        {a.activity.map((row) => (
          <div key={row.id} style={{ display: "grid", gridTemplateColumns: "64px 1fr", gap: 12, padding: "14px 0", borderBottom: "1px solid var(--line)" }}>
            <div style={{ fontVariantNumeric: "tabular-nums", color: "var(--ink-soft)", fontSize: 13 }}>{row.when}</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 13, color: "var(--accent)" }}>{row.tool}</div>
              <div style={{ marginTop: 2, color: "var(--ink-soft)" }}>{row.summary}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 16, display: "flex", gap: 8, flexWrap: "wrap" }}>
        <span style={{ fontSize: 12, fontWeight: 700, padding: "6px 10px", borderRadius: 999, background: "var(--accent-soft)", color: "var(--accent)" }}>
          Protected attributes ignored
        </span>
        <span style={{ fontSize: 12, fontWeight: 700, padding: "6px 10px", borderRadius: 999, background: "rgba(255,255,255,0.8)", border: "1px solid var(--line)" }}>
          Human approval required for irreversible actions
        </span>
      </div>
    </section>
  );
}
