import { h, Component } from "preact";
import map from "lodash/map";

export default class Exercise extends Component {
  render() {
    const {
      handleCompleted,
      name,
      setting,
      settingType,
      raiseAfter,
      raiseBy,
      reps
    } = this.props;
    return (
      <article>
        <h3>
          {name}
        </h3>
        <p>
          {setting} {settingType}
        </p>
        <p>
          <button onClick={handleCompleted} setting={setting}>
            Completed
          </button>
        </p>
        <p>
          Raise by {raiseBy} {settingType} after {raiseAfter} sessions {reps}{" "}
          reps.
        </p>
      </article>
    );
  }
}
