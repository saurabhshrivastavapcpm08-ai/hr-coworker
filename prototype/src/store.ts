import { create } from "zustand";
import { CANDIDATES, type Candidate, type ViewId } from "./data/tara";

export type VariantId = "quiet" | "standup" | "command";
export type Feedback = Record<string, "accept" | "reject" | undefined>;

type Store = {
  variant: VariantId;
  setVariant: (v: VariantId) => void;
  view: ViewId;
  setView: (v: ViewId) => void;
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
  feedback: Feedback;
  setFeedback: (id: string, value: "accept" | "reject") => void;
  briefApproved: boolean;
  approveBrief: () => void;
  outreachApproved: boolean;
  approveOutreach: () => void;
  selectedSlotId: string | null;
  setSelectedSlotId: (id: string | null) => void;
  scheduleConfirmed: boolean;
  confirmSchedule: () => void;
  briefingEdited: string | null;
  setBriefingEdited: (text: string) => void;
  briefingSent: boolean;
  sendBriefing: () => void;
  candidates: Candidate[];
  undoLast: () => void;
  lastAction: null | { type: "feedback"; id: string; prev?: "accept" | "reject" };
};

export const useTaraStore = create<Store>((set, get) => ({
  variant: "standup",
  setVariant: (variant) => set({ variant }),
  view: "home",
  setView: (view) => set({ view, selectedId: null }),
  selectedId: null,
  setSelectedId: (selectedId) => set({ selectedId }),
  feedback: {},
  setFeedback: (id, value) => {
    const prev = get().feedback[id];
    set((s) => ({
      feedback: { ...s.feedback, [id]: value },
      lastAction: { type: "feedback", id, prev },
    }));
  },
  briefApproved: false,
  approveBrief: () => set({ briefApproved: true }),
  outreachApproved: false,
  approveOutreach: () => set({ outreachApproved: true }),
  selectedSlotId: "s1",
  setSelectedSlotId: (selectedSlotId) => set({ selectedSlotId }),
  scheduleConfirmed: false,
  confirmSchedule: () => set({ scheduleConfirmed: true }),
  briefingEdited: null,
  setBriefingEdited: (briefingEdited) => set({ briefingEdited }),
  briefingSent: false,
  sendBriefing: () => set({ briefingSent: true }),
  candidates: CANDIDATES,
  lastAction: null,
  undoLast: () => {
    const action = get().lastAction;
    if (!action || action.type !== "feedback") return;
    set((s) => ({
      feedback: { ...s.feedback, [action.id]: action.prev },
      lastAction: null,
    }));
  },
}));
