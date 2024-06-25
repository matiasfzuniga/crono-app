import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type State = {
  todos: string[];
};
type Actions = {
  addTodo: (text: string) => void;
  removeTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
};

const useTodoStore = create(
  persist<State & Actions>(
    (set) => ({
    todos: [],
    addTodo: (text: string) =>
      set((state: any) => ({
        todos: [...state.todos, { text, completed: false, id: Date.now() }],
      })),
    removeTodo: (id: number) =>
      set((state: any) => ({
        todos: state.todos.filter((t: any) => t.id !== id),
      })),
    toggleTodo: (id: number) =>
      set((state: any) => ({
        todos: state.todos.map((t: any) =>
          t.id === id ? { ...t, completed: !t.completed } : t
        ),
      })),
  }),
  {
    name: 'objetive', 
    storage: createJSONStorage(() => sessionStorage),
  },)
);
export default useTodoStore;
