import { useNotes, useNotesDispatch } from "../context/NotesContext";

function NotesList({ sortBy }) {
  const notes = useNotes();

  let sortedNotes = notes;

  switch (sortBy) {
    case "earliest":
      sortedNotes = [...notes].sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
      break;
    case "latest":
      sortedNotes = [...notes].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
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

function NoteItem({ note }) {
  const dispatch = useNotesDispatch();

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <div className={`note-item ${note.completed ? "completed" : ""}`}>
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
            name={note.id}
            id={note.id}
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
        {new Date(note.createdAt).toLocaleDateString("en-US", options)}
      </div>
    </div>
  );
}
