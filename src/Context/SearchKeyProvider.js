import React, { useContext, useState } from "react";

const SearchedKeyContext = React.createContext();
const UpdateSearchedKeyContext = React.createContext();

export const useSearchedKey = () => {
  return useContext(SearchedKeyContext);
};

export const useUpdateSearchedKey = () => {
  return useContext(UpdateSearchedKeyContext);
};

const SearchKeyProvider = ({ children }) => {
  const [keyword, setKeyword] = useState("");

  return (
    <SearchedKeyContext.Provider value={keyword}>
      <UpdateSearchedKeyContext.Provider value={setKeyword}>
        {children}
      </UpdateSearchedKeyContext.Provider>
    </SearchedKeyContext.Provider>
  );
};

export default SearchKeyProvider;
