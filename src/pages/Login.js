import React, { useCallback, useContext, useState } from "react";
import { withRouter, Redirect, Link } from "react-router-dom";
import app from "../fire";
import { AuthContext } from "../Auth.js";

const Login = ({ history }) => {
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswrodError] = useState("");

  const clearErrors = () => {
    setEmailError("");
    setPasswrodError("");
  };
  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault();
      clearErrors();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (err) {
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
            setPasswrodError(err.message);
            break;
          default:
            break;
        }
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <section className="login">
      <div className="container flex">
        <div className="login-form card">
          <div className="login-title">Log In</div>
          <form method="post" onSubmit={handleLogin}>
            <div className="form-control">
              <label htmlFor="email-input">Email</label>
              <input
                id="email-input"
                type="text"
                name="email"
                autoFocus
                required
              />
              <p className="error-msg">{emailError}</p>
            </div>
            <div className="form-control">
              <label htmlFor="password-input">Password</label>
              <input
                id="password-input"
                type="password"
                name="password"
                required
              />
              <p className="error-msg">{passwordError}</p>
            </div>
            <p className="auth-form-text">
              Don't have an account ? <Link to="/sign-up">Sign-Up</Link>
            </p>
            <input type="submit" value="Login" className="btn btn-login" />
          </form>
        </div>
      </div>
    </section>
  );
};

export default withRouter(Login);
