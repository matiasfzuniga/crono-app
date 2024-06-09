import { create } from 'zustand'

type State = {
    tag: string[]
  }
  type Actions = {
    updateTag: (newTag: string[]) => void
  }

  export const useTagStore = create<State & Actions>(
    
        (set) => ({
            tag: [],
            updateTag: (newTag: string[]) => set({ tag: newTag }),
        }),
 
    
)