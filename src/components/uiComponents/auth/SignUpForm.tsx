import { useState } from "react";
import { SocialButton } from "./SocialButton.tsx";
import { InputField } from "./InputField";
import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { handleGitHubSignIn,handleGoogleSignIn } from "../../../../firebase";
// import { signInWithPopup } from "firebase/auth";
import { FaGithub, FaGoogle } from "react-icons/fa";
import {
    // googleProvider,
    auth,
    // githubProvider,
    signUp,
} from "../../../../firebase";

export const SignUpForm: React.FC = () => {
    const [showSignin, selectShowSignin] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const toggleSignin = () => {
        selectShowSignin(!showSignin);
    };

    const handleSignIn = async () => {
        console.log("email", email);
        console.log("password", password);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert("Signed in successfully!");
            // navigate("/restricted"); // Redirect to /restricted on successful sign-in
        } catch (error) {
            alert((error as Error).message);
        }
        console.log(auth.currentUser);
    };

    // const handleGoogleSignIn = async () => {
    //     try {
    //         await signInWithPopup(auth, googleProvider);
    //         alert("Signed in with Google successfully!");
    //         // navigate("/restricted"); // Redirect to /restricted on successful sign-in
    //     } catch (error) {
    //         alert("Google sign-in error: " + (error as Error).message);
    //     }
    // };

    // const handleGitHubSignIn = async () => {
    //     try {
    //         await signInWithPopup(auth, githubProvider);
    //         alert("Signed in with GitHub successfully!");
    //         // navigate("/restricted"); // Redirect to /restricted on successful sign-in
    //     } catch (error) {
    //         alert("GitHub sign-in error: " + (error as Error).message);
    //     }
    // };

    const handleSignUp = async () => {
        console.log(auth);
        if (!firstName) {
            alert("First name is required.");
            return;
        }

        if (confirmPassword !== password) {
            alert("Passwords do not match.");
            return;
        }

        try {
            const userCredential = await signUp(email, password);
            const user = userCredential.user;

            await updateProfile(user, {
                displayName: `${firstName} ${lastName}`,
            });

            alert("Signed up successfully!");
            console.log("User signed up:", user);
            console.log("User's full name:", user.displayName);

            // navigate("/restricted"); // Uncomment to redirect on successful sign-up
        } catch (error) {
            console.error("Sign-up error:", error);
            alert(
                (error as Error).message || "An error occurred during sign-up."
            );
        }
    };

    return (
        <div className="flex flex-col rounded-none max-w-[750px]">
            <div className="flex flex-col pb-9 mt-3 w-full bg-white rounded-lg shadow-[0px_8px_24px_rgba(0,0,0,0.25)] max-md:max-w-full">
                <div className="px-14 py-4 text-sm font-medium leading-none text-center text-green-700 bg-green-50 rounded-lg max-md:px-5 max-md:max-w-full">
                    Let's learn, share & inspire each other with our passion for
                    computer engineering. Sign up now 🤘🏼
                </div>

                <div className="self-center mt-6 w-full max-w-[664px] max-md:max-w-full">
                    <div className="flex gap-5 max-md:flex-col">
                        <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
                            <div className="flex flex-col w-full text-base font-medium text-zinc-500 max-md:mt-6">
                                <h2 className="self-start text-2xl font-bold text-black mb-6">
                                    {showSignin ? "Sign In" : "Create Account"}
                                </h2>

                                <div className="rounded-md overflow-hidden border border-solid border-zinc-300">
                                    <div
                                        className={`w-full leading-none bg-slate-50 border-zinc-300 ${
                                            showSignin ? "hidden" : "flex"
                                        }`}
                                    >
                                        <InputField
                                            label="First Name"
                                            id="firstName"
                                            type="text"
                                            value={firstName}
                                            onChange={(e) =>
                                                setFirstName(e.target.value)
                                            }
                                            required
                                        />
                                        <InputField
                                            label="Last Name"
                                            id="lastName"
                                            type="text"
                                            value={lastName}
                                            onChange={(e) =>
                                                setLastName(e.target.value)
                                            }
                                        />
                                    </div>

                                    <InputField
                                        label="Email"
                                        id="email"
                                        type="email"
                                        onChange={(e) =>
                                            setEmail(e?.target.value)
                                        }
                                    />
                                    <InputField
                                        label="Password"
                                        id="password"
                                        type="password"
                                        hasIcon
                                        iconSrc="https://cdn.builder.io/api/v1/image/assets/f01b86e2ed6a450e894cbf49dfa4b291/ed19c7c1708ba88a08321b986c00bedc6d9b8ee6d701533956509bd0192e8ec5?apiKey=f01b86e2ed6a450e894cbf49dfa4b291&"
                                        onChange={(e) =>
                                            setPassword(e?.target.value)
                                        }
                                    />
                                    <InputField
                                        label="Confirm Password"
                                        id="confirmPassword"
                                        type="password"
                                        className={`${
                                            showSignin ? "hidden" : " "
                                        }`}
                                        onChange={(e) => {
                                            setConfirmPassword(e?.target.value);
                                        }}
                                    />
                                </div>

                                <button
                                    type="button"
                                    className="px-16 py-3 mt-5 text-sm font-semibold leading-none text-center text-white bg-blue-600 rounded-3xl max-md:px-5"
                                    onClick={
                                        showSignin ? handleSignIn : handleSignUp
                                    }
                                >
                                    {showSignin ? "Sign In" : "Create Account"}
                                </button>

                                <SocialButton
                                    icon={<FaGithub />}
                                    text={`${
                                        showSignin ? "Sign In" : "Sign Up"
                                    } with Github`}
                                    onClick={handleGitHubSignIn}
                                    provider="github" // New property
                                />
                                <SocialButton
                                    icon={<FaGoogle />}
                                    text={`${
                                        showSignin ? "Sign In" : "Sign Up"
                                    } with Google`}
                                    onClick={handleGoogleSignIn}
                                    provider="google" // New property
                                />
                            </div>
                        </div>

                        <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                            <div className="flex flex-col grow mt-2 text-right max-md:mt-8">
                                <div className="self-end text-sm text-neutral-700">
                                    {showSignin
                                        ? "Don't have an account?  "
                                        : "Already have an account?"}
                                    <button
                                        className="font-semibold text-blue-600"
                                        onClick={toggleSignin}
                                    >
                                        {showSignin ? "Sign Up" : "Sign In"}
                                    </button>
                                </div>
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/f01b86e2ed6a450e894cbf49dfa4b291/415c612dbd7805ec95c26d029b3cc2f3f90a06fbb9017c646c04792b36a46ea7?apiKey=f01b86e2ed6a450e894cbf49dfa4b291&"
                                    alt="Sign up illustration"
                                    className="object-contain mt-8 w-full aspect-square"
                                />
                                <div className="mt-3 text-xs tracking-normal leading-none text-gray-800 max-md:ml-1">
                                    By signing up, you agree to our
                                    <a href="">Terms & conditions</a>,
                                    <a href="">Privacy policy</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
