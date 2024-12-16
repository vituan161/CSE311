import React from "react";
import "./SignupForm.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt, faLock } from "@fortawesome/free-solid-svg-icons";
function SignupForm() {
  return (
    <div className="form">
      <h1>SignUp</h1>

      <div className="input-box">
        <input
          type="text"
          //onChange={(e) => setEmail(e.target.value)}
          className="email-signup"
          placeholder="Email"
        />
        <FontAwesomeIcon icon={faAt} className="form-icon" />
      </div>
      <div className="input-box">
        <input
          type="password"
          //onChange={(e) => setPassword(e.target.value)}
          className="password"
          placeholder="Password"
        />
        <FontAwesomeIcon icon={faLock} className="form-icon" />
      </div>
      <div className="input-box">
        <input
          type="password"
          //onChange={(e) => setPassword(e.target.value)}
          className="password"
          placeholder="Confirm Password"
        />
        <FontAwesomeIcon icon={faLock} className="form-icon" />
      </div>

      <button /*onClick={login}*/ className="signup-btn">Sign up</button>
      <div className="register-question">
        <span> Have an account ? </span>
        <Link to={"/login"}>Login Here</Link>
      </div>
    </div>
  );
}

export default SignupForm;
