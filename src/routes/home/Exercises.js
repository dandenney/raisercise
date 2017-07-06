import { h, Component } from "preact";
import { database } from "../../components/firebase";
import Exercise from "./Exercise";
import map from "lodash/map";

export default class Exercises extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { user, exercises } = this.props;
    return (
      <section>
        {map(exercises, (exercise, key) =>
          <Exercise key={key} {...exercise} user={user} />
        )}
      </section>
    );
  }
}
