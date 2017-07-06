import { h, Component } from "preact";
import { auth } from "../../components/firebase";

const CurrentUser = ({ user }) => {
  return (
    <article>
      <img alt={user.displayName} src={user.photoURL} width="60" />
      <h4>
        {user.displayName}
      </h4>
      <button onClick={() => auth.signOut()}>Sign Out</button>
    </article>
  );
};

export default CurrentUser;
