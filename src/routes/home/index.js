import { h, Component } from 'preact'
import firebase from '../../components/firebase'
import Completed from './completed'
import Failed from './failed'
import style from './style'

export default class Home extends Component {
  constructor () {
    super()
    this.state = {
      title: '',
      setting: '',
      settingType: '',
      reps: '',
      raiseAfter: '',
      raiseBy: '',
      exercises: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit (e) {
    e.preventDefault()
    const exercisesRef = firebase.database().ref('exercises')
    const exercise = {
      title: this.state.title,
      setting: this.state.setting,
      settingType: this.state.settingType,
      reps: this.state.reps,
      raiseAfter: this.state.raiseAfter,
      raiseBy: this.state.raiseBy
    }
    exercisesRef.push(exercise)
    this.setState({
      title: '',
      setting: '',
      settingType: '',
      reps: '',
      raiseAfter: '',
      raiseBy: ''
    })
  }

  componentDidMount () {
    const exercisesRef = firebase.database().ref('exercises')
    exercisesRef.on('value', snapshot => {
      let exercises = snapshot.val()
      let newState = []
      for (let exercise in exercises) {
        newState.push({
          id: exercise,
          title: exercises[exercise].title,
          setting: exercises[exercise].setting,
          settingType: exercises[exercise].settingType,
          reps: exercises[exercise].reps,
          raiseAfter: exercises[exercise].raiseAfter,
          raiseBy: exercises[exercise].raiseBy
        })
      }
      this.setState({
        exercises: newState
      })
    })
  }

  render () {
    return (
      <div class={style.home}>
        <section class="display-item">
          <div class="wrapper">
            <ul>
              {this.state.exercises.map(exercise => {
                return (
                  <li key={exercise.id}>
                    <h2>
                      {exercise.title}
                    </h2>
                    <p>
                      {exercise.setting}
                      &nbsp;
                      {exercise.settingType}
                    </p>
                    <p>
                      <Completed exerciseID={exercise.id} />
                      <Failed exerciseID={exercise.id} />
                    </p>
                    <p>
                      Raise by {exercise.raiseBy} {exercise.settingType} after{' '}
                      {exercise.raiseAfter} sets of {exercise.reps} reps.
                    </p>
                  </li>
                )
              })}
            </ul>
          </div>
        </section>
        <form onSubmit={this.handleSubmit}>
          <p>
            <input
              type="text"
              name="title"
              onChange={this.handleChange}
              placeholder="What's the exercise called?"
              value={this.state.title}
            />
          </p>
          <p>
            <input
              type="text"
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
              type="text"
              name="reps"
              onChange={this.handleChange}
              placeholder="How many repetitions?"
              value={this.state.reps}
            />
          </p>
          <p>
            <input
              type="text"
              name="raiseAfter"
              onChange={this.handleChange}
              placeholder="How many sessions to raise the setting?"
              value={this.state.raiseAfter}
            />
          </p>
          <p>
            <input
              type="text"
              name="raiseBy"
              onChange={this.handleChange}
              placeholder="How much to raise the setting?"
              value={this.state.raiseBy}
            />
          </p>
          <button>Add exercise</button>
        </form>
      </div>
    )
  }
}
