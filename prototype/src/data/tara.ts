export type Candidate = {
  id: string;
  name: string;
  title: string;
  company: string;
  location: string;
  source: "LinkedIn" | "Naukri" | "Zoho" | "Internal";
  score: number;
  tier: "Tier-1" | "Tier-2" | "Watch";
  matched: string[];
  risks: string[];
  why: string;
  status: "sourced" | "shortlisted" | "outreach" | "interested" | "interview";
  emailPreview: string;
};

export type Job = {
  id: string;
  title: string;
  team: string;
  urgency: "Urgent" | "Normal";
  hm: string;
  sourced: number;
  shortlisted: number;
  outreach: number;
  interviews: number;
};

export type ViewId =
  | "home"
  | "brief"
  | "job"
  | "outreach"
  | "schedule"
  | "briefing"
  | "activity";

export type Slot = {
  id: string;
  day: string;
  time: string;
  interviewers: string[];
  conflict?: string;
  recommended?: boolean;
};

export const JOB: Job = {
  id: "be-001",
  title: "Backend Engineer",
  team: "Platform · Bangalore",
  urgency: "Urgent",
  hm: "Priya Nair",
  sourced: 32,
  shortlisted: 9,
  outreach: 4,
  interviews: 0,
};

export const JOBS_SUMMARY = [
  { id: "be-001", title: "Backend Engineer", stage: "Shortlist ready", health: "good" as const },
  { id: "pm-002", title: "PM – Retail", stage: "Interviewing", health: "warn" as const },
  { id: "fe-003", title: "Frontend Engineer", stage: "Sourcing", health: "good" as const },
  { id: "ds-004", title: "Data Scientist", stage: "Offer stage", health: "good" as const },
];

export const CANDIDATES: Candidate[] = [
  {
    id: "c1",
    name: "Riya Menon",
    title: "Senior Backend Engineer",
    company: "Razorpay",
    location: "Bangalore",
    source: "LinkedIn",
    score: 92,
    tier: "Tier-1",
    matched: ["Go", "Kafka", "distributed systems", "5+ yrs"],
    risks: ["May expect higher band"],
    why: "Strong match on must-haves: Go + Kafka at payments scale. Recent systems work maps cleanly to Platform reliability goals.",
    status: "sourced",
    emailPreview:
      "Hi Riya — your Kafka + Go work at Razorpay stood out for our Platform Backend role. Open to a short chat this week?",
  },
  {
    id: "c2",
    name: "Arjun Deshpande",
    title: "Backend Engineer II",
    company: "Freshworks",
    location: "Chennai / Remote",
    source: "Naukri",
    score: 88,
    tier: "Tier-1",
    matched: ["Java", "Postgres", "microservices"],
    risks: ["Less Go exposure"],
    why: "Solid product-backend depth and ownership signals. Java stack is transferable; open to Go per recent Naukri profile notes.",
    status: "sourced",
    emailPreview:
      "Hi Arjun — noticed your microservices ownership at Freshworks. We’re hiring a Backend Engineer in Bangalore/hybrid and thought you’d be a strong fit.",
  },
  {
    id: "c3",
    name: "Meera Iyer",
    title: "SDE-3, Platform",
    company: "PhonePe",
    location: "Bangalore",
    source: "Zoho",
    score: 84,
    tier: "Tier-2",
    matched: ["Scala", "event-driven", "on-call ownership"],
    risks: ["Slightly senior for band"],
    why: "Prior applicant to Platform roles. High ownership and on-call maturity; may need leveling conversation.",
    status: "sourced",
    emailPreview:
      "Hi Meera — your Platform on-call ownership at PhonePe maps closely to how we run services. Would love to compare notes on our Backend role.",
  },
  {
    id: "c4",
    name: "Kabir Singh",
    title: "Backend Engineer",
    company: "Internal · Payments Infra",
    location: "Hyderabad",
    source: "Internal",
    score: 81,
    tier: "Tier-1",
    matched: ["domain context", "Go", "referral"],
    risks: ["Manager approval needed"],
    why: "Internal mobility hit — already knows our payment domain and Go services. Fastest path if manager endorses.",
    status: "sourced",
    emailPreview:
      "Hi Kabir — exploring an internal move onto Platform Backend. Happy to walk through scope with you and your manager.",
  },
  {
    id: "c5",
    name: "Ananya Rao",
    title: "Software Engineer",
    company: "Swiggy",
    location: "Bangalore",
    source: "LinkedIn",
    score: 76,
    tier: "Watch",
    matched: ["Python", "APIs", "strong communication"],
    risks: ["Light on distributed systems"],
    why: "Promising growth profile with crisp communication. Better for a stretch hire if Tier-1 pipeline thins.",
    status: "sourced",
    emailPreview:
      "Hi Ananya — your API work and communication at Swiggy caught my eye. Sharing a Backend role that could be a strong step up.",
  },
];

export const STANDUP = {
  greeting: "Good evening, Aditi",
  lines: [
    "Sourced 32 candidates for Backend Engineer; 9 ready for your shortlist review.",
    "Drafted outreach for 4 PM – Retail candidates — waiting on your approve & send.",
    "Scheduled 3 interviews for PM – Retail; one candidate requested a reschedule.",
    "Pipeline briefings for 4 open roles are drafted for hiring managers.",
  ],
  tasks: [
    {
      id: "t0",
      label: "Approve Backend Engineer role brief",
      meta: "Must-haves parsed from Zoho JD",
      urgent: true,
      view: "brief" as ViewId,
    },
    {
      id: "t1",
      label: "Review Backend Engineer shortlist",
      meta: "9 candidates · explainability ready",
      urgent: true,
      view: "job" as ViewId,
    },
    {
      id: "t2",
      label: "Approve outreach drafts",
      meta: "Personalized emails in Outlook Drafts",
      urgent: true,
      view: "outreach" as ViewId,
    },
    {
      id: "t3",
      label: "Confirm interview slots",
      meta: "3 windows · 1 soft conflict",
      urgent: false,
      view: "schedule" as ViewId,
    },
    {
      id: "t4",
      label: "Send weekly pipeline briefing",
      meta: "Draft ready for Priya (HM)",
      urgent: false,
      view: "briefing" as ViewId,
    },
  ],
};

export const ROLE_BRIEF = {
  title: "Backend Engineer · Platform",
  must: ["Go or Java backend", "Kafka / event-driven", "3–6 years", "Bangalore / hybrid"],
  nice: ["Payments domain", "On-call ownership", "Internal mobility"],
  companies: ["Razorpay", "PhonePe", "Freshworks", "Swiggy", "Zerodha"],
  exclude: ["Pure frontend profiles", "Staff+ unless leveling agreed"],
  sources: ["Zoho ATS", "LinkedIn", "Naukri", "Workday internal"],
};

export const SLOTS: Slot[] = [
  {
    id: "s1",
    day: "Tue · 12 Aug",
    time: "11:00–11:45 IST",
    interviewers: ["Priya Nair (HM)", "Dev lead · Arun"],
    recommended: true,
  },
  {
    id: "s2",
    day: "Tue · 12 Aug",
    time: "16:00–16:45 IST",
    interviewers: ["Priya Nair (HM)", "Dev lead · Arun"],
    conflict: "Arun has a soft conflict overlapping 16:30 standup",
  },
  {
    id: "s3",
    day: "Wed · 13 Aug",
    time: "10:30–11:15 IST",
    interviewers: ["Priya Nair (HM)", "Staff eng · Neha"],
    recommended: true,
  },
];

export const BRIEFING_DRAFT = {
  to: "Priya Nair",
  role: "Backend Engineer",
  subject: "Weekly pipeline · Backend Engineer",
  body: `Priya — quick update on Backend Engineer:

• Pipeline: 32 sourced → 9 shortlisted → 4 in outreach → 0 interviews booked yet
• Strongest profiles: Riya (Razorpay, Go/Kafka) and Arjun (Freshworks, Java/microservices)
• Risk: band may be tight for Razorpay senior talent — flagging early
• Ask: confirm Tue 11:00 or Wed 10:30 for first screens once outreach lands

Tara drafted this from Zoho + calendar. Edit anything before I send.`,
};

export const ACTIVITY = [
  {
    id: "a1",
    when: "16:42",
    tool: "Zoho · get_job_details",
    summary: "Parsed JD into role brief (must/nice/exclude).",
  },
  {
    id: "a2",
    when: "16:44",
    tool: "LinkedIn · search_profiles",
    summary: "Queried Go + Kafka + Bangalore · 48 profiles returned.",
  },
  {
    id: "a3",
    when: "16:45",
    tool: "Naukri · search",
    summary: "Added 19 active applicants; deduped 6 overlaps with Zoho.",
  },
  {
    id: "a4",
    when: "16:47",
    tool: "Workday · search_employees",
    summary: "Found 1 internal mobility match (Kabir Singh).",
  },
  {
    id: "a5",
    when: "16:51",
    tool: "Ranking",
    summary: "Scored & tiered 32 candidates. Protected attributes ignored.",
  },
  {
    id: "a6",
    when: "17:02",
    tool: "Outlook · draft",
    summary: "Prepared 4 outreach drafts. Awaiting human approve.",
  },
];

export const FUNNEL_STEPS = [
  { id: "brief", label: "Role brief" },
  { id: "job", label: "Shortlist" },
  { id: "outreach", label: "Outreach" },
  { id: "schedule", label: "Schedule" },
  { id: "briefing", label: "Brief HM" },
] as const;

export const NAV_ITEMS: { id: ViewId; label: string; hint: string }[] = [
  { id: "home", label: "Home", hint: "Today with Tara" },
  { id: "brief", label: "Role brief", hint: "Approve sourcing criteria" },
  { id: "job", label: "Shortlist", hint: "Review explainable picks" },
  { id: "outreach", label: "Outreach", hint: "Approve & send drafts" },
  { id: "schedule", label: "Schedule", hint: "Confirm interview slots" },
  { id: "briefing", label: "Briefing", hint: "Send HM update" },
  { id: "activity", label: "Activity", hint: "Audit trail" },
];
