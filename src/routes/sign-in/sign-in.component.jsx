// Add our Firebase auth util code.
import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

const SignIn = () => {
  // Log in user
  const logGoogleUser = async () => {
    // Signs in the user with Google creds.
    const response = await signInWithGooglePopup();
    console.log(response);
    // Checks for user and adds the user to the DB if needed. We should get
    // back a user document reference.
    const userDocRef = await createUserDocumentFromAuth(response.user);
  };

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>Sign in with Google Popup</button>
    </div>
  );
};

export default SignIn;
