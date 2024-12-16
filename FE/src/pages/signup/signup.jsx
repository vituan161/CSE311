import React from "react";
import SignupForm from "../../components/Signup_Form/SignupForm";
import "./signup.scss";

function SignUp() {
  return (
    <div className="signupPage">
      <div className="signup_right">
        <SignupForm />
      </div>
      <div className="signup_left">
        <img src="./bg4.svg" alt="" />
      </div>
    </div>
  );
}

export default SignUp;
