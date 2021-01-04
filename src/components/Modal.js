import React, { useEffect, useRef } from "react";

const Modal = ({ children, setIsModalOpen }) => {
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef, setIsModalOpen]);

  return (
    <div className="modal">
      <div className="modal-content" ref={wrapperRef}>
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
