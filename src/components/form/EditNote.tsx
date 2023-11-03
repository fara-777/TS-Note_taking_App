import { NoteData, Tag } from "../../types";
import { useNote } from "../note-detail/Layout";
import NoteForm from "./NoteForm";

type EditProps = {
  onUpdateNote: (id: string, data: NoteData) => void;
  addTag: (tag: Tag) => void;
  availableTags: Tag[];
};

const EditNote = ({ onUpdateNote, addTag, availableTags }: EditProps) => {
  const note = useNote();
  return (
    <div>
      <h1>Edit Not</h1>
      <NoteForm
        title={note.title}
        markdown={note.markdown}
        tags={note.tags}
        availableTags={availableTags}
        addTag={addTag}
        onSubmit={(data) => onUpdateNote(note.id, data)}
      />
    </div>
  );
};

export default EditNote;
