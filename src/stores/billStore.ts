import { create } from "zustand";
import { BillInput, BillBreakdown, Recommendation } from "../lib/types/bill";

interface BillState {
  currentInput: BillInput | null;
  currentBreakdown: BillBreakdown | null;
  currentRecommendations: Recommendation[];
  isLoading: boolean;
  error: string | null;
  setInput: (input: BillInput) => void;
  setBreakdown: (breakdown: BillBreakdown) => void;
  setRecommendations: (recs: Recommendation[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export const useBillStore = create<BillState>((set) => ({
  currentInput: null,
  currentBreakdown: null,
  currentRecommendations: [],
  isLoading: false,
  error: null,
  setInput: (input) => set({ currentInput: input }),
  setBreakdown: (breakdown) => set({ currentBreakdown: breakdown }),
  setRecommendations: (recs) => set({ currentRecommendations: recs }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  reset: () =>
    set({
      currentInput: null,
      currentBreakdown: null,
      currentRecommendations: [],
      isLoading: false,
      error: null,
    }),
}));
