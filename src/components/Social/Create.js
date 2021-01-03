import React, { useState } from "react";
import app from "../../fire";
import PasswordGenerator from "./PasswordGenerator";
import firebase from "firebase";
import aes from "crypto-js/aes";
import { toast } from "react-toastify";

const Create = ({ setIsModalOpen }) => {
  const [accountTitle, setAccountTitle] = useState("");
  const [accountTitleError, setAccountTitleError] = useState("");

  const [userName, setUserName] = useState("");
  const [userNameError, setUserNameError] = useState("");

  const [socialPassword, setSocialPassword] = useState("");
  const [socialPasswordError, setSocialPasswordError] = useState("");

  const [encryptionKey, setEncryptionKey] = useState("");
  const [encryptionKeyError, setEncryptionKeyError] = useState("");

  const [isAccountUpdated, setIsAccountUpdated] = useState(false);
  const [isAccountUpdatedError, setIsAccountUpdatedError] = useState("");

  const [generateIsOngoing, setGenerateIsOnGoing] = useState(false);

  const validateForm = () => {
    let formErrors = 0;
    setAccountTitleError("");
    setUserNameError("");
    setSocialPasswordError("");
    setEncryptionKeyError("");
    setIsAccountUpdatedError("");
    if (userName === "") {
      setUserNameError("Please put the account username.");
      formErrors++;
    }
    if (accountTitle === "") {
      setAccountTitleError("Please put the account title.");
      formErrors++;
    }
    if (socialPassword === "") {
      setSocialPasswordError("Generate a password first.");
      formErrors++;
    }
    if (encryptionKey === "") {
      setEncryptionKeyError("Please enter the encryption key.");
      formErrors++;
    }
    if (!isAccountUpdated) {
      setIsAccountUpdatedError(
        "Please make sure you have updated your social account first."
      );
      formErrors++;
    }
    if (formErrors > 0) {
      return false;
    }
    return true;
  };

  const saveSocial = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return false;
    }
    let user = app.auth().currentUser;
    let uid = user.uid;
    let encryptedPassword = aes.encrypt(socialPassword, encryptionKey);

    await app
      .firestore()
      .collection("social")
      .doc(uid)
      .collection("userSocial")
      .doc(accountTitle)
      .set({
        userName,
        keyCode: encryptedPassword.toString(),
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .catch((error) => {
        console.log("Storing Error", error);
        return false;
      });

    setIsModalOpen(false);
    setAccountTitle("");
    setUserName("");
    setSocialPassword("");
    setEncryptionKey("");
    toast.dark("🏆 Social Account Created!", {
      position: "top-center",
      hideProgressBar: true,
    });
  };

  const copyPassword = () => {
    if (socialPassword === "") {
      setSocialPasswordError("Generate a password first.");
      return false;
    }
    navigator.clipboard.writeText(socialPassword);
    toast.dark("✔️ Password copied!", {
      position: "top-center",
      hideProgressBar: true,
    });
  };

  return generateIsOngoing ? (
    <PasswordGenerator
      setSocialPassword={setSocialPassword}
      setGenerateIsOnGoing={setGenerateIsOnGoing}
    />
  ) : (
    <form onSubmit={saveSocial}>
      <h2>Create Social Account</h2>
      <div className="form-control">
        <label htmlFor="account-title">Account title</label>
        <input
          type="text"
          id="account-title"
          value={accountTitle}
          onChange={(e) => setAccountTitle(e.target.value)}
        />
        <p className="error-msg">{accountTitleError}</p>
      </div>
      <div className="form-control">
        <label htmlFor="account-title">Username</label>
        <input
          type="text"
          id="username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <p className="error-msg">{userNameError}</p>
      </div>
      <div className="form-control">
        <label htmlFor="new-password">New password</label>
        <input type="text" id="new-password" value={socialPassword} disabled />
        <p className="error-msg">{socialPasswordError}</p>
      </div>
      <div className="form-control">
        <label htmlFor="encryption-key">Encryption Key</label>
        <input
          type="text"
          id="encryption-key"
          value={encryptionKey}
          onChange={(e) => {
            setEncryptionKey(e.target.value);
          }}
        />
        <p className="error-msg">{encryptionKeyError}</p>
      </div>
      <div className="form-control">
        <input
          type="checkbox"
          id="is-account-updated"
          checked={isAccountUpdated}
          onChange={() => {
            setIsAccountUpdated(!isAccountUpdated);
          }}
        />
        <label htmlFor="is-account-updated" className="is-account-updated">
          <small>
            <strong>
              &nbsp;I've updated my account password using this password.
            </strong>
          </small>
        </label>
        <p className="error-msg">{isAccountUpdatedError}</p>
      </div>
      <div className="flex new-password-actions">
        <button
          className="btn"
          type="button"
          onClick={() => {
            setGenerateIsOnGoing(true);
          }}
        >
          generate password
        </button>
        <button
          className="btn btn-secondary"
          type="button"
          onClick={copyPassword}
        >
          copy password
        </button>
        <button className="btn btn-warning" type="submit">
          save
        </button>
      </div>
    </form>
  );
};

export default Create;
