import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container flex">
      <div className="login-form card">
        <h1 style={{ textAlign: "center" }}>404 - Page Not Found!</h1>
        <Link style={{ color: "#4787b5" }} to="/">
          Go Home
        </Link>
      </div>
    </div>
  );
}
