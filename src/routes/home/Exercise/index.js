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
          <div class={style.settingText}>{setting}</div> {settingType}
        </p>
        <p class={style.buttons}>
          <button
            class={style.buttonFailed}
            onClick={handleFailed}
            setting={setting}
          >
            <img src="/assets/icons/bold-remove.svg" width="20" />
          </button>
          <button
            class={style.buttonCompleted}
            onClick={handleCompleted}
            setting={setting}
          >
            <img src="/assets/icons/check-simple.svg" width="30" />
          </button>
        </p>
        <ul class={style.completedList}>
          {sets &&
            map(filters, (filter, key) =>
              <li class={style.completed} key={key} />
            )}
        </ul>
      </article>
    );
  }
}
