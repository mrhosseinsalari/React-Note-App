import { SortByType } from "../types/SortBy";
import AddNewNote from "./AddNewNote";
import NotesList from "./NotesList";
import NoteStatus from "./NoteStatus";

type NoteAppProps = {
  sortBy: SortByType;
};

function NoteApp({ sortBy }: NoteAppProps) {
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
