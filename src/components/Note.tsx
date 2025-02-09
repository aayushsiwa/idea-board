import { useState, useEffect, useRef } from "react";
import { updateNote } from "../../firebase"; // Import the updateNote function

const Note = ({
    note,
    onEdit,
    onDelete,
}: {
    note: { id: string; title: string; body: string };
    onEdit: (note: { id: string; title: string; body: string }) => void;
    onDelete: (id: string) => void;
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(note.title);
    const [editedBody, setEditedBody] = useState(note.body);
    const noteRef = useRef<HTMLDivElement>(null);

    const handleSave = async () => {
        if (editedTitle !== note.title || editedBody !== note.body) {
            const updatedNote = { ...note, title: editedTitle, body: editedBody, lastEdited: Date.now() };
            await updateNote(updatedNote); // Update the note in Firebase
            onEdit(updatedNote);
        }
        setIsEditing(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                noteRef.current &&
                !noteRef.current.contains(event.target as Node)
            ) {
                if (isEditing) {
                    handleSave();
                }
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isEditing]);

    return (
        <div>
            <button
                onClick={() => onDelete(note.id)}
                className="bg-red-500 rounded-full p-1 relative top-10 z-10 left-[14vw]"
            >
                X
            </button>
            <div
                ref={noteRef}
                className="flex flex-col items-center bg-card border border-border rounded-md min-w-[15vw] h-[25vh] p-4"
            >
                {isEditing ? (
                    <>
                        <input
                            type="text"
                            value={editedTitle}
                            onChange={(e) => setEditedTitle(e.target.value)}
                            className="font-bold w-full h-[15%] text-center p-1 border-border border-t border-r border-l text-primary"
                        />
                        <textarea
                            value={editedBody}
                            onChange={(e) => setEditedBody(e.target.value)}
                            className="border-card-popover border w-full h-[85%] p-1 text-accent outline-none"
                        />
                    </>
                ) : (
                    <>
                        <h2
                            className="font-bold h-[15%] p-1 text-primary"
                            onClick={() => setIsEditing(true)}
                        >
                            {note.title}
                        </h2>
                        <textarea
                            className="border w-full h-[85%] p-1 border-border text-accent"
                            onClick={() => setIsEditing(true)}
                        >
                            {note.body}
                        </textarea>
                    </>
                )}
            </div>
        </div>
    );
};

export default Note;
