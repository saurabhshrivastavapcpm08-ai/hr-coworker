import { Link } from "react-router-dom";

const sections = [
  { id: "problem", label: "Problem" },
  { id: "insight", label: "Insight" },
  { id: "solution", label: "Solution" },
  { id: "journeys", label: "Journeys" },
  { id: "metrics", label: "Metrics" },
  { id: "roadmap", label: "Roadmap" },
];

export function CaseStudy() {
  return (
    <div className="case">
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header className="case-nav">
        <div className="brand">Tara</div>
        <nav aria-label="Case study">
          {sections.map((s) => (
            <a key={s.id} href={`#${s.id}`}>
              {s.label}
            </a>
          ))}
        </nav>
        <Link className="cta" to="/prototype">
          Open prototype
        </Link>
      </header>

      <main id="main">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">Product case study · AI coworker</p>
            <h1>
              Tara
              <span> turns recruitment chaos into clarity.</span>
            </h1>
            <p className="lede">
              An AI junior teammate that orchestrates Zoho, LinkedIn, Naukri, Outlook, Slack, and WhatsApp — so recruiters
              spend time on judgment, not grunt work.
            </p>
            <div className="hero-actions">
              <Link className="cta solid" to="/prototype">
                Explore interactive prototype
              </Link>
              <a className="cta ghost" href="#problem">
                Read the story
              </a>
            </div>
          </div>
          <div className="hero-visual" aria-hidden>
            <div className="hero-panel">
              <div className="pulse" />
              <p className="panel-kicker">Tara Home · standup</p>
              <p className="panel-line">Sourced 32 candidates for Backend Engineer; 9 ready for review.</p>
              <p className="panel-line">Drafted outreach for 4 candidates — waiting on approve & send.</p>
              <p className="panel-line">Pipeline briefings for 4 open roles drafted for hiring managers.</p>
            </div>
          </div>
        </section>

        <section id="problem" className="block">
          <h2>The problem</h2>
          <p className="section-lede">
            Recruiters aren’t held back by intent — they’re crushed by overloaded, fragmented, manual workflows.
          </p>
          <div className="pain-grid">
            {[
              ["Context switching", "Naukri, LinkedIn, ATS, email, Slack, WhatsApp, and drive-by manager pings — all day."],
              ["Screening volume", "Hundreds of applications; skim-reading means strong profiles go untouched."],
              ["Scheduling hell", "Outlook, Google, WhatsApp calendars collide; afternoons vanish confirming slots."],
              ["Follow-ups slip", "Personalization works, but the second nudge dies when the day gets hectic."],
              ["Reporting scramble", "Weekly reviews start with fixing stages and reconciling spreadsheets."],
              ["Human touches fade", "Speed vs quality vs fairness — thoughtful rejections disappear first."],
            ].map(([t, d]) => (
              <article key={t}>
                <h3>{t}</h3>
                <p>{d}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="insight" className="block alt">
          <h2>The insight</h2>
          <blockquote>
            Tara is not another ATS feature or candidate chatbot. She’s a cross-tool junior recruiter — she does the
            legwork, shows her work, and asks for judgment where it matters.
          </blockquote>
          <div className="insight-row">
            <div>
              <h3>Positioning</h3>
              <p>AI coworker on top of the existing stack — Zoho + LinkedIn + job boards + email + chat.</p>
            </div>
            <div>
              <h3>Not competing as</h3>
              <p>Monolithic ATS replacement, candidate-facing chatbot (Paradox), or enterprise talent graph (Eightfold).</p>
            </div>
            <div>
              <h3>India-first reality</h3>
              <p>WhatsApp-first nudges, Naukri, mixed calendars, working-hours awareness, cultural tone.</p>
            </div>
          </div>
        </section>

        <section id="solution" className="block">
          <h2>Day-1 skillset</h2>
          <p className="section-lede">Ship a junior who is insanely fast — not a platform launch.</p>
          <ol className="skills">
            {[
              ["JD → shortlist", "Enable Tara on a role; she builds a role brief and hunts across ATS, LinkedIn, Naukri, and internal mobility."],
              ["Explainable picks", "Every candidate ships with why / risks / source. Humans still click the irreversible buttons."],
              ["Personalized outreach", "Drafts land in Outlook; Tara watches replies and surfaces who’s interested."],
              ["Interview logistics", "Propose slots from Outlook calendars; confirm once; invites + Slack DMs go out."],
              ["Daily story", "Tara Home narrates what moved, what’s stuck, and drafts manager briefings."],
            ].map(([t, d], i) => (
              <li key={t}>
                <span className="num">{i + 1}</span>
                <div>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section id="journeys" className="block alt">
          <h2>Four journeys with Aditi</h2>
          <div className="journey-grid">
            {[
              ["01", "JD chaos → clean shortlist", "Approve a role brief; Tara fans out via MCP; review an explainable shortlist."],
              ["02", "Outreach that isn’t spam", "Select candidates; edit drafts; Approve & Send. Tara monitors threads."],
              ["03", "Scheduling without hell", "Propose slots, confirm once, keep Interview Schedule Overview clean."],
              ["04", "Day ends, story stays straight", "Standup on Tara Home + pipeline briefings managers can actually read."],
            ].map(([n, t, d]) => (
              <article key={n}>
                <div className="j-num">{n}</div>
                <h3>{t}</h3>
                <p>{d}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="metrics" className="block">
          <h2>How we’ll know it works</h2>
          <p className="section-lede success-quote">“If Tara disappeared tomorrow, recruiters would feel it.”</p>
          <div className="metric-grid">
            {[
              ["Time-to-shortlist", "↓ 50%", "Enable Tara → shortlist approved"],
              ["Recruiter hours", "10–15 hrs/wk", "Sourcing, outreach, scheduling, reporting"],
              ["Outreach response", "> 40%", "vs typical 15–25%"],
              ["HM briefing score", "4.0+", "Clarity, completeness, actionability"],
            ].map(([k, v, d]) => (
              <article key={k}>
                <div className="metric-val">{v}</div>
                <h3>{k}</h3>
                <p>{d}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="roadmap" className="block alt">
          <h2>Trust-first rollout</h2>
          <div className="roadmap">
            {[
              ["Month 1", "Pilot", "2–3 recruiters, handful of roles. Watch where Tara saves time — and where she gets in the way."],
              ["Months 2–3", "Same playbook", "Bigger TA slice. Outreach + scheduling become normal, not a demo."],
              ["Months 4–6", "New teams / geos", "Localize templates. Formalize bias checks and activity-log reviews."],
              ["Months 6–12", "Default entry point", "Recruiters start in Tara. Narrow autonomy where trust is proven."],
            ].map(([when, title, body]) => (
              <article key={when}>
                <div className="when">{when}</div>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
          <div className="not-doing">
            <h3>Deliberately not in v1</h3>
            <ul>
              <li>Fully autonomous candidate chatbots on the career site</li>
              <li>Auto-rejects or final hiring decisions</li>
              <li>Complex panel orchestration</li>
              <li>Company-wide talent graph in month 3</li>
            </ul>
          </div>
        </section>

        <section className="block close">
          <h2>Prototype the coworker</h2>
          <p>
            Three interaction directions for Tara Home → explainable shortlist → outreach approval. Flip with keys 1–3.
          </p>
          <Link className="cta solid" to="/prototype">
            Launch prototype
          </Link>
        </section>
      </main>

      <footer className="case-foot">
        <span>Tara · Recruitment Coworker</span>
        <span>Human-in-the-loop · Explainability first · Cross-system orchestration</span>
      </footer>

      <style>{caseCss}</style>
    </div>
  );
}

const caseCss = `
  .case { color: var(--ink); }
  .skip {
    position: absolute; left: -999px; top: 0;
  }
  .skip:focus { left: 12px; top: 12px; background: #fff; padding: 8px 12px; z-index: 10; }
  .case-nav {
    position: sticky; top: 0; z-index: 20;
    display: flex; align-items: center; gap: 18px;
    padding: 14px 22px;
    background: rgba(247,248,250,0.78);
    backdrop-filter: blur(18px) saturate(160%);
    border-bottom: 1px solid var(--line);
  }
  .brand {
    font-family: var(--font-display);
    font-weight: 800;
    letter-spacing: -0.04em;
    font-size: 1.35rem;
  }
  .case-nav nav { display: flex; gap: 14px; flex: 1; flex-wrap: wrap; }
  .case-nav a { text-decoration: none; font-size: 13px; color: var(--ink-soft); font-weight: 600; }
  .cta {
    text-decoration: none;
    font-weight: 700;
    font-size: 13px;
    padding: 10px 14px;
    border-radius: 999px;
    border: 1px solid var(--line);
    background: #fff;
    transition: transform 140ms var(--ease-out);
  }
  .cta.solid { background: var(--ink); color: #fff; border-color: transparent; }
  .cta.ghost { background: transparent; }
  .hero {
    display: grid;
    grid-template-columns: 1.15fr 0.85fr;
    gap: 28px;
    padding: clamp(40px, 8vw, 88px) 22px 48px;
    max-width: 1180px;
    margin: 0 auto;
    align-items: center;
    min-height: min(86dvh, 820px);
  }
  .eyebrow {
    margin: 0 0 12px;
    font-size: 12px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    font-weight: 700;
    color: var(--accent);
  }
  .hero h1 {
    font-family: var(--font-display);
    font-size: clamp(3rem, 8vw, 5.6rem);
    letter-spacing: -0.055em;
    line-height: 0.95;
    margin: 0 0 18px;
  }
  .hero h1 span { display: block; color: var(--ink-soft); font-size: 0.42em; letter-spacing: -0.03em; margin-top: 14px; line-height: 1.15; max-width: 18ch; }
  .lede { font-size: clamp(1.05rem, 2vw, 1.25rem); line-height: 1.45; color: var(--ink-soft); max-width: 38ch; }
  .hero-actions { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 22px; }
  .hero-visual { position: relative; min-height: 320px; }
  .hero-panel {
    position: absolute; inset: 8% 0 auto auto; width: min(100%, 420px);
    background: rgba(20,24,32,0.92);
    color: #fff;
    border-radius: 24px;
    padding: 22px;
    box-shadow: 0 30px 80px rgba(20,24,32,0.28);
    animation: rise 700ms var(--ease-out) both;
  }
  .pulse {
    width: 10px; height: 10px; border-radius: 50%;
    background: #5dcfb0; margin-bottom: 14px;
    box-shadow: 0 0 0 0 rgba(93,207,176,0.6);
    animation: pulse 2.4s var(--ease-out) infinite;
  }
  .panel-kicker { opacity: 0.55; font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; margin: 0 0 12px; }
  .panel-line { margin: 0 0 12px; line-height: 1.4; font-size: 15px; }
  @keyframes rise {
    from { opacity: 0; transform: translateY(16px) scale(0.98); }
    to { opacity: 1; transform: none; }
  }
  @keyframes pulse {
    0% { box-shadow: 0 0 0 0 rgba(93,207,176,0.55); }
    70% { box-shadow: 0 0 0 14px rgba(93,207,176,0); }
    100% { box-shadow: 0 0 0 0 rgba(93,207,176,0); }
  }
  .block { padding: 72px 22px; max-width: 1100px; margin: 0 auto; }
  .block.alt { max-width: none; padding-left: max(22px, calc(50vw - 550px)); padding-right: max(22px, calc(50vw - 550px)); background: rgba(255,255,255,0.45); border-block: 1px solid var(--line); }
  .block h2 { font-family: var(--font-display); letter-spacing: -0.04em; font-size: clamp(1.8rem, 4vw, 2.6rem); margin: 0 0 10px; }
  .section-lede { color: var(--ink-soft); font-size: 1.15rem; max-width: 48ch; }
  .success-quote { font-family: var(--font-display); font-weight: 700; color: var(--ink); letter-spacing: -0.02em; }
  .pain-grid, .insight-row, .journey-grid, .metric-grid, .roadmap {
    display: grid; gap: 16px; margin-top: 28px;
  }
  .pain-grid { grid-template-columns: repeat(3, minmax(0,1fr)); }
  .pain-grid article, .journey-grid article, .metric-grid article, .roadmap article {
    padding: 18px 0;
    border-top: 1px solid var(--line);
  }
  .pain-grid h3, .insight-row h3, .journey-grid h3, .metric-grid h3, .roadmap h3, .skills h3 {
    margin: 0 0 6px; font-size: 1.05rem; letter-spacing: -0.02em;
  }
  .pain-grid p, .insight-row p, .journey-grid p, .metric-grid p, .roadmap p, .skills p {
    margin: 0; color: var(--ink-soft); line-height: 1.45;
  }
  .insight-row { grid-template-columns: repeat(3, minmax(0,1fr)); }
  blockquote {
    margin: 18px 0 0;
    padding: 0;
    border: 0;
    font-family: var(--font-display);
    font-size: clamp(1.35rem, 3vw, 1.9rem);
    letter-spacing: -0.03em;
    line-height: 1.25;
    max-width: 22ch;
  }
  .skills { list-style: none; padding: 0; margin: 28px 0 0; display: grid; gap: 18px; }
  .skills li { display: grid; grid-template-columns: 48px 1fr; gap: 14px; align-items: start; }
  .num {
    width: 48px; height: 48px; border-radius: 14px;
    display: grid; place-items: center;
    background: var(--accent-soft); color: var(--accent);
    font-family: var(--font-display); font-weight: 800;
  }
  .journey-grid { grid-template-columns: repeat(2, minmax(0,1fr)); }
  .j-num { font-family: var(--font-display); font-size: 2rem; letter-spacing: -0.04em; color: var(--accent); }
  .metric-grid { grid-template-columns: repeat(4, minmax(0,1fr)); }
  .metric-val { font-family: var(--font-display); font-size: 2rem; letter-spacing: -0.04em; font-weight: 800; }
  .roadmap { grid-template-columns: repeat(4, minmax(0,1fr)); }
  .when { font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; font-weight: 700; color: var(--accent); }
  .not-doing { margin-top: 36px; }
  .not-doing ul { color: var(--ink-soft); line-height: 1.6; }
  .close { text-align: left; padding-bottom: 96px; }
  .case-foot {
    display: flex; justify-content: space-between; gap: 12px; flex-wrap: wrap;
    padding: 18px 22px 28px; border-top: 1px solid var(--line);
    color: var(--ink-soft); font-size: 13px;
  }
  @media (max-width: 900px) {
    .hero { grid-template-columns: 1fr; min-height: auto; }
    .hero-visual { min-height: 260px; }
    .hero-panel { position: relative; inset: auto; width: 100%; }
    .pain-grid, .insight-row, .metric-grid, .roadmap { grid-template-columns: 1fr 1fr; }
    .case-nav nav { display: none; }
  }
  @media (max-width: 560px) {
    .pain-grid, .insight-row, .journey-grid, .metric-grid, .roadmap { grid-template-columns: 1fr; }
  }
  @media (prefers-reduced-motion: reduce) {
    .hero-panel, .pulse { animation: none; }
  }
`;
