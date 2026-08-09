from __future__ import annotations

from datetime import datetime, timezone
from typing import Literal
from uuid import uuid4

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

app = FastAPI(title="Tara HR Coworker API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Job(BaseModel):
    id: str
    title: str
    department: str
    status: Literal["open", "paused", "closed"]
    candidate_count: int


class Candidate(BaseModel):
    id: str
    name: str
    role: str
    stage: Literal["sourced", "screen", "interview", "offer"]
    score: int = Field(ge=0, le=100)


class CreateCandidate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    role: str = Field(min_length=1, max_length=120)


class ChatMessage(BaseModel):
    message: str = Field(min_length=1, max_length=2000)


class ChatResponse(BaseModel):
    reply: str
    suggested_actions: list[str]


JOBS: list[Job] = [
    Job(id="job-1", title="Senior Recruiter", department="Talent", status="open", candidate_count=3),
    Job(id="job-2", title="Staff Engineer", department="Engineering", status="open", candidate_count=2),
]

CANDIDATES: list[Candidate] = [
    Candidate(id="cand-1", name="Alex Rivera", role="Staff Engineer", stage="interview", score=88),
    Candidate(id="cand-2", name="Jordan Lee", role="Senior Recruiter", stage="screen", score=76),
    Candidate(id="cand-3", name="Sam Patel", role="Staff Engineer", stage="sourced", score=71),
]


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok", "service": "tara-hr-coworker"}


@app.get("/api/jobs", response_model=list[Job])
def list_jobs() -> list[Job]:
    return JOBS


@app.get("/api/candidates", response_model=list[Candidate])
def list_candidates() -> list[Candidate]:
    return sorted(CANDIDATES, key=lambda c: c.score, reverse=True)


@app.post("/api/candidates", response_model=Candidate, status_code=201)
def create_candidate(payload: CreateCandidate) -> Candidate:
    candidate = Candidate(
        id=f"cand-{uuid4().hex[:8]}",
        name=payload.name,
        role=payload.role,
        stage="sourced",
        score=65,
    )
    CANDIDATES.append(candidate)
    for job in JOBS:
        if job.title == payload.role or payload.role in job.title:
            job.candidate_count += 1
    return candidate


@app.post("/api/chat", response_model=ChatResponse)
def chat(payload: ChatMessage) -> ChatResponse:
    text = payload.message.lower()
    if "pipeline" in text or "candidate" in text:
        top = max(CANDIDATES, key=lambda c: c.score)
        return ChatResponse(
            reply=(
                f"You have {len(CANDIDATES)} active candidates. "
                f"{top.name} is highest ranked ({top.score}) in {top.stage}."
            ),
            suggested_actions=["Schedule screen for Jordan Lee", "Request references for Alex Rivera"],
        )
    if "job" in text or "req" in text:
        open_jobs = [j for j in JOBS if j.status == "open"]
        titles = ", ".join(j.title for j in open_jobs)
        return ChatResponse(
            reply=f"There are {len(open_jobs)} open reqs: {titles}.",
            suggested_actions=["Draft outreach for Staff Engineer", "Refresh Senior Recruiter JD"],
        )
    return ChatResponse(
        reply=(
            "I can summarize your pipeline, open reqs, and next-best actions. "
            "Try asking about candidates or open jobs."
        ),
        suggested_actions=["Show pipeline summary", "List open reqs"],
    )


@app.get("/api/summary")
def summary() -> dict[str, object]:
    return {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "open_jobs": len([j for j in JOBS if j.status == "open"]),
        "candidates": len(CANDIDATES),
        "interviews_this_week": 2,
    }
