import { createContext, ReactNode, useContext, useReducer } from "react";
import { Note } from "../types/Note";

type Action =
  | { type: "add"; payload: Note }
  | { type: "delete" | "complete"; payload: number };

const NotesContext = createContext({} as Note[]);
const NotesDispatchContext = createContext({} as React.Dispatch<Action>);

function notesReducer(notes: Note[], { type, payload }: Action) {
  switch (type) {
    case "add": {
      return [...notes, payload];
    }
    case "delete": {
      return notes.filter((note) => note.id !== payload);
    }
    case "complete": {
      return notes.map((note) =>
        note.id === payload ? { ...note, completed: !note.completed } : note
      );
    }
    default:
      throw new Error("unknown action" + type);
  }
}

export function NotesProvider({ children }: { children: ReactNode }) {
  const [notes, dispatch] = useReducer(notesReducer, []);

  return (
    <NotesContext.Provider value={notes}>
      <NotesDispatchContext.Provider value={dispatch}>
        {children}
      </NotesDispatchContext.Provider>
    </NotesContext.Provider>
  );
}

export function useNotes() {
  return useContext(NotesContext);
}

export function useNotesDispatch() {
  return useContext(NotesDispatchContext);
}
