import { h, Component } from "preact";
import { database } from "../../components/firebase";
import Exercise from "./Exercise";
import map from "lodash/map";

export default class Exercises extends Component {
  constructor(props) {
    super(props);
  }

  handleCompleted(key) {
    const currentUser = this.props.user;
    const setting = this.props.exercises[key].setting;
    database
      .ref("/" + currentUser.uid)
      .child("exercises")
      .child(key)
      .child("/sets")
      .push({
        completed: true,
        completedDate: Date.now(),
        setting: setting
      });
  }

  handleFailed(key) {
    const currentUser = this.props.user;
    const setting = this.props.exercises[key].setting;
    database
      .ref("/" + currentUser.uid)
      .child("exercises")
      .child(key)
      .child("/sets")
      .push({
        completed: false,
        completedDate: Date.now(),
        setting: setting
      });
  }

  render() {
    const { user, exercises } = this.props;
    return (
      <section>
        {map(exercises, (exercise, key) =>
          <Exercise
            handleCompleted={() => this.handleCompleted(key)}
            handleFailed={() => this.handleFailed(key)}
            key={key}
            {...exercise}
            user={user}
          />
        )}
      </section>
    );
  }
}
