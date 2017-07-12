import { h, Component } from "preact";
import { database } from "../../components/firebase";
import Exercise from "./Exercise";
import { filter, map } from "lodash";

export default class Exercises extends Component {
  constructor(props) {
    super(props);
  }

  handleCompleted(key) {
    const currentUser = this.props.user;
    const raiseAfter = this.props.exercises[key].raiseAfter;
    const raiseBy = this.props.exercises[key].raiseBy;
    const setting = this.props.exercises[key].setting;
    const completedCount = filter(this.props.exercises[key].sets, {
      setting: setting,
      completed: true
    }).length;

    if (completedCount < raiseAfter - 1) {
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
    } else {
      function checkForDecimal() {
        if (raiseBy.indexOf(".") === -1) {
          return Number(setting) + Number(raiseBy);
        } else {
          return (Number(setting) + Number(raiseBy)).toFixed(1);
        }
      }

      const newSetting = checkForDecimal();

      console.log(newSetting);
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
      database
        .ref("/" + currentUser.uid)
        .child("exercises")
        .child(key)
        .update({ setting: newSetting });
    }
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
            handleRaise={() => this.handleRaise(key)}
            key={key}
            {...exercise}
            user={user}
          />
        )}
      </section>
    );
  }
}
