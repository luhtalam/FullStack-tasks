import React from 'react';
import ReactDOM from 'react-dom';



class App extends React.Component {
  constructor() {
    super()
    this.state = {
      hyva: 0,
      neutraali: 0,
      huono: 0
    }
  }



  increaseByOne = (name) => () => {
    const newValue = this.state[name]+1
    return (this.setState({[name]: newValue}))
  }

  render() {
    return (
      <div>
        <div>
          <h1>Anna palautetta</h1>
        </div>
        <div>
          <Button handleClick={this.increaseByOne("hyva")} text='Hyvä' />
          <Button handleClick={this.increaseByOne("neutraali")} text='Neutraali' />
          <Button handleClick={this.increaseByOne("huono")} text='Huono' />
        </div>
        <div>
          <h1>Statistiikka</h1>
        </div>
        <div>
          <Statistics hyva={this.state.hyva} neutraali={this.state.neutraali} huono={this.state.huono} />
        </div>
      </div>
    )
  }
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const mean = (props) => {
  const sum = props.hyva + props.neutraali + props.huono
  if (sum === 0) return 0
  return (props.hyva - props.huono) / sum
}

const positive = (props) => {
  const sum = props.hyva + props.neutraali + props.huono
  if (sum === 0) return 0
  return (100 * props.hyva / sum)
}

const Statistics = (props) => {
  if (props.hyva === 0 && props.neutraali === 0 && props.huono === 0) {
    return (
      <div>
        <p>yhtään palautetta ei ole annettu </p>
      </div>
    )
  }
  return (
    <table>
      <tbody>
        <Statistic name="hyvä" value={props.hyva} />
        <Statistic name="neutraali" value={props.neutraali} />
        <Statistic name="huono" value={props.huono} />
        <Statistic name="keskiarvo" value={mean(props).toFixed(2)} />
        <Statistic name="positiivisia" value={positive(props).toFixed(2)+ " %"} />
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

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
