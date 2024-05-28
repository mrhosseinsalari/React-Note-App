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

  addNote([{ title: "Note one title", description: "Note one description" }]);
  const inputTitle = screen.getByPlaceholderText(/Note title/i);
  expect(inputTitle.value).toBe("");
});

test("Note App #2: should add multiple items", () => {
  render(
    <NotesProvider>
      <NoteApp sortBy="latest" />
    </NotesProvider>
  );

  addNote([
    { title: "Note one title", description: "Note one description" },
    { title: "Note one title", description: "Note one description" },
    { title: "Note one title", description: "Note one description" },
  ]);

  const divElements = screen.getAllByTestId("note-item");
  expect(divElements.length).toBe(3);
});

test("Note App #3: should not have active class when initially rendered", () => {
  render(
    <NotesProvider>
      <NoteApp sortBy="latest" />
    </NotesProvider>
  );

  addNote([{ title: "Note one title", description: "Note one description" }]);
  const divElement = screen.getByTestId("note-item");
  expect(divElement).not.toHaveClass("completed");
});

test("Note App #4: should have active class when item clicked", () => {
  render(
    <NotesProvider>
      <NoteApp sortBy="latest" />
    </NotesProvider>
  );

  addNote([{ title: "Note one title", description: "Note one description" }]);

  const checkbox = screen.getByRole("checkbox");
  fireEvent.click(checkbox);

  const divElement = screen.getByTestId("note-item");
  expect(divElement).toHaveClass("completed");
});
