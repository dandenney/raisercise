import { h, Component } from "preact";
import { database } from "../../components/firebase";

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
          <p>
            <input
              type="text"
              name="name"
              onChange={this.handleChange}
              placeholder="What's the exercise named?"
              value={this.state.name}
            />
          </p>
          <p>
            <input
              type="number"
              name="setting"
              onChange={this.handleChange}
              placeholder="What's the starting setting?"
              value={this.state.setting}
            />
          </p>
          <p>
            <input
              type="text"
              name="settingType"
              onChange={this.handleChange}
              placeholder="What's it measured in?"
              value={this.state.settingType}
            />
          </p>
          <p>
            <input
              type="number"
              name="reps"
              onChange={this.handleChange}
              placeholder="How many repetitions?"
              value={this.state.reps}
            />
          </p>
          <p>
            <input
              type="number"
              name="raiseAfter"
              onChange={this.handleChange}
              placeholder="How many sessions to raise the setting?"
              value={this.state.raiseAfter}
            />
          </p>
          <p>
            <input
              type="number"
              name="raiseBy"
              onChange={this.handleChange}
              placeholder="How much to raise the setting?"
              value={this.state.raiseBy}
            />
          </p>
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
