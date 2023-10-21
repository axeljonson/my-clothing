// We will useEffect for auth redirection.
import { useEffect } from "react";

// Add our Firebase auth and DB integration utilities
import {
  auth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";


const SignIn = () => {
  // Log in user
  const logGoogleUser = async () => {
    // Signs in the user with Google creds.
    const { user } = await signInWithGooglePopup();
    console.log(user);
    // Checks for user and adds the user to the DB if needed. We should get
    // back a user document reference.
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>Sign in with Google Popup</button>
      <SignUpForm />
    </div>
  );
};

export default SignIn;
