import React, { useState, useEffect } from "react";
import app from "../../fire";
import Card from "./Card";

const Accounts = () => {
  const [socials, setSocials] = useState([]);

  useEffect(() => {
    const user = app.auth().currentUser;
    const uid = user.uid;
    const observer = app
      .firestore()
      .collection("social")
      .doc(uid)
      .collection("userSocial")
      .onSnapshot((querySnapshot) => {
        querySnapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            setSocials((socialList) => [
              ...socialList,
              { id: change.doc.id, ...change.doc.data() },
            ]);
          }
          if (change.type === "modified") {
            setSocials((socialList) => {
              return socialList.map((social) => {
                if (social.id === change.doc.id) {
                  social = { id: change.doc.id, ...change.doc.data() };
                }
                return social;
              });
            });
          }
          //   if (change.type === "removed") {
          //     console.log("Removed city: ", change.doc.data());
          //   }
        });
      });

    return observer;
  }, [setSocials]);

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
