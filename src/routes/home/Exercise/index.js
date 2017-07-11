import { h, Component } from "preact";
import { filter, map } from "lodash";

import style from "./style";

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
      <article class={style.exercise}>
        <h3 class={style.h3}>
          {name}
        </h3>
        <p class={style.setting}>
          <span class={style.settingText}>{setting}</span> {settingType}
        </p>
        <p class={style.buttons}>
          <button
            class={style.buttonFailed}
            onClick={handleFailed}
            setting={setting}
          >
            Failed
          </button>
          <button
            class={style.buttonCompleted}
            onClick={handleCompleted}
            setting={setting}
          >
            Completed
          </button>
        </p>
        <ul class={style.completedList}>
          {sets &&
            map(filters, (filter, key) =>
              <li class={style.completed} key={key} />
            )}
        </ul>
        <p class={style.instructions}>
          Raise by {raiseBy} {settingType} after {raiseAfter} sets of {reps}{" "}
          reps.
        </p>
      </article>
    );
  }
}
