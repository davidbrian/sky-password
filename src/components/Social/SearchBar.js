import React, { useState } from "react";
import Create from "./Create";
import Modal from "../Modal";
import {
  useSearchedKey,
  useUpdateSearchedKey,
} from "../../Context/SearchKeyProvider";

const SearchBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const setSearchedKey = useUpdateSearchedKey();
  const searchedKey = useSearchedKey();

  return (
    <>
      <div className="social-search flex">
        <input
          type="text"
          placeholder="Search your social account..."
          aria-label="Search your social account..."
          value={searchedKey}
          onChange={(e) => {
            setSearchedKey(e.target.value);
          }}
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
