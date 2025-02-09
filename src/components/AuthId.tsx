import { SocialButton } from "./uiComponents/auth/SocialButton";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { handleGoogleSignIn, handleGitHubSignIn } from "../../firebase"; // Adjust the path as necessary

function AuthId() {
  return (
    <div className="flex gap-2">
      <SocialButton
        icon={<FaGoogle />}
        text="Sign In with Google"
        onClick={handleGoogleSignIn}
        provider="google"
      />
      <SocialButton
        icon={<FaGithub />}
        text="Sign In with Github"
        onClick={handleGitHubSignIn}
        provider="github"
      />
    </div>
  )
}

export default AuthId
