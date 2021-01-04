import React, { useState } from "react";
import Create from "./Create";
import Modal from "../Modal";

const SearchBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="social-search flex">
        <input
          type="text"
          placeholder="Search your social account..."
          aria-label="Search your social account..."
        />
        <button className="btn" onClick={() => setIsModalOpen(true)}>
          add account
        </button>
      </div>
      {isModalOpen && (
        <Modal setIsModalOpen={setIsModalOpen}>
          <Create setIsModalOpen={setIsModalOpen} />
        </Modal>
      )}
    </>
  );
};

export default SearchBar;
