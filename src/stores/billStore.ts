import { create } from "zustand";
import { BillInput, DecomposedBill } from "../lib/types/bill";

interface BillState {
  currentInput: BillInput | null;
  currentResult: DecomposedBill | null;
  isLoading: boolean;
  setInput: (input: BillInput) => void;
  setResult: (result: DecomposedBill) => void;
  setLoading: (loading: boolean) => void;
  reset: () => void;
}

export const useBillStore = create<BillState>((set) => ({
  currentInput: null,
  currentResult: null,
  isLoading: false,
  setInput: (input) => set({ currentInput: input }),
  setResult: (result) => set({ currentResult: result }),
  setLoading: (loading) => set({ isLoading: loading }),
  reset: () => set({ currentInput: null, currentResult: null, isLoading: false }),
}));