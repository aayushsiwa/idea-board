// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    GithubAuthProvider,
    onAuthStateChanged,
    updateProfile,
    signOut,
    updateEmail,
    User,
    signInWithPopup,
} from "firebase/auth";
import { getDatabase, ref, set, get, remove, child } from "firebase/database"; // Import Firebase Realtime Database functions
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: "idea-board-b1c5b",
    storageBucket: "idea-board-b1c5b.firebasestorage.app",
    messagingSenderId: "392215674238",
    appId: "1:392215674238:web:56d3f27cfa066cf92f072f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account",
});

const githubProvider = new GithubAuthProvider();

const db = getDatabase(app); // Initialize Realtime Database

export const signIn = (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password);

export const signUp = (email: string, password: string) =>
    createUserWithEmailAndPassword(auth, email, password);

export const logOut = () => signOut(auth);

export { auth, onAuthStateChanged };

export const updateUserProfile = async (user: User, displayName: string) => {
    try {
        await updateProfile(user, {
            displayName,
        });
    } catch (error) {
        console.error("Error updating profile:", error);
        throw error;
    }
};

export const updateUserEmail = async (user: User, email: string) => {
    try {
        await updateEmail(user, email);
    } catch (error) {
        console.error("Error updating email:", error);
        throw error;
    }
};

export const handleGoogleSignIn = async () => {
    try {
        await signInWithPopup(auth, googleProvider);
        alert("Signed in with Google successfully!");
        // navigate("/restricted"); // Redirect to /restricted on successful sign-in
    } catch (error) {
        alert("Google sign-in error: " + (error as Error).message);
    }
};

export const handleGitHubSignIn = async () => {
    try {
        await signInWithPopup(auth, githubProvider);
        alert("Signed in with GitHub successfully!");
        // navigate("/restricted"); // Redirect to /restricted on successful sign-in
    } catch (error) {
        alert("GitHub sign-in error: " + (error as Error).message);
    }
};

export const addNote = async (note: { id: string; title: string; body: string; lastEdited: number }) => {
    try {
        await set(ref(db, 'notes/' + note.id), note);
    } catch (error) {
        console.error("Error adding note:", error);
        throw error;
    }
};

export const updateNote = async (note: { id: string; title: string; body: string; lastEdited: number }) => {
    try {
        await set(ref(db, 'notes/' + note.id), note);
    } catch (error) {
        console.error("Error updating note:", error);
        throw error;
    }
};

export const deleteNote = async (id: string) => {
    try {
        await remove(ref(db, 'notes/' + id));
    } catch (error) {
        console.error("Error deleting note:", error);
        throw error;
    }
};

export const getNotes = async () => {
    try {
        const snapshot = await get(child(ref(db), 'notes'));
        if (snapshot.exists()) {
            return Object.values(snapshot.val());
        } else {
            return [];
        }
    } catch (error) {
        console.error("Error fetching notes:", error);
        throw error;
    }
};

// const handleSignIn = async () => {
//   console.log("email", email);
//   console.log("password", password);
//   try {
//       await signInWithEmailAndPassword(auth, email, password);
//       alert("Signed in successfully!");
//       // navigate("/restricted"); // Redirect to /restricted on successful sign-in
//   } catch (error) {
//       alert((error as Error).message);
//   }
//   console.log(auth.currentUser);
// };