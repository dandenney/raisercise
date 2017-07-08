import { h, Component } from "preact";
import map from "lodash/map";

export default class Exercise extends Component {
  render() {
    const {
      handleCompleted,
      handleFailed,
      name,
      sets,
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
          <button onClick={handleFailed} setting={setting}>
            Failed
          </button>
        </p>
        <ul>
          {sets &&
            map(sets, (set, key) =>
              <li key={key}>
                <p>
                  {set.completed}
                </p>
                <p>
                  {set.completedDate}
                </p>
                <p>
                  {set.setting}
                </p>
              </li>
            )}
        </ul>
        <p>
          Raise by {raiseBy} {settingType} after {raiseAfter} sets {reps} reps.
        </p>
      </article>
    );
  }
}
