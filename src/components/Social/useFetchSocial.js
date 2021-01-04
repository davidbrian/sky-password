import { useEffect, useReducer } from "react";
import app from "../../fire";

const reducer = (socials, action) => {
  switch (action.type) {
    case "added":
      return [...socials, action.payload];
    case "modified":
      return socials.map((social) => {
        if (social.id === action.payload.id) {
          social = action.payload;
        }
        return social;
      });
    case "removed":
      return socials.filter((social) => social.id !== action.payload.id);
    default:
      return socials;
  }
};

const useFetchSocial = () => {
  const [socials, dispatch] = useReducer(reducer, []);

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
          dispatch({
            type: change.type,
            payload: { id: change.doc.id, ...change.doc.data() },
          });
        });
      });

    return observer;
  }, [dispatch]);

  return socials;
};

export default useFetchSocial;
