# Tara — Product Case Study

**An AI coworker that transforms recruitment workflows from chaos to clarity.**

> Tara is not just another AI tool—she's the junior teammate every recruiter wishes they had, handling the grunt work so humans can focus on judgment and conversations.

**Interactive prototype:** `cd prototype && npm run dev` → `/prototype`

Walk the loop: **Role brief → Shortlist → Outreach → Schedule → HM briefing → Activity log**.

---

## 1. Problem

Recruitment fails on overloaded, fragmented, manual workflows—not intent.

1. Too many roles / tools / context switches  
2. Exhausting sourcing & screening volume  
3. Scheduling chaos across calendars  
4. Personalization & follow-ups that slip  
5. Reporting / data-quality scramble  
6. Speed vs quality vs fairness trade-offs that erase human touches  

---

## 2. Users & JTBD

| Persona | Job to be done | v1 posture |
| --- | --- | --- |
| **Aditi · Recruiter (primary)** | Get from JD to trustworthy shortlist and keep threads moving without babysitting a bot | Control surface |
| **Priya · Hiring manager** | Get plain-language pipeline truth she can act on | Beneficiary via briefings |
| **Candidate (indirect)** | Timely, human-sounding outreach and clear next steps | Drafts only; human approves first touch |

North-star adoption signal: recruiters start the day in Tara and ask “what did Tara find?” before manual sourcing.

---

## 3. Insight & positioning

**Core principle:** junior recruiter across systems — shows work, asks for judgment.

**Differentiator:** cross-tool orchestration (Zoho, LinkedIn, Naukri, Outlook, Slack, WhatsApp), not an ATS feature or candidate chatbot.

India-first: WhatsApp, Naukri, mixed calendars, working-hours & tone.

---

## 4. Prioritization

Scored on **recruiter hours returned × trust earned**.

| Opportunity | v1 call |
| --- | --- |
| JD → explainable shortlist | Must |
| Personalized outreach + reply watch | Must |
| Interview slot proposal | Must |
| HM pipeline briefing | Must |
| Careers-site candidate chatbot | Not v1 |
| Auto-reject / auto-stage | Never without human |
| Company talent graph | Later |

### Principles
1. Coworker, not feature  
2. Show the work  
3. Humans own irreversible actions  
4. Integrate, don’t replace  

---

## 5. Solution workflows (prototype)

1. **Role brief** — approve must/nice/exclude before sourcing  
2. **Explainable shortlist** — why / risk / source; accept or pass with reasons  
3. **Outreach** — Outlook drafts + WhatsApp nudges; approve & send  
4. **Schedule** — conflict-aware slots; one confirm → invites + Slack DMs  
5. **HM briefing** — editable plain-language update  
6. **Activity log** — MCP audit trail for trust & compliance  

---

## 6. Metrics

| KPI | Target |
| --- | --- |
| Time-to-shortlist | ↓ 50% |
| Recruiter hours saved | 10–15 / week |
| Outreach response | > 40% |
| HM briefing satisfaction | 4.0+ |

Leading (pilot): shortlist acceptance ≥ 60%, shrinking briefing edits, zero silent stage moves.

---

## 7. Risks

Trust/black-box → explainability + undo  
Bias → ignore protected attrs + human gates  
Adoption → opt-in pilot with volunteers  
Integrations → draft-only writes first  
Spam/channels → approve-first + templates  

---

## 8. Rollout

Month 1 pilot → months 2–3 broader TA → 4–6 new geos + governance → 6–12 Tara as default entry point.
