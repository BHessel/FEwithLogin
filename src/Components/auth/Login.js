import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { API_ROOT } from "../../services/apiRoot";
import { useAuth } from "../../context/AuthProvider";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const [error, setError] = useState("");

  const { loginUser } = useAuth();

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      await loginUser(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch {
      setError("Error logging in");
    }
  };

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit}>
        <h3 className="top-label margin-boost-bottom">Login</h3>

        <div className="">
          <input
            type="email"
            name="email"
            placeholder="Email"
            ref={emailRef}
            required
            className="search"
          />
        </div>

        <div className="">
          <input
            type="password"
            name="password"
            placeholder="Password"
            ref={passwordRef}
            required
            className="search"
          />
        </div>

        <button type="submit" className="button-27">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
