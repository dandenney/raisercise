import { h, Component } from "preact";
import { auth, database } from "../../components/firebase";
import SignIn from "./signIn";
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
              <article>User</article>
              <form onSubmit={this.handleSubmit}>
                <p>
                  <input
                    type="text"
                    name="title"
                    onChange={this.handleChange}
                    placeholder="What's the exercise called?"
                    value={this.state.title}
                  />
                </p>
                <p>
                  <input
                    type="text"
                    name="setting"
                    onChange={this.handleChange}
                    placeholder="What's the starting setting?"
                    value={this.state.setting}
                  />
                </p>
                <p>
                  <input
                    type="text"
                    name="settingType"
                    onChange={this.handleChange}
                    placeholder="What's it measured in?"
                    value={this.state.settingType}
                  />
                </p>
                <p>
                  <input
                    type="text"
                    name="reps"
                    onChange={this.handleChange}
                    placeholder="How many repetitions?"
                    value={this.state.reps}
                  />
                </p>
                <p>
                  <input
                    type="text"
                    name="raiseAfter"
                    onChange={this.handleChange}
                    placeholder="How many sessions to raise the setting?"
                    value={this.state.raiseAfter}
                  />
                </p>
                <p>
                  <input
                    type="text"
                    name="raiseBy"
                    onChange={this.handleChange}
                    placeholder="How much to raise the setting?"
                    value={this.state.raiseBy}
                  />
                </p>
                <button>Add exercise</button>
              </form>
            </div>}
        </section>
      </div>
    );
  }
}
