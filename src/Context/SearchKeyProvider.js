import React, { useContext, useState } from "react";

const SearchedKeyContext = React.createContext();
const updateSearchedKeyContext = React.createContext();

export const useSearchedKey = () => {
  return useContext(SearchedKeyContext);
};

export const useUpdateSearchedKey = () => {
  return useContext(updateSearchedKeyContext);
};

const SearchKeyProvider = ({ children }) => {
  const [keyword, setKeyword] = useState("");

  return (
    <SearchedKeyContext.Provider value={keyword}>
      <updateSearchedKeyContext.Provider value={setKeyword}>
        {children}
      </updateSearchedKeyContext.Provider>
    </SearchedKeyContext.Provider>
  );
};

export default SearchKeyProvider;
