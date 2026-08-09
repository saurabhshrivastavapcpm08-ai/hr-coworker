# Tara — Product Case Study

**An AI coworker that transforms recruitment workflows from chaos to clarity.**

> Tara is not just another AI tool—she's the junior teammate every recruiter wishes they had, handling the grunt work so humans can focus on judgment and conversations.

**Interactive prototype:** run `cd prototype && npm run dev`, then open `/prototype`.

---

## 1. Problem

Across most teams, HR and recruitment are not held back by intent or effort, but by day-to-day workflows that are overloaded, fragmented, and heavily manual.

### Major pain points

1. **Too many roles, tools, and context switches** — Naukri, LinkedIn, ATS, email, Slack/Teams, WhatsApp, and drive-by manager pings.
2. **Sourcing and screening at exhausting volume** — hundreds of applications; skim-reading means strong profiles go untouched.
3. **Coordination and scheduling chaos** — mixed calendars (Outlook, Google, WhatsApp); afternoons spent confirming slots.
4. **Outreach, personalization, and follow-ups** — personalization works, but second/third nudges slip first when the day gets hectic.
5. **Data quality and reporting overhead** — weekly hiring reviews start with fixing stages and reconciling spreadsheets.
6. **Balancing speed, quality, fairness, and experience** — human touches (thoughtful rejections, timely updates) quietly disappear.

---

## 2. Insight & positioning

**Core principle:** Tara behaves like a junior recruiter—doing the legwork across systems, showing her work, and asking for judgment where it really matters.

**Key differentiator:** Unlike ATS features or candidate chatbots, Tara orchestrates across Zoho, LinkedIn, Outlook, Slack, WhatsApp (and Naukri / internal mobility), acting as a **cross-tool junior recruiter**, not an in-product feature.

### Competitive stance

| Positioning | vs | Tara difference |
| --- | --- | --- |
| AI coworker on top of Zoho + stack | Zoho Recruit + Zia | Cross-tool orchestration, not ATS-only AI |
| Coordinator for recruiters | Paradox (Olivia) | Recruiter-facing first; candidate chat is optional later |
| Operational TA coworker | Eightfold | Day-to-day actions (source, draft, brief) over talent-graph strategy |
| Unifying agent on existing stack | hireEZ / TurboHire / etc. | One UX tied to "Today with Tara" tasks + explainable actions |

**India-first design:** WhatsApp-first communication, Naukri, multiple calendar systems, working hours and cultural tone.

---

## 3. Solution (MVP / 0–3 months)

Day-one bar: *"If Tara disappeared tomorrow, recruiters would feel it."*

### Skillset

1. **JD → shortlist** — Enable Tara on a role → editable role brief → multi-portal sourcing.
2. **Explainable shortlists** — match reasons, risks, source; human decides.
3. **Personalized outreach** — Outlook drafts, reply watching, "these N are interested."
4. **Interview scheduling** — propose slots from calendars; confirm once; keep schedule overview tidy.
5. **Daily summaries & briefings** — Tara Home standup + manager pipeline drafts.

### Explicitly not in v1

- Fully autonomous candidate chatbot on the career site
- Auto-rejects or final hiring decisions
- Over-engineered panel orchestration
- Company-wide talent graph in month 3

### Design principles

- **Human-in-the-loop** for shortlist, outreach, scheduling, briefings
- **Explainability first** — every recommendation + audit trail
- **Cross-system orchestration** via MCP actions
- **Continuous learning** from recruiter feedback

---

## 4. User journeys (persona: Aditi, recruiter)

1. **JD chaos → clean shortlist** — Approve role brief; Tara fans out; review explainable shortlist with feedback ("too senior").
2. **Outreach that doesn’t feel like spam** — Select → edit drafts → Approve & Send; Tara monitors replies and pings Slack.
3. **Scheduling without back-and-forth hell** — Propose slots, confirm once, DM interviewers, remind candidates.
4. **Day ends, story stays straight** — Tara Home standup + weekly pipeline briefing emails.

---

## 5. Metrics

### Primary KPIs

| KPI | Target |
| --- | --- |
| Time-to-shortlist | ↓ 50% vs baseline |
| Recruiter hours saved | 10–15 hrs / week |
| Outreach response rate | > 40% (vs 15–25% typical) |
| HM briefing satisfaction | 4.0+ / 5; 100% on-time |

### Secondary

Shortlist acceptance rate, feedback incorporation speed, source diversity, uptime/error rate, audit completeness, bias flags, candidate NPS.

---

## 6. Rollout (trust relationship, not feature stacking)

| Phase | Scope | Success signal |
| --- | --- | --- |
| Month 1 Pilot | 2–3 recruiters, handful of roles | “I’d miss this if it went away” |
| Months 2–3 | Larger TA slice | 5+ hrs/week saved; 60%+ shortlist acceptance |
| Months 4–6 | New teams / geos | Governance + localization; no bias flags |
| Months 6–12 | Default entry point | 80%+ start day in Tara |

---

## 7. Prototype notes

Three divergent UI directions explore the same brief:

1. **Quiet Desk** — restrained, border-led daily tool
2. **Standup Board** — narrative coworker briefing
3. **Command Surface** — translucent materials + interruptible candidate sheet (Apple-style springs / velocity handoff)

Libraries (curated): Motion, Zustand, Sonner, clsx, React Router.

Motion policy: press feedback and occasional entrances only; no animation on high-frequency keyboard flips between variants.
