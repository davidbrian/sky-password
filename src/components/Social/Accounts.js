import React from "react";
import { useSearchedKey } from "../../Context/SearchKeyProvider";
import Card from "./Card";
import useFetchSocial from "./useFetchSocial";

const Accounts = () => {
  const socials = useFetchSocial();
  const searchedKey = useSearchedKey();

  return (
    <div className="grid">
      {socials.map(({ id, keyCode, userName }) => {
        if (
          searchedKey === "" ||
          (id &&
            searchedKey &&
            id.toLowerCase().includes(searchedKey.toLowerCase()))
        ) {
          return (
            <Card key={id} id={id} keyCode={keyCode} userName={userName} />
          );
        }
        return null;
      })}
    </div>
  );
};

export default Accounts;
