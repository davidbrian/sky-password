import React, { useState } from "react";
import cryptoRandomString from "crypto-random-string";

const PasswordGenerator = ({ setSocialPassword, setGenerateIsOnGoing }) => {
  const [passwordLength, setPasswordLength] = useState(8);
  const filterPasswordLength = (value) => {
    let passLength = value.replace(/[^0-9]/g, "");
    passLength = passLength > 24 ? 24 : passLength === "" ? 0 : passLength;
    setPasswordLength(parseInt(passLength));
  };
  const generatePassword = (e) => {
    e.preventDefault();

    const passLength =
      passwordLength > 24 ? 24 : passwordLength < 8 ? 8 : passwordLength;
    let newPassword = cryptoRandomString({
      length: passLength,
      type: "alphanumeric",
    });
    setPasswordLength(8);
    setSocialPassword(newPassword);
    setGenerateIsOnGoing(false);
  };
  return (
    <form onSubmit={generatePassword}>
      <h2>Password Generator</h2>
      <div className="form-control">
        <label htmlFor="password-length">Preferred Password Length</label>
        <input
          id="password-length"
          type="text"
          value={passwordLength}
          onChange={(e) => {
            filterPasswordLength(e.target.value);
          }}
          min="1"
          max="24"
        />
        <small>
          <strong>&nbsp;min(8) to max(24)</strong>
        </small>
      </div>
      <div className="flex new-password-actions">
        <button className="btn" type="submit">
          generate
        </button>
      </div>
    </form>
  );
};

export default PasswordGenerator;
