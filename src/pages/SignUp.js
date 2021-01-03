import React, { useCallback, useState } from "react";
import { withRouter, Link } from "react-router-dom";
import app from "../fire";

const SignUp = ({ history }) => {
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswrodError] = useState("");
  const [rePasswordError, setRePasswordError] = useState("");

  const clearErrors = () => {
    setEmailError("");
    setPasswrodError("");
    setRePasswordError("");
  };
  const handleSignUp = useCallback(
    async (event) => {
      event.preventDefault();
      clearErrors();
      const { email, password, rePassword } = event.target.elements;
      if (password.value !== rePassword.value)
        return setRePasswordError("Password doesn't match!");

      try {
        await app
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (err) {
        switch (err.code) {
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            setEmailError(err.message);
            break;
          case "auth/weak-password":
            setPasswrodError(err.message);
            break;
          default:
            break;
        }
      }
    },
    [history]
  );

  return (
    <section className="login">
      <div className="container flex">
        <div className="login-form card">
          <div className="login-title">Sign Up</div>
          <form method="post" onSubmit={handleSignUp}>
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
            <div className="form-control">
              <label htmlFor="re-password-input">Re Password</label>
              <input id="re-password-input" type="password" name="rePassword" />
              <p className="error-msg">{rePasswordError}</p>
            </div>
            <p className="auth-form-text">
              Have an account ? <Link to="/log-in">Log-In</Link>
            </p>
            <input type="submit" value="Sign up" className="btn btn-login" />
          </form>
        </div>
      </div>
    </section>
  );
};

export default withRouter(SignUp);
