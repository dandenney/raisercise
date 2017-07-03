import { h, Component } from 'preact'
import firebase from '../../components/firebase'

export default class Completed extends Component {
  constructor () {
    super()
    this.handleStatus = this.handleStatus.bind(this)
  }

  handleStatus (e) {
    const statusRef = firebase
      .database()
      .ref(`exercises/${this.props.exerciseID}/sessions`)
    const session = {
      completed: true,
      completedDate: Date.now()
    }
    statusRef.push(session)
  }

  render () {
    return <button onClick={this.handleStatus}>Completed</button>
  }
}
