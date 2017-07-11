import { h, Component } from "preact";
import { database } from "../../../components/firebase";

import style from "./style";

export default class NewExercise extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      raiseAfter: "",
      raiseBy: "",
      reps: "",
      setting: "",
      settingType: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const exercisesRef = database.ref("/" + this.props.user.uid + "/exercises");
    exercisesRef.push({
      name: this.state.name,
      setting: this.state.setting,
      settingType: this.state.settingType,
      raiseAfter: this.state.raiseAfter,
      raiseBy: this.state.raiseBy,
      reps: this.state.reps
    });
  }

  render() {
    const {
      name,
      setting,
      settingType,
      raiseAfter,
      raiseBy,
      reps
    } = this.state;

    return (
      <section>
        <h2>New Exercise</h2>

        <form>
          <div class={style.fieldset}>
            <label for="name">Name</label>
            <input
              type="text"
              name="name"
              onChange={this.handleChange}
              placeholder="Chest Press"
              value={this.state.name}
            />
          </div>
          <div class={style.split}>
            <div class={style.fieldset}>
              <label for="setting">Initial Setting</label>
              <input
                type="number"
                name="setting"
                onChange={this.handleChange}
                placeholder="85"
                value={this.state.setting}
              />
            </div>
            <div class={style.fieldset}>
              <label for="settingType">Setting Type</label>
              <input
                type="text"
                name="settingType"
                onChange={this.handleChange}
                placeholder="lbs"
                value={this.state.settingType}
              />
            </div>
          </div>
          <div class={style.fieldset}>
            <label for="reps">Reps</label>
            <input
              type="number"
              name="reps"
              onChange={this.handleChange}
              placeholder="5"
              value={this.state.reps}
            />
          </div>
          <div class={style.split}>
            <div class={style.fieldset}>
              <label for="raiseAfter">Raise After (Sets)</label>
              <input
                type="number"
                name="raiseAfter"
                onChange={this.handleChange}
                placeholder="6"
                value={this.state.raiseAfter}
              />
            </div>
            <div class={style.fieldset}>
              <label for="raiseBy">Raise By (Type)</label>
              <input
                type="number"
                name="raiseBy"
                onChange={this.handleChange}
                placeholder="5"
                value={this.state.raiseBy}
              />
            </div>
          </div>
          <input
            disable={!name}
            onClick={this.handleSubmit}
            type="submit"
            value="Add Exercise"
          />
        </form>
      </section>
    );
  }
}
