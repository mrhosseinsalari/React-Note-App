import AddNewNote from "./AddNewNote";
import NoteStatus from "./NoteStatus";
import NotesList from "./NotesList";

function NoteApp({ sortBy }) {
  return (
    <div className="note-app">
      <AddNewNote />
      <div className="note-container">
        <NoteStatus />
        <NotesList sortBy={sortBy} />
      </div>
    </div>
  );
}

export default NoteApp;
