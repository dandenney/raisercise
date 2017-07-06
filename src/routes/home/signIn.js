import { h, Component } from "preact";
import { auth, googleAuthProvider } from "../../components/firebase";

export default class SignIn extends Component {
  render() {
    return (
      <div>
        <button onClick={() => auth.signInWithRedirect(googleAuthProvider)}>
          Sign In
        </button>
      </div>
    );
  }
}
