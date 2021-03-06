import { h, Component } from "preact";
import { auth, database } from "../../components/firebase";
import CurrentUser from "./CurrentUser";
import Exercises from "./Exercises";
import NewExercise from "./NewExercise";
import SignIn from "./SignIn";
import style from "./style";

export default class Home extends Component {
  constructor() {
    super();

    this.state = {
      currentUser: null,
      exercises: null
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged(currentUser => {
      this.setState({ currentUser });

      const exercisesRef = database.ref(
        "/" + this.state.currentUser.uid + "/exercises"
      );

      exercisesRef.on("value", snapshot => {
        this.setState({ exercises: snapshot.val() });
      });
    });
  }

  render() {
    const { currentUser, exercises } = this.state;

    return (
      <section class={style.home}>
        {!currentUser && <SignIn />}
        {currentUser &&
          <div class={style.flex}>
            <Exercises exercises={exercises} user={currentUser} />
            <NewExercise user={currentUser} />
            <CurrentUser user={currentUser} />
          </div>}
      </section>
    );
  }
}
