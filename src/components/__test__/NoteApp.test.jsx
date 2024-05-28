import { fireEvent, render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import NoteApp from "../NoteApp";
import { NotesProvider } from "../../context/NotesContext";

function addNote(notes) {
  const inputTitle = screen.getByPlaceholderText(/Note title/i);
  const inputDescription = screen.getByPlaceholderText(/Note description/i);
  const button = screen.getByRole("button", { name: /Add New Note/i });

  notes.forEach((note) => {
    fireEvent.change(inputTitle, { target: { value: note.title } });
    fireEvent.change(inputDescription, {
      target: { value: note.description },
    });

    fireEvent.click(button);
  });
}

test("Note App #1: should input be empty after submit", () => {
  render(
    <NotesProvider>
      <NoteApp sortBy="latest" />
    </NotesProvider>
  );

  addNote([
    { title: "Note one title", description: "Note one description" },
    { title: "Note two title", description: "Note two description" },
    { title: "Note three title", description: "Note three description" },
  ]);

  const inputTitle = screen.getByPlaceholderText(/Note title/i);
  expect(inputTitle.value).toBe("");
});
