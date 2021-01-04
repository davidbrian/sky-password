import React, { useState } from "react";
import { toast } from "react-toastify";
import aes from "crypto-js/aes";
import enc from "crypto-js/enc-utf8";

const Delete = ({ setIsModalOpen, keyCode, id }) => {
  const [decryptionKeyError, setDecryptionKeyError] = useState("");
  const [decryptionKey, setDecryptionKey] = useState("");

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
  };

  return (
    <>
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
        <button className="btn btn-warning" type="button">
          Yes
        </button>
        &nbsp;
        <button
          className="btn"
          type="submit"
          onClick={() => {
            setIsModalOpen(false);
          }}
        >
          No
        </button>
      </div>
    </>
  );
};

export default Delete;
