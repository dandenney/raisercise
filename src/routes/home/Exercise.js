import { h, Component } from "preact";
import { filter, map } from "lodash";

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
    const filters = filter(sets, {
      setting: setting,
      completed: true
    });
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
          {sets && map(filters, (filter, key) => <li key={key} />)}
        </ul>
        <p>
          Raise by {raiseBy} {settingType} after {raiseAfter} sets {reps} reps.
        </p>
      </article>
    );
  }
}
