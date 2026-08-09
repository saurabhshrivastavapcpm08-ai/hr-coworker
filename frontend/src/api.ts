export type Job = {
  id: string;
  title: string;
  department: string;
  status: "open" | "paused" | "closed";
  candidate_count: number;
};

export type Candidate = {
  id: string;
  name: string;
  role: string;
  stage: "sourced" | "screen" | "interview" | "offer";
  score: number;
};

export type ChatResponse = {
  reply: string;
  suggested_actions: string[];
};

async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(path);
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export function fetchJobs() {
  return getJson<Job[]>("/api/jobs");
}

export function fetchCandidates() {
  return getJson<Candidate[]>("/api/candidates");
}

export function fetchSummary() {
  return getJson<{
    open_jobs: number;
    candidates: number;
    interviews_this_week: number;
  }>("/api/summary");
}

export async function createCandidate(name: string, role: string) {
  const res = await fetch("/api/candidates", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, role }),
  });
  if (!res.ok) {
    throw new Error(`Create failed: ${res.status}`);
  }
  return res.json() as Promise<Candidate>;
}

export async function sendChat(message: string) {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });
  if (!res.ok) {
    throw new Error(`Chat failed: ${res.status}`);
  }
  return res.json() as Promise<ChatResponse>;
}
