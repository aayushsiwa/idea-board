import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Compose from "./components/uiComponents/Compose";
import generateUniqueId from "./components/randomId";
import NoteList from "./components/uiComponents/NoteList";
import { Analytics } from "@vercel/analytics/react";
import { getNotes, addNote, updateNote, deleteNote } from "../firebase"; // Import Firebase functions
import { auth } from "../firebase"; // Import auth to get the current user

function App() {
    const [showCompose, setShowCompose] = useState(false);
    const [notes, setNotes] = useState<
        { lastEdited: number; id: string; title: string; body: string }[]
    >([]);
    const [editingNote, setEditingNote] = useState<{
        id: string;
        title: string;
        body: string;
    } | null>(null);
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUserId(user.uid);
            } else {
                setUserId(null);
            }
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (userId) {
            const fetchNotes = async () => {
                const storedNotes = await getNotes(userId) as { lastEdited: number; id: string; title: string; body: string }[]; // Fetch notes from Firebase
                setNotes(storedNotes);
            };
            fetchNotes();
        }
    }, [userId]);

    const handleComposeClick = () => {
        setShowCompose(true);
    };

    const handleSaveNote = async (note: { title: string; body: string }) => {
        if (!userId) return;
        let updatedNotes;
        if (editingNote) {
            updatedNotes = notes.map((n) =>
                n.id === editingNote.id
                    ? { ...n, ...note, lastEdited: new Date().getTime() }
                    : n
            );
        } else {
            const newNote = {
                lastEdited: new Date().getTime(),
                id: generateUniqueId(),
                ...note,
            };
            await addNote(userId, newNote); // Add the new note to Firebase with userId
            updatedNotes = [newNote, ...notes];
        }
        setNotes(updatedNotes.sort((a, b) => b.lastEdited - a.lastEdited));
        setShowCompose(false);
        setEditingNote(null);
    };

    const handleEditNote = async (note: {
        id: string;
        title: string;
        body: string;
    }) => {
        if (!userId) return;
        const updatedNote = { ...note, lastEdited: new Date().getTime() };
        await updateNote(userId, updatedNote); // Update the note in Firebase with userId
        const updatedNotes = notes.map((n) =>
            n.id === note.id ? updatedNote : n
        );
        setNotes(updatedNotes.sort((a, b) => b.lastEdited - a.lastEdited));
    };

    const handleDeleteNote = async (id: string) => {
        if (!userId) return;
        await deleteNote(userId, id); // Delete the note from Firebase with userId
        const updatedNotes = notes.filter((note) => note.id !== id);
        setNotes(updatedNotes);
    };

    const handleCloseCompose = () => {
        setShowCompose(false);
        setEditingNote(null);
    };

    return (
        <>
            <Analytics />
            <div className="bg-background min-h-screen flex flex-col">
                <div className="flex items-center justify-center pt-4">
                    <Navbar />
                    <div className="fixed right-8">
                        <button
                            onClick={handleComposeClick}
                            className={`p-3 bg-accent text-muted-foreground rounded-md min-w-24 ${
                                showCompose ? "hidden" : ""
                            }`}
                        >
                            Compose
                        </button>
                        {showCompose && (
                            <Compose
                                onSave={handleSaveNote}
                                onClose={handleCloseCompose}
                                note={editingNote || undefined}
                            />
                        )}
                    </div>
                </div>
                {userId && (
                    <NoteList
                        notes={notes}
                        onEdit={handleEditNote}
                        onDelete={handleDeleteNote}
                        userId={userId}
                    />
                )}
            </div>
        </>
    );
}

export default App;
