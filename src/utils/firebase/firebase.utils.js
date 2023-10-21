// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Add the Firebase Auth functions.
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  getAdditionalUserInfo,
} from "firebase/auth";

// Add the Firebase Firestore DB functinos
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
// In this use case it is OK to expose the 'apiKey' in GitHub. See
// Google documentation.
// This configuration will be used to access our Firebase instance.
const firebaseConfig = {
  apiKey: "AIzaSyAt7OZStlwB4LOb12qAcBtCjiQF4FUwQtQ",
  authDomain: "j13azp-clothing.firebaseapp.com",
  projectId: "j13azp-clothing",
  storageBucket: "j13azp-clothing.appspot.com",
  messagingSenderId: "708650140292",
  appId: "1:708650140292:web:e02b734684ff5248e4b8d1",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Create an Auth provider instance using 'new' as 'GoogleAuthProvider' is a class.
// We may end up with multiple providers by the time we are done.
const googleProvider = new GoogleAuthProvider();
// Set up the desired parameters.
googleProvider.setCustomParameters({
  prompt: "select_account",
});

// Export the functions that we will need.
// 'getAuth' is a singleton. We will only have one of this per application.
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

// Set the Firestore DB
// A singleton DB object. Points to our DB in Firebase
export const db = getFirestore();

// Create a user while authenticating. Make allowances for signing up to
// pass additional information if needed, i.e. a display name. This will then
// get added if provided when we set the doc. It may over wright any nulls
export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
  if (!userAuth) return;

  // Check to see if the user exists by checking the 'users' collection.
  // doc(database, collection, ID ). This will create a reference to the DB
  // even if the user does not currently exist.
  const userDocRef = doc(db, "users", userAuth.uid);
  console.log(userDocRef);

  // Check to see if the above exists in the collection.
  const userSnapshot = await getDoc(userDocRef);
  // console.log(userSnapshot);
  // console.log(userSnapshot.exists());

  // If the user does not exist, then we want to add to DB
  let haveUser = false;
  if (!userSnapshot.exists()) {
    // Get the name and email from the auth and add a date.
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    // Add to DB
    try {
      // Remember to spread the 'additionalInformation' before we set the doc. That way
      // we get any extra information included including over writing existing parameters.
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
      haveUser = true;
    } catch (error) {
      console.log("error creating the user in the DB", error.message);
    }
  } else {
    haveUser = true;
  }

  // If the user does exist, or we created it, return the user document reference
  if (haveUser) {
    return userDocRef;
  } else {
    // Something to tell the caller that we failed.
    return {
      type: "document",
      id: null,
    };
  }
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  // If we aren't passed the parameters, return.
  if (!email || !password) {
    // we should provide some kind of error handling.
    return;
  }

  return await createUserWithEmailAndPassword(auth, email, password);
};
