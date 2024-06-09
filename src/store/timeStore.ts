import { create } from 'zustand';

interface TimeStore {
  hour: number;
  setHour: (hour: number) => void;
}

export const useTimeStore = create<TimeStore>((set) => ({
  hour: 0,
  setHour: (hour) => set({ hour }),
}));