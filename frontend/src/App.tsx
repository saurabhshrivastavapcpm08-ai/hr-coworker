import { FormEvent, useEffect, useState } from "react";
import {
  Candidate,
  Job,
  createCandidate,
  fetchCandidates,
  fetchJobs,
  fetchSummary,
  sendChat,
} from "./api";

export function App() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [summary, setSummary] = useState({ open_jobs: 0, candidates: 0, interviews_this_week: 0 });
  const [name, setName] = useState("");
  const [role, setRole] = useState("Staff Engineer");
  const [chatInput, setChatInput] = useState("Summarize my candidate pipeline");
  const [chatReply, setChatReply] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  async function refresh() {
    const [jobData, candidateData, summaryData] = await Promise.all([
      fetchJobs(),
      fetchCandidates(),
      fetchSummary(),
    ]);
    setJobs(jobData);
    setCandidates(candidateData);
    setSummary(summaryData);
  }

  useEffect(() => {
    refresh()
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  async function onAddCandidate(e: FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      await createCandidate(name.trim(), role.trim());
      setName("");
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add candidate");
    }
  }

  async function onChat(e: FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      const response = await sendChat(chatInput.trim());
      setChatReply(response.reply);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Chat failed");
    }
  }

  if (loading) {
    return <main className="page">Loading Tara workspace…</main>;
  }

  return (
    <main className="page">
      <header className="hero">
        <p className="eyebrow">Tara AI · Recruitment Coworker</p>
        <h1>From chaos to clarity in your hiring pipeline</h1>
        <p className="lede">
          Prototype workspace for reqs, candidates, and coworker-style guidance.
        </p>
      </header>

      {error ? <p className="error">{error}</p> : null}

      <section className="metrics">
        <article>
          <h2>{summary.open_jobs}</h2>
          <p>Open reqs</p>
        </article>
        <article>
          <h2>{summary.candidates}</h2>
          <p>Active candidates</p>
        </article>
        <article>
          <h2>{summary.interviews_this_week}</h2>
          <p>Interviews this week</p>
        </article>
      </section>

      <section className="grid">
        <div className="panel">
          <h3>Open requisitions</h3>
          <ul>
            {jobs.map((job) => (
              <li key={job.id}>
                <strong>{job.title}</strong>
                <span>
                  {job.department} · {job.candidate_count} candidates · {job.status}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="panel">
          <h3>Candidate pipeline</h3>
          <ul>
            {candidates.map((candidate) => (
              <li key={candidate.id}>
                <strong>{candidate.name}</strong>
                <span>
                  {candidate.role} · {candidate.stage} · score {candidate.score}
                </span>
              </li>
            ))}
          </ul>
          <form onSubmit={onAddCandidate} className="stack">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Candidate name"
              required
            />
            <input
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Target role"
              required
            />
            <button type="submit">Add candidate</button>
          </form>
        </div>

        <div className="panel">
          <h3>Ask Tara</h3>
          <form onSubmit={onChat} className="stack">
            <textarea
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              rows={4}
            />
            <button type="submit">Send</button>
          </form>
          {chatReply ? <p className="chat-reply">{chatReply}</p> : null}
        </div>
      </section>
    </main>
  );
}
