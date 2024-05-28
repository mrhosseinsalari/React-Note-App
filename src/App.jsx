import "./App.css";
import { useState } from "react";
import NoteHeader from "./components/NoteHeader";
import { NotesProvider } from "./context/NotesContext";
import NoteApp from "./components/NoteApp";

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
        <NoteApp sortBy={sortBy} />
      </div>
    </NotesProvider>
  );
}

export default App;
