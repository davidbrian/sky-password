import React, { useState } from "react";
import aes from "crypto-js/aes";
import enc from "crypto-js/enc-utf8";
import app from "../../fire";
import { toast } from "react-toastify";

const Delete = ({ setIsModalOpen, keyCode, id }) => {
  const [decryptionKey, setDecryptionKey] = useState("");
  const [decryptionKeyError, setDecryptionKeyError] = useState("");

  const validateForm = async (e) => {
    e.preventDefault();
    setDecryptionKeyError("");

    if (decryptionKey === "") {
      setDecryptionKeyError("Please enter the decryption key");
      return false;
    }
    let decryptedKey = "";
    try {
      decryptedKey = aes.decrypt(keyCode, decryptionKey).toString(enc);
    } catch (e) {
      console.log(e);
    }
    if (decryptedKey === "") {
      setDecryptionKeyError("Decryption Key was incorrect!");
      return false;
    }

    let user = app.auth().currentUser;
    let uid = user.uid;

    await app
      .firestore()
      .collection("social")
      .doc(uid)
      .collection("userSocial")
      .doc(id)
      .delete();
    toast.error("✔️ Account removed!", {
      position: "top-center",
      hideProgressBar: true,
    });
  };

  return (
    <form onSubmit={validateForm}>
      <h2>Are you sure you want to delete this account?</h2>
      <div className="form-control">
        <label htmlFor={`decryption-key${id}`}>Decryption Key</label>
        <input
          type="password"
          id={`decryption-key${id}`}
          value={decryptionKey}
          onChange={(e) => setDecryptionKey(e.target.value)}
        />
        <p className="error-msg">{decryptionKeyError}</p>
      </div>
      <div className="form-control">
        <button className="btn btn-warning" type="submit">
          Yes
        </button>
        &nbsp;
        <button
          className="btn"
          type="button"
          onClick={() => {
            setIsModalOpen(false);
          }}
        >
          No
        </button>
      </div>
    </form>
  );
};

export default Delete;
