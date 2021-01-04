import React, { useState } from "react";
import Modal from "../Modal";
import Decrypt from "./Decrypt";
import Delete from "./Delete";
import Update from "./Update";

const Card = ({ id, keyCode, userName }) => {
  const [isDecryptModalOpen, setIsDecryptModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <>
      <div key={id} className="card">
        <div className="flex card-close">
          <span
            className="close"
            onClick={() => {
              setIsDeleteModalOpen(true);
            }}
          >
            &times;
          </span>
        </div>
        <div className="social-title">{id}</div>
        <small>{userName}</small>
        <div className="social-actions flex">
          <button
            className="btn"
            onClick={() => {
              setIsDecryptModalOpen(true);
            }}
          >
            copy
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => {
              setIsUpdateModalOpen(true);
            }}
          >
            update
          </button>
        </div>
      </div>
      {isDecryptModalOpen && (
        <Modal setIsModalOpen={setIsDecryptModalOpen}>
          <Decrypt
            setIsModalOpen={setIsDecryptModalOpen}
            keyCode={keyCode}
            id={id}
          />
        </Modal>
      )}
      {isUpdateModalOpen && (
        <Modal setIsModalOpen={setIsUpdateModalOpen}>
          <Update
            setIsModalOpen={setIsUpdateModalOpen}
            keyCode={keyCode}
            id={id}
            userName={userName}
          />
        </Modal>
      )}
      {isDeleteModalOpen && (
        <Modal setIsModalOpen={setIsDeleteModalOpen}>
          <Delete
            setIsModalOpen={setIsDeleteModalOpen}
            id={id}
            keyCode={keyCode}
          />
        </Modal>
      )}
    </>
  );
};

export default Card;
