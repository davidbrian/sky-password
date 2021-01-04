import React from "react";
import Card from "./Card";
import useFetchSocial from "./useFetchSocial";

const Accounts = () => {
  const socials = useFetchSocial();
  return (
    <div className="grid">
      {socials.map((social) => {
        return (
          <Card
            key={social.id}
            id={social.id}
            keyCode={social.keyCode}
            userName={social.userName}
          />
        );
      })}
    </div>
  );
};

export default Accounts;
