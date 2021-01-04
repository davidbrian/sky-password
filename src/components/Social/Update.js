import React, { useEffect, useState } from "react";
import aes from "crypto-js/aes";
import enc from "crypto-js/enc-utf8";
import { toast } from "react-toastify";
import firebase from "firebase";
import app from "../../fire";
import PasswordGenerator from "./PasswordGenerator";

const Update = ({ setIsModalOpen, keyCode, id, userName }) => {
  const [updatedUserName, setUpdatedUserName] = useState("");
  const [userNameError, setUserNameError] = useState("");

  const [oldEncryptionKey, setOldEncryptionKey] = useState("");
  const [OldEncryptionKeyError, setOldEncryptionKeyError] = useState("");

  const [socialPassword, setSocialPassword] = useState("");
  const [socialPasswordError, setSocialPasswordError] = useState("");

  const [encryptionKey, setEncryptionKey] = useState("");
  const [encryptionKeyError, setEncryptionKeyError] = useState("");

  const [isAccountUpdated, setIsAccountUpdated] = useState(false);
  const [isAccountUpdatedError, setIsAccountUpdatedError] = useState("");

  const [generateIsOngoing, setGenerateIsOnGoing] = useState(false);
  useEffect(() => {
    setUpdatedUserName(userName);
  }, [userName]);

  const updateSocial = async (e) => {
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
      .doc(id)
      .set({
        userName: updatedUserName,
        keyCode: encryptedPassword.toString(),
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .catch((error) => {
        console.log("Storing Error", error);
        return false;
      });

    toast.dark("🏆 Social Account Updated!", {
      position: "top-center",
      hideProgressBar: true,
    });
    setIsModalOpen(false);
  };

  const validateForm = () => {
    let formErrors = 0;
    setUserNameError("");
    setOldEncryptionKeyError("");
    setSocialPasswordError("");
    setEncryptionKeyError("");
    setIsAccountUpdatedError("");
    if (updatedUserName === "") {
      setUserNameError("Please put the account username.");
      formErrors++;
    }
    if (oldEncryptionKey === "") {
      setOldEncryptionKeyError("Enter your old encryption key.");
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
    let decryptedKey = aes.decrypt(keyCode, oldEncryptionKey).toString(enc);
    if (decryptedKey === "" && oldEncryptionKey !== "") {
      setOldEncryptionKeyError("Old Encryption Key was incorrect!");
    }
    if (formErrors > 0) {
      return false;
    }
    return true;
  };

  const copyPassword = () => {
    setSocialPasswordError("");
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
    <form onSubmit={updateSocial}>
      <h2>Update Social Account</h2>
      <div className="form-control">
        <label htmlFor="account-title">Account title</label>
        <input type="text" id="account-title" value={id} disabled />
      </div>
      <div className="form-control">
        <label htmlFor="account-title">Username</label>
        <input
          type="text"
          id="username"
          value={updatedUserName}
          onChange={(e) => setUpdatedUserName(e.target.value)}
        />
        <p className="error-msg">{userNameError}</p>
      </div>
      <div className="form-control">
        <label htmlFor="old-encryption-key">Old Encryption Key</label>
        <input
          type="text"
          id="old-encryption-key"
          value={oldEncryptionKey}
          onChange={(e) => {
            setOldEncryptionKey(e.target.value);
          }}
        />
        <p className="error-msg">{OldEncryptionKeyError}</p>
      </div>
      <div className="form-control">
        <label htmlFor="new-password">New password</label>
        <input type="text" id="new-password" value={socialPassword} disabled />
        <p className="error-msg">{socialPasswordError}</p>
      </div>
      <div className="form-control">
        <label htmlFor="encryption-key">New Encryption Key</label>
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
          update
        </button>
      </div>
    </form>
  );
};

export default Update;
