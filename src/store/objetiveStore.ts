import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type State = {
    obj: string
  }
  type Actions = {
    updateObj: (newObj: string) => void
  }
  export const useStore = create(
    persist<State & Actions>(
        (set) => ({
            obj: '0',
            updateObj: (newObj: string) => set({ obj: newObj }),
        }),
        {
            name: 'objetive', 
            storage: createJSONStorage(() => sessionStorage),
          },
    )
)