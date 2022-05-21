import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utlis/firebase/firebase.utils";

import "./sign-up-form.styles.scss";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  //console.log(formFields);

  const submitHandler = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("password do not match");
      return;
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      const userDoc = await createUserDocumentFromAuth(user, { displayName });
      console.log(userDoc);
      setFormFields(defaultFormFields);
    } catch (error) {
      console.error(error);
    }
  };

  const onInputChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={submitHandler}>
        <FormInput
          label="Dispaly Name"
          inputOption={{
            id: "displayName",
            name: "displayName",
            type: "text",
            required: true,
            onChange: onInputChangeHandler,
            value: displayName,
          }}
        />

        <FormInput
          label="Email"
          inputOption={{
            id: "email",
            name: "email",
            type: "email",
            required: true,
            onChange: onInputChangeHandler,
            value: email,
          }}
        />

        <FormInput
          label="Password"
          inputOption={{
            id: "password",
            name: "password",
            type: "password",
            required: true,
            onChange: onInputChangeHandler,
            value: password,
          }}
        />
        <FormInput
          label="Confirm Password"
          inputOption={{
            id: "confirmPassword",
            name: "confirmPassword",
            type: "password",
            required: true,
            onChange: onInputChangeHandler,
            value: confirmPassword,
          }}
        />

        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
