// Add our Firebase auth util code.
import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

const SignIn = () => {
  // Log in user
  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup();
    console.log(response);
    createUserDocumentFromAuth(response.user);
  };

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>Sign in with Google Popup</button>
    </div>
  );
};

export default SignIn;
