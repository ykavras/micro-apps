import { create } from "zustand";
import { persist } from "zustand/middleware";
//
import type { CounterStore } from "./types";

const useCounter = create<CounterStore>()(
  persist(
    (set) => ({
      count: 0,
      increment: () => set((state) => ({ count: state.count + 1 })),
      decrement: () => set((state) => ({ count: state.count - 1 })),
    }),
    { name: "counter" }
  )
);

export default useCounter;
