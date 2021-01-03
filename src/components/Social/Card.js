import React, { useState } from "react";
import { toast } from "react-toastify";
import aes from "crypto-js/aes";
import enc from "crypto-js/enc-utf8";
import Modal from "../Modal";

const Card = ({ id, keyCode, userName }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [decryptionKey, setDecryptionKey] = useState("");
  const [decryptionKeyError, setDecryptionKeyError] = useState("");

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
      toast.error("Failed! Something went wrong...", {
        position: "top-center",
        hideProgressBar: true,
      });
      return;
    }
    setDecryptionKey("");

    copyPassword(decryptedKey);
  };

  return (
    <>
      <div key={id} className="card">
        <div className="social-title">{id}</div>
        <small>{userName}</small>
        <div className="social-actions flex">
          <button
            className="btn"
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            copy
          </button>
          <button className="btn btn-secondary">update</button>
        </div>
      </div>
      <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
        <form onSubmit={decryptKeyCode}>
          <h2>Please enter the decryption key:</h2>
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
      </Modal>
    </>
  );
};

export default Card;
