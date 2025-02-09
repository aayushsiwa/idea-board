import toggleTheme from "./toggleTheme";
import AuthId from "./AuthId.tsx"
import { useEffect, useState } from "react";
import { auth, logOut } from "../../firebase"; // Adjust the path as necessary
import { onAuthStateChanged, User } from "firebase/auth";

function Navbar() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);

    const handleSignOut = () => {
        logOut();
    };

    return (
        <nav className="h-16 bg-muted backdrop-blur-2xl text-primary flex items-center justify-between px-4 min-w-[33vw] max-w-fit rounded-md">
            <div className="text-xl cursor-pointer select-none">IdeaBoard</div>
            <button className="" onClick={toggleTheme}>
                Theme
            </button>
            {user ? (
                <div className="flex items-center gap-4">
                    <span>{user.email}</span>
                    <button onClick={handleSignOut}>Sign Out</button>
                </div>
            ) : (
                <AuthId />
            )}
        </nav>
    );
}

export default Navbar;
