// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Add the Firebase Auth functions.
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
// Add the Firebase Firestore DB functinos
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

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
const provider = new GoogleAuthProvider();
// Set up the desired parameters.
provider.setCustomParameters({
  prompt: "select_account"
});

// Export the functions that we will need.
// 'getAuth' is a singleton. We will only have one of this per application.
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// Set the Firestore DB
// A singleton DB object. Points to our DB in Firebase
export const db = getFirestore();

// Create a user while authenticating. 
export const createUserDocumentFromAuth = async (userAuth) => {
  // Check to see if the user exists by checking the 'users' collection.
  // doc(database, collection, ID ). This will create a reference to the DB
  // even if the user does not currently exist.
  const userDocRef = doc(db, 'users', userAuth.uid);
  console.log(userDocRef);

  // Check to see if the above exists 
  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

};

