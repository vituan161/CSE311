import React from "react";
import "./login.scss";
import LoginForm from "../../components/Login_Form/LoginForm";

function Login() {
  return (
    <div className="loginPage">
      <div className="login_left">
        <LoginForm />
      </div>

      <div className="login_right">
        <img src="./bg4.svg" alt="" />
      </div>
    </div>
  );
}

export default Login;
