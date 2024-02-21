import "./App.css";
import { useState } from "react";
import AddNewNote from "./components/AddNewNote";
import NotesList from "./components/NotesList";
import NoteStatus from "./components/NoteStatus";
import NoteHeader from "./components/NoteHeader";
import { NotesProvider } from "./context/NotesContext";

function App() {
  // const [notes, setNotes] = useState([]);
  const [sortBy, setSortBy] = useState("latest");

  // const handleAddNote = (newNote) => {
  //   setNotes((prevNotes) => [...prevNotes, newNote]);
  //   dispatch({ type: "add", payload: newNote });
  // };

  // const handleDeleteNote = (id) => {
  //   setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  //   dispatch({ type: "delete", payload: id });
  // };

  // const handleCompleteNote = (e) => {
  //   const noteId = Number(e.target.value);

  //   setNotes((prevNotes) =>
  //     prevNotes.map((note) =>
  //       note.id === noteId ? { ...note, completed: !note.completed } : note
  //     )
  //   );

  //   dispatch({ type: "complete", payload: noteId });
  // };

  return (
    <NotesProvider>
      <div className="container">
        <NoteHeader sortBy={sortBy} onSort={(e) => setSortBy(e.target.value)} />
        <div className="note-app">
          <AddNewNote />
          <div className="note-container">
            <NoteStatus />
            <NotesList sortBy={sortBy} />
          </div>
        </div>
      </div>
    </NotesProvider>
  );
}

export default App;
