import { create } from "zustand";
import { CANDIDATES, type Candidate } from "./data/tara";

export type VariantId = "quiet" | "standup" | "command";

type Feedback = Record<string, "accept" | "reject" | undefined>;

type Store = {
  variant: VariantId;
  setVariant: (v: VariantId) => void;
  view: "home" | "job" | "outreach";
  setView: (v: "home" | "job" | "outreach") => void;
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
  feedback: Feedback;
  setFeedback: (id: string, value: "accept" | "reject") => void;
  outreachApproved: boolean;
  approveOutreach: () => void;
  candidates: Candidate[];
};

export const useTaraStore = create<Store>((set) => ({
  variant: "standup",
  setVariant: (variant) => set({ variant }),
  view: "home",
  setView: (view) => set({ view }),
  selectedId: null,
  setSelectedId: (selectedId) => set({ selectedId }),
  feedback: {},
  setFeedback: (id, value) =>
    set((s) => ({ feedback: { ...s.feedback, [id]: value } })),
  outreachApproved: false,
  approveOutreach: () => set({ outreachApproved: true }),
  candidates: CANDIDATES,
}));
