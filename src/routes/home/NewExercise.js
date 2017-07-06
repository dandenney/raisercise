import { h, Component } from "preact";
import { database } from "../../components/firebase";

export default class NewExercise extends Component {
  constructor() {
    super();
    this.state = {
      name: ""
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
    exercisesRef.push({ name: this.state.name });
  }

  render() {
    const { name } = this.state;

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
