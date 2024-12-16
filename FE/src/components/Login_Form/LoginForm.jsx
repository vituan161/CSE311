import React from "react";
import "./LoginForm.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt, faLock } from "@fortawesome/free-solid-svg-icons";
function LoginForm() {
  return (
    <div className="form">
      <h1>Login</h1>

      <div className="input-box">
        <input
          type="text"
          //onChange={(e) => setEmail(e.target.value)}
          className="email-login"
          placeholder="Email"
        />
        <FontAwesomeIcon icon={faAt} className="login-icon" />
      </div>
      <div className="input-box">
        <input
          type="password"
          //onChange={(e) => setPassword(e.target.value)}
          className="password"
          placeholder="Password"
        />
        <FontAwesomeIcon icon={faLock} className="login-icon" />
      </div>

      <button /*onClick={login}*/ className="login-btn">Login</button>
      <div className="register-question">
        <span>Don't have an account ? </span>
        <Link to={"/signup"}>Register</Link>
      </div>
    </div>
  );
}

export default LoginForm;
