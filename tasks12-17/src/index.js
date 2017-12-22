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



  setValue = (name, value) => () => {
    if (name == "hyvä") {
      this.setState({ hyva: value })
    } else if (name == "neutraali") {
      this.setState({ neutraali: value })
    } else if (name == "huono") {
      this.setState({ huono: value })
    }
  }

  render() {
    return (
      <div>
        <div>
          <h1>Anna palautetta</h1>
        </div>
        <div>
          <Button handleClick={this.setValue("hyvä", this.state.hyva + 1)} text='Hyva' />
          <Button handleClick={this.setValue("neutraali", this.state.neutraali + 1)} text='Neutraali' />
          <Button handleClick={this.setValue("huono", this.state.huono + 1)} text='Huono' />
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
  if (sum == 0) return 0
  return (props.hyva - props.huono) / sum
}

const positive = (props) => {
  const sum = props.hyva + props.neutraali + props.huono
  if (sum == 0) return 0
  return (100 * props.hyva / sum)
}

const Statistics = (props) => {
  if (props.hyva == 0 && props.neutraali == 0 && props.huono == 0) {
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
      <td> {value}</td>
    </tr>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
