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

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleCompleted(exerciseID, exerciseSetting) {
    const statusRef = firebase
      .database()
      .ref(`exercises/${exerciseID}/sessions`);
    const session = {
      completed: true,
      completedDate: Date.now(),
      setting: exerciseSetting
    };
    statusRef.push(session);
  }

  handleFailed(exerciseID, exerciseSetting) {
    const statusRef = firebase
      .database()
      .ref(`exercises/${exerciseID}/sessions`);
    const session = {
      completed: false,
      completedDate: Date.now(),
      setting: exerciseSetting
    };
    statusRef.push(session);
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
      <div class={style.home}>
        <section class="display-item">
          {!currentUser && <SignIn />}
          {currentUser &&
            <div>
              <CurrentUser user={currentUser} />
              <Exercises exercises={exercises} user={currentUser} />
              <NewExercise user={currentUser} />
            </div>}
        </section>
      </div>
    );
  }
}
