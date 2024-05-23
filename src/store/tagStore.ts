import { create } from 'zustand'

type State = {
    tag: string[]
  }
  type Actions = {
    updateTag: (newTag: string[]) => void
  }

  export const useStore = create<State & Actions>(
    
        (set) => ({
            tag: [],
            updateTag: (newTag: string[]) => set({ tag: newTag }),
        }),
 
    
)