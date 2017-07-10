import { h, Component } from "preact";
import { auth } from "../../../components/firebase";

import style from "./style";

const CurrentUser = ({ user }) => {
  return (
    <article class={style.currentUser}>
      <img
        alt={user.displayName}
        class={style.avatar}
        src={user.photoURL}
        width="40"
      />
      <button class={style.button} onClick={() => auth.signOut()}>
        Sign Out
      </button>
    </article>
  );
};

export default CurrentUser;
