import {create} from "zustand";

interface StoreState {
  currentMonth: number;
  currentYear: number;
  setCurrentMonth: (month: number) => void;
  setCurrentYear: (year: number) => void;
  changeMonth: (direction: number) => void;
}

export const useStore = create<StoreState>((set) => ({
  currentMonth: new Date().getMonth(),
  currentYear: new Date().getFullYear(),
  setCurrentMonth: (month) => set({ currentMonth: month }),
  setCurrentYear: (year) => set({ currentYear: year }),
  changeMonth: (direction) => set((state) => {
    let newMonth = state.currentMonth + direction;
    let newYear = state.currentYear;

    if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    }

    window.location.search = `?y=${newYear}&m=${newMonth + 1}`;

    setTimeout(() => {
      set({ currentMonth: newMonth, currentYear: newYear });
    }, 2500);
    return { currentMonth: state.currentMonth, currentYear: state.currentYear };
  }),
}));

