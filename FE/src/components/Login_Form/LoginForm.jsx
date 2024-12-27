import React, { useState } from "react";
import "./LoginForm.scss";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt, faLock } from "@fortawesome/free-solid-svg-icons";
import login from "../../lib/api";
import { handleGetProfile, handleToken } from "../../lib/utilities";
import { use } from "react";
import { useSelector, useDispatch } from "react-redux";
function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const mail = "thuan@gmail.com";
  const pass = "Thuan123@";
  let navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      if (response) {
        window.alert("Login successfully");
        await handleToken(response.accessToken, dispatch);
        await handleGetProfile(response.accessToken,dispatch);
        navigateTo("/");
      }
    } catch (error) {
      window.alert("Login failed");
    }
  };

  return (
    <form className="form">
      <h1>Login</h1>

      <div className="input-box">
        <input
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          className="email-login"
          placeholder="Email"
        />
        <FontAwesomeIcon icon={faAt} className="login-icon" />
      </div>
      <div className="input-box">
        <input
          type="text"
          onChange={(e) => setPassword(e.target.value)}
          className="password"
          placeholder="Password"
        />
        <FontAwesomeIcon icon={faLock} className="login-icon" />
      </div>

      <button onClick={handleLogin} className="login-btn">
        Login
      </button>

      <div className="register-question">
        <span>Don't have an account ? </span>
        <Link to={"/signup"}>Register</Link>
      </div>
    </form>
  );
}

export default LoginForm;
