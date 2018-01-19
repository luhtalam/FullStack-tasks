import React from 'react'


class App extends React.Component {
  render() {
    return (
      <div>
        <div>
          <h1>Unicafe</h1>
        </div>
        <div>
          <h2>Give feedback</h2>
          <button onClick={(e) => this.props.store.dispatch({ type: 'GOOD' })}>
            GOOD
          </button>
          <button onClick={(e) => this.props.store.dispatch({ type: 'OK' })}>
            OK
          </button>
          <button onClick={(e) => this.props.store.dispatch({ type: 'BAD' })}>
            BAD
          </button>
        </div>
        <div>
          <h2>Statistic</h2>
        </div>
        <div>
          <Statistics state={this.props.store.getState()} />
        </div>
        <div>
          <button onClick={(e) => this.props.store.dispatch({ type: 'ZERO' })}>
            ZERO
          </button>
        </div>
      </div>
    )
  }
}

const mean = (props) => {
  const sum = props.good + props.ok + props.bad
  if (sum === 0) return 0
  return (props.good - props.bad) / sum
}

const positive = (props) => {
  const sum = props.good + props.ok + props.bad
  if (sum === 0) return 0
  return (100 * props.good / sum)
}

const Statistics = ({ state }) => {
  if (state.good === 0 && state.ok === 0 && state.bad === 0) {
    return (
      <div>
        <p>no feedback yet!</p>
      </div>
    )
  }
  return (
    <table>
      <tbody>
        <Statistic name="GOOD" value={state.good} />
        <Statistic name="OK" value={state.ok} />
        <Statistic name="BAD" value={state.bad} />
        <Statistic name="MEAN" value={mean(state).toFixed(2)} />
        <Statistic name="POSITIVE" value={positive(state).toFixed(2) + " %"} />
      </tbody>
    </table>
  )
}

const Statistic = ({ name, value }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{value}</td>
    </tr>
  )
}

export default App