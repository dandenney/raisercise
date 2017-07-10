import { h, Component } from "preact";
import { auth, googleAuthProvider } from "../../../components/firebase";

import style from "./style";

export default class SignIn extends Component {
  render() {
    return (
      <section class={style.signIn}>
        <button onClick={() => auth.signInWithRedirect(googleAuthProvider)}>
          Sign In
        </button>
      </section>
    );
  }
}
