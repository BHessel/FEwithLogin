import React, { useState } from "react";
import axios from "axios";

const Login = ({ handleSuccessfulAuth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [loginErrors, setLogginErrors] = useState('')

  const handleEmail = (e) => {
    // console.log(e)
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    console.log("form submitted");

    axios
      .post(
        "http://localhost:3000/sessions",
        {
          user: {
            email: email,
            password: password,
          }
        },
        { withCredentials: true }
      )
      .then((response) => {
        // console.log("res from login", response);
        if (response.data.logged_in) {
            handleSuccessfulAuth(response.data)
        }
      })
      .catch((error) => {
        console.log("login errors", error);
      });
    e.preventDefault();
  };

  return (
    <div className="login-form right-side">
      <form onSubmit={handleSubmit}>
      <h3>Login:</h3>

      <div className='form-group'>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleEmail}
          required
          className="form-control"
        />
      </div>

      <div className="form-group">
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handlePassword}
          required
          className="form-control"
        />
      </div>

        <button type="submit" className="btn btn-dark btn-lg btn-block">Login</button>
      </form>
    </div>
  );
};

export default Login;