import React from "react";
import app from "../fire";

export default function Header() {
  return (
    <div className="navbar">
      <div className="container flex">
        <div className="logo">Skypass</div>
        <nav>
          <ul>
            <li>
              <button>My account</button>
            </li>
            <li>
              <button onClick={() => app.auth().signOut()}>Sign out</button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
