import { useState, useEffect, useRef } from "react";
import Alert from "./Alert";

interface ComposeProps {
    onSave: (data: { title: string; body: string }) => void;
    onClose: () => void;
    note?: { title: string; body: string };
}

function Compose({ onSave, onClose, note }: ComposeProps) {
    const [title, setTitle] = useState(note?.title || "");
    const [body, setBody] = useState(note?.body || "");
    const [alert, setAlert] = useState({ text: "", type: "", duration: 0 });
    const formRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (alert.text) {
            const timer = setTimeout(() => {
                setAlert({ text: "", type: "", duration: 0 });
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [alert]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                formRef.current &&
                !formRef.current.contains(event.target as Node)
            ) {
                onClose();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    const handleSave = () => {
        if (!title || !body) {
            setAlert({
                text: "Please fill in both fields",
                type: "warning",
                duration: 5000,
            });
            return;
        }
        onSave({ title, body });
        setTitle("");
        setBody("");
        setAlert({ text: "", type: "", duration: 0 });
    };

    return (
        <div
            ref={formRef}
            className="absolute compose-form flex flex-col justify-center gap-2 bg-muted p-3 rounded-md min-w-[20vw] min-h-[20vh] z-10 right-0"
        >
            {alert.text && (
                <Alert
                    text={alert.text}
                    type={alert.type}
                    duration={alert.duration}
                />
            )}
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border border-border p-1"
            />
            <textarea
                placeholder="Body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="border border-border p-1"
            />
            <div className="flex gap-2">
                <button
                    onClick={onClose}
                    className="bg-accent p-1 rounded-md w-[50%]"
                >
                    Cancel
                </button>
                <button
                    onClick={handleSave}
                    className="bg-accent p-1 rounded-md w-[50%]"
                >
                    Save
                </button>
            </div>
        </div>
    );
}

export default Compose;
