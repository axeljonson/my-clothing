// Sign up form
import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

import './sign-up-form.styles.scss';

// Use an object to manage multiple fields in the form.
// Set up the default field values as an object because we need them all.
// We want to use the same names as in our createUserDocumentFromAuth() method
// in firebase.utils.js. We use Firestore to manage the passwords as they are
// sensitive PII.
const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

// My component
const SignUpForm = () => {
  // Set up the state management on the form fields, and then destructure the values
  // to use later.
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  console.log("displayName = " + displayName);
  console.log(formFields);

  // Clear the form fields.
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  // Code to process the form data when the user hits th submit button.
  const handleSubmit = async (event) => {
    // No defaults allowed, we handle everything.
    event.preventDefault();

    // Make sure pw match
    if (password !== confirmPassword) {
      // we could add things like length checks on the input below as well.
      alert("passwords do not match");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password);
      // Create the user document passing the provided display name. Here we use
      // a shorthand { displayName } => { dipslayName: displayName }
      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch(error) {
      if (error.code === 'auth/email-already-in-use') {
        alert("Email already in use!");
      } else {
        console.error('Encountered an error while creating the user: ', error);
      }
    }

  };

  // We want to handle the changes in the form. We will use the 'event' from the submit.
  // We want to be as generic as possible using overlapping names to keep things simple.
  const handleChange = (event) => {
    // Get the field that is being changed and its new value.
    const { name, value } = event.target;
    // Update all the fields in place using the spread function, and then
    // update the field that is being updated indicated by the 'name' passed 
    // from 'event.target'.
    setFormFields({ ...formFields, [name]: value });
  };

  // We want 4 fields, all required. Provide the change handler and indicate each field
  // by using the same name as the element in the object to keep is simple.
  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text" 
          required 
          onChange={handleChange} 
          name="displayName" 
          value={displayName}
        />

        <FormInput 
          label="Email"
          type="email" 
          required 
          onChange={handleChange} 
          name="email" value={email} 
        />

        <FormInput 
          label="Password"
          type="password" 
          required 
          onChange={handleChange} 
          name="password" 
          value={password} 
        />

        <FormInput 
          label="Confirm Password"
          type="password" 
          required onChange={handleChange} 
          name="confirmPassword" 
          value={confirmPassword} 
        />

        <Button type="submit">Sign UP</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
