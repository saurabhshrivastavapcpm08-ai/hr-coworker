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
  status: "sourced" | "shortlisted" | "outreach" | "interested";
};

export type Job = {
  id: string;
  title: string;
  team: string;
  urgency: "Urgent" | "Normal";
  sourced: number;
  shortlisted: number;
  outreach: number;
  interviews: number;
};

export const JOB: Job = {
  id: "be-001",
  title: "Backend Engineer",
  team: "Platform · Bangalore",
  urgency: "Urgent",
  sourced: 32,
  shortlisted: 9,
  outreach: 4,
  interviews: 0,
};

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
    { id: "t1", label: "Review Backend Engineer shortlist", meta: "9 candidates · explainability ready", urgent: true },
    { id: "t2", label: "Approve outreach drafts", meta: "4 emails in Outlook Drafts", urgent: true },
    { id: "t3", label: "Confirm interview slots", meta: "PM – Retail · 2 conflicts resolved", urgent: false },
    { id: "t4", label: "Send weekly pipeline briefing", meta: "Draft ready for Priya (HM)", urgent: false },
  ],
};

export const ROLE_BRIEF = {
  must: ["Go or Java backend", "Kafka / event-driven", "3–6 years", "Bangalore / hybrid"],
  nice: ["Payments domain", "On-call ownership", "Internal mobility"],
  companies: ["Razorpay", "PhonePe", "Freshworks", "Swiggy", "Zerodha"],
};
