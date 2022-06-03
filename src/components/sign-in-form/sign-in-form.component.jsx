import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { signInAuthUserWithEmailAndPassword } from "../../utlis/firebase/firebase.utils";
import "./sign-in-form.styles.scss";
import {
  createUserDocumentFromAuth,
  signInWithGooglePopup,
} from "../../utlis/firebase/firebase.utils";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      setFormFields(defaultFormFields);
    } catch (error) {
      console.error(error);
      switch (error.code) {
        case "auth/wrong-password":
          alert("incorrect password or email");
          break;
        case "auth/user-not-found":
          alert("no user associated with this email");
          break;
        default:
          console.error(error);
      }
    }
  };

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  const onInputChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={submitHandler}>
        <FormInput
          label="Email"
          inputOption={{
            id: "email1",
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
            id: "password1",
            name: "password",
            type: "password",
            required: true,
            onChange: onInputChangeHandler,
            value: password,
          }}
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASSES.google}
            onClick={signInWithGoogle}
          >
            Google sign in
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
