import React, { useState } from "react";
import "./SignupForm.scss";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt, faLock } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const navigateTo = useNavigate();
  const signup = async (email, password, confirmPassword, idNumber) => {
    const signupData = {
      email: email,
      password: password,
      identiticationNumber: idNumber,
    };
    if (password !== confirmPassword) {
      alert("Password and Confirm Password must be the same");
      return null;
    }
    try {
      const response = await axios.post(
        "https://localhost:7215/api/User/register",
        signupData,
        {
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        window.alert("Sign up successfully");
        navigateTo("/login");
      }
    } catch (error) {
      console.error("Sign up failed:", error);
      console.log(" Hello Error:", error.response);
      window.alert("Sign up failed: " + error.response.data);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await signup(email, password, confirmPassword, idNumber);
    } catch (error) {
      console.error("hello:", error);
    }
  };

  return (
    <div className="form">
      <h1>SignUp</h1>

      <div className="input-box">
        <input
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          className="email-signup"
          placeholder="Email"
        />
        <FontAwesomeIcon icon={faAt} className="form-icon" />
      </div>
      <div className="input-box">
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          className="password"
          placeholder="Password"
        />
        <FontAwesomeIcon icon={faLock} className="form-icon" />
      </div>
      <div className="input-box">
        <input
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="password"
          placeholder="Confirm Password"
        />
        <FontAwesomeIcon icon={faLock} className="form-icon" />
      </div>
      <div className="input-box">
        <input
          type="text"
          onChange={(e) => setIdNumber(e.target.value)}
          className="id-number"
          placeholder="Enter your ID number"
        />
        <FontAwesomeIcon icon={faLock} className="form-icon" />
      </div>

      <button onClick={handleSignup} className="signup-btn">
        Sign up
      </button>
      <div className="register-question">
        <span> Have an account ? </span>
        <Link to={"/login"}>Login Here</Link>
      </div>
    </div>
  );
}

export default SignupForm;
