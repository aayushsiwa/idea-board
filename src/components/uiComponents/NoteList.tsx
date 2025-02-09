import Note from "../Note";

type NoteListProps = {

  notes: { id: string; title: string; body: string }[];

  onEdit: (note: { id: string; title: string; body: string }) => void;

  onDelete: (id: string) => void;

};

const NoteList = ({ notes, onEdit, onDelete }: NoteListProps) => {
    return (
        <div className="p-4 flex items-center gap-4 flex-wrap">
            {notes.map((note) => (
                <Note key={note.id} note={note} onEdit={onEdit} onDelete={onDelete} />
            ))}
        </div>
    );
};

export default NoteList;
