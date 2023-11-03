import { NoteData, Tag } from "../../types";
import NoteForm from "./NoteForm";

export type NewNoteProps = {
  onSubmit: (data: NoteData) => void;
  addTag: (tag: Tag) => void;
  availableTags: Tag[];
} & Partial<NoteData>;
const NewNote = ({ onSubmit, addTag, availableTags }: NewNoteProps) => {
  return (
    <div>
      <h1 className="mb-4">Add New Note</h1>
      <NoteForm
        onSubmit={onSubmit}
        addTag={addTag}
        availableTags={availableTags}
      />
    </div>
  );
};

export default NewNote;
