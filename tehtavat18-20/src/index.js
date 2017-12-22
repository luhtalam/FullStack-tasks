import React from 'react'
import ReactDOM from 'react-dom'
import "./index.css"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      votes: [0, 0, 0, 0, 0, 0]
    }
  }

  setValue = (value) => () => {
    this.setState({
      selected: value
    })
  }

  addVote = (index) => () => {
    let newVotes = this.state.votes
    newVotes[index] += 1
    this.setState({
      votes: newVotes
    })
  }

  render() {
    return (
      <div>
        <div>
          <p>{this.props.anecdotes[this.state.selected]}</p>
        </div>
        <div>
          has {this.state.votes[this.state.selected]} votes
        </div>
        <div>
          <Button handleClick={this.addVote(this.state.selected)} text="vote" />
          <Button handleClick={this.setValue(randomInteger(0, anecdotes.length - 1))} text="next anecdote" />
        </div>
        <div>
          <h3>Anecdote with most votes:</h3>
        </div>
        <div>
          <MostVotes votes={this.state.votes} />
        </div>
      </div>
    )
  }
}

const findMaxIndex = (array) => {
  return array.reduce((maxIndex, curr, i, arr) =>
    curr > arr[maxIndex] ? i : maxIndex, 0)
}

const randomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const MostVotes = ({ votes }) => {
  let i = findMaxIndex(votes)
  return (
    <div>
      <div>
        <p>{anecdotes[i]}</p>
      </div>
      <div>has {votes[i]} votes</div>
    </div>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
