import { h, Component } from 'preact'
import firebase from '../../components/firebase'
import style from './style'

export default class Home extends Component {
  constructor () {
    super()
    this.state = {
      title: '',
      settingType: '',
      series: [],
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
      settingType: this.state.settingType
    }
    exercisesRef.push(exercise)
    this.setState({
      title: '',
      settingType: '',
      setting: ''
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
          settingType: exercises[exercise].settingType
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
              name="settingType"
              onChange={this.handleChange}
              placeholder="What's it measured in?"
              value={this.state.settingType}
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
          <button>Add exercise</button>
        </form>
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
                      {exercise.settingType}
                    </p>
                  </li>
                )
              })}
            </ul>
          </div>
        </section>
      </div>
    )
  }
}
