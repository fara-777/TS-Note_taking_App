import { Navigate, Route, Routes } from "react-router-dom";
import NewNote from "./components/form/NewNote";
import EditNote from "./components/form/EditNote";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { NoteData, RawNote, Tag } from "./types";
import { useLocaleStorage } from "./useLocaleStorage";
import { v4 } from "uuid";
import { useMemo } from "react";
import MainPage from "./components/MainPage";
import Layout from "./components/note-detail/Layout";
import NoteDetail from "./components/note-detail/NoteDetail";

function App() {
  const [notes, setNotes] = useLocaleStorage<RawNote[]>("notes", []);
  const [tags, setTags] = useLocaleStorage<Tag[]>("tags", []);

  const noteWithTags = useMemo(() => {
    return notes.map((note) => ({
      ...note,
      tags: tags.filter((tag) => note.tagId.includes(tag.id)),
    }));
  }, [notes, tags]);

  // Add a new note locally
  function onCreateNote({ tags, ...data }: NoteData) {
    setNotes((prev) => {
      return [...prev, { ...data, id: v4(), tagId: tags.map((tag) => tag.id) }];
    });
  }

  // Add a new tag locally
  function addTag(tag: Tag) {
    setTags((prev) => [...prev, tag]);
  }

  // Delete a note
  function onDeleteNote(id: string) {
    setNotes((prevNotes) => {
      return prevNotes.filter((n) => n.id !== id);
    });
  }

  // Update a note
  function onUpdateNote(id: string, { tags, ...data }: NoteData) {
    setNotes((prev) => {
      return prev.map((n) => {
        if (n.id == id) {
          return {
            ...n,
            ...data,
            tagId: tags.map((tag) => tag.id),
          };
        } else {
          return n;
        }
      });
    });
  }

  return (
    <>
      <Container className="my-4">
        <Routes>
          <Route
            path="/"
            element={<MainPage notes={noteWithTags} availableTags={tags} />}
          />
          <Route
            path="/new"
            element={
              <NewNote
                onSubmit={onCreateNote}
                addTag={addTag}
                availableTags={tags}
              />
            }
          />

          <Route path="/:id" element={<Layout notes={noteWithTags} />}>
            <Route index element={<NoteDetail onDeleteNote={onDeleteNote} />} />
            <Route
              path="edit"
              element={
                <EditNote
                  onUpdateNote={onUpdateNote}
                  addTag={addTag}
                  availableTags={tags}
                />
              }
            />
          </Route>
          <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
