import { useNotes, useNotesDispatch } from "../context/NotesContext";
import { Note } from "../types/Note";
import { SortByType } from "../types/SortBy";

type NotesListProps = {
  sortBy: SortByType;
};

function NotesList({ sortBy }: NotesListProps) {
  const notes = useNotes();

  let sortedNotes = notes;

  switch (sortBy) {
    case "earliest":
      sortedNotes = [...notes].sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
      break;
    case "latest":
      sortedNotes = [...notes].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      break;
    case "completed":
      sortedNotes = [...notes].sort(
        (a, b) => Number(b.completed) - Number(a.completed)
      );
      break;
  }

  return (
    <div className="note-list">
      {sortedNotes.map((note) => (
        <NoteItem key={note.id} note={note} />
      ))}
    </div>
  );
}

export default NotesList;

function NoteItem({ note }: { note: Note }) {
  const dispatch = useNotesDispatch();

  return (
    <div
      className={`note-item ${note.completed ? "completed" : ""}`}
      data-testid="note-item"
    >
      <div className="note-item__header">
        <div>
          <p className="title">{note.title}</p>
          <p className="desc">{note.description}</p>
        </div>
        <div className="actions">
          <button
            onClick={() => dispatch({ type: "delete", payload: note.id })}
          >
            ❌
          </button>
          <input
            type="checkbox"
            name={String(note.id)}
            id={String(note.id)}
            value={note.id}
            checked={note.completed}
            onChange={(e) => {
              const noteId = Number(e.target.value);
              dispatch({ type: "complete", payload: noteId });
            }}
          />
        </div>
      </div>
      <div className="note-item__footer">
        {new Date(note.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </div>
    </div>
  );
}
