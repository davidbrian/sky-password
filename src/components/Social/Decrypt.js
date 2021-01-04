import React, { useState } from "react";
import aes from "crypto-js/aes";
import enc from "crypto-js/enc-utf8";
import { toast } from "react-toastify";

const Decrypt = ({ setIsModalOpen, id, keyCode }) => {
  const [decryptionKeyError, setDecryptionKeyError] = useState("");
  const [decryptionKey, setDecryptionKey] = useState("");

  const copyPassword = (decryptedKey) => {
    navigator.clipboard.writeText(decryptedKey);
    toast.dark("✔️ Password copied!", {
      position: "top-center",
      hideProgressBar: true,
    });
    setIsModalOpen(false);
  };

  const decryptKeyCode = (e) => {
    e.preventDefault();
    setDecryptionKeyError("");

    if (decryptionKey === "") {
      setDecryptionKeyError("Please enter the decryption key");
      return;
    }
    let decryptedKey = aes.decrypt(keyCode, decryptionKey).toString(enc);
    if (decryptedKey === "") {
      toast.error("Decryption Key was incorrect!", {
        position: "top-center",
        hideProgressBar: true,
      });
      return;
    }
    setDecryptionKey("");

    copyPassword(decryptedKey);
  };
  return (
    <form onSubmit={decryptKeyCode}>
      <h2>Please enter the decryption key</h2>
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
      <button className="btn" type="submit">
        Confirm
      </button>
    </form>
  );
};

export default Decrypt;
