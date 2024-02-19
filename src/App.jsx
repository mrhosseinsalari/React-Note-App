import "./App.css";
import { useReducer, useState } from "react";
import AddNewNote from "./components/AddNewNote";
import NotesList from "./components/NotesList";
import NoteStatus from "./components/NoteStatus";
import NoteHeader from "./components/NoteHeader";

function notesReducer(notes, { type, payload }) {
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

function App() {
  // const [notes, setNotes] = useState([]);
  const [notes, dispatch] = useReducer(notesReducer, []);
  const [sortBy, setSortBy] = useState("latest");

  const handleAddNote = (newNote) => {
    // setNotes((prevNotes) => [...prevNotes, newNote]);
    dispatch({ type: "add", payload: newNote });
  };

  const handleDeleteNote = (id) => {
    // setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    dispatch({ type: "delete", payload: id });
  };

  const handleCompleteNote = (e) => {
    const noteId = Number(e.target.value);

    // setNotes((prevNotes) =>
    //   prevNotes.map((note) =>
    //     note.id === noteId ? { ...note, completed: !note.completed } : note
    //   )
    // );

    dispatch({ type: "complete", payload: noteId });
  };

  return (
    <div className="container">
      <NoteHeader
        notes={notes}
        sortBy={sortBy}
        onSort={(e) => setSortBy(e.target.value)}
      />
      <div className="note-app">
        <AddNewNote onAddNote={handleAddNote} />
        <div className="note-container">
          <NoteStatus notes={notes} />
          <NotesList
            notes={notes}
            sortBy={sortBy}
            onDelete={handleDeleteNote}
            onComplete={handleCompleteNote}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
