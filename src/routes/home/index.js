import { h, Component } from "preact";
import { auth, database } from "../../components/firebase";
import CurrentUser from "./CurrentUser";
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

    this.exercisesRef = database.ref("/exercises");

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleSubmit(e) {
    e.preventDefault();
    const exercisesRef = firebase.database().ref("exercises");
    const exercise = {
      title: this.state.title,
      setting: this.state.setting,
      settingType: this.state.settingType,
      reps: this.state.reps,
      raiseAfter: this.state.raiseAfter,
      raiseBy: this.state.raiseBy
    };
    exercisesRef.push(exercise);
  }

  componentDidMount() {
    auth.onAuthStateChanged(currentUser => {
      this.setState({ currentUser });
    });

    this.exercisesRef.on("value", snapshot => {
      this.setState({ exercises: snapshot.val() });
    });
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div class={style.home}>
        <section class="display-item">
          {!currentUser && <SignIn />}
          {currentUser &&
            <div>
              <CurrentUser user={currentUser} />
              <NewExercise user={currentUser} />
            </div>}
        </section>
      </div>
    );
  }
}
