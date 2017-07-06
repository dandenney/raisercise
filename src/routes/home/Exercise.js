import { h, Component } from "preact";
import map from "lodash/map";

export default class Exercise extends Component {
  render() {
    const {
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
          Raise by {raiseBy} {settingType} after {raiseAfter} sessions {reps}{" "}
          reps.
        </p>
      </article>
    );
  }
}
