import { h, Component } from "preact";
import map from "lodash/map";

export default class Exercise extends Component {
  render() {
    const {
      handleCompleted,
      name,
      sessions,
      setting,
      settingType,
      raiseAfter,
      raiseBy,
      reps
    } = this.props;
    console.log(sessions);
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
        <ul>
          {sessions &&
            map(sessions, (session, key) =>
              <li key={key}>
                <p>
                  {session.completed}
                </p>
                <p>
                  {session.completedDate}
                </p>
                <p>
                  {session.setting}
                </p>
              </li>
            )}
        </ul>
        <p>
          Raise by {raiseBy} {settingType} after {raiseAfter} sessions {reps}{" "}
          reps.
        </p>
      </article>
    );
  }
}
