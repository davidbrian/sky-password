import React from "react";

const Modal = ({ children, isModalOpen, setIsModalOpen }) => {
  const getModalStatus = () => {
    return isModalOpen ? { display: "block" } : { display: "none" };
  };
  return (
    <div className="modal" style={getModalStatus()}>
      <div className="modal-content">
        <div className="modal-header">
          <span className="close" onClick={() => setIsModalOpen(false)}>
            &times;
          </span>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
