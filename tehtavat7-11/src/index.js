import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (probs) => {
    return (
        <div>
            <h1>{probs.nimi} </h1>
        </div>
    )
}

const Sisalto = (probs) => {
    return (
        <div>
            <Osa osa={probs.osat[0]} />
            <Osa osa={probs.osat[1]} />
            <Osa osa={probs.osat[2]} />
        </div>
    )
}

const Osa = (probs) => {
    return (
        <div>
            <p>{probs.osa.nimi}, tehtäviä {probs.osa.tehtavia} kappaletta </p>
        </div>
    )
}

const Yhteensa = (probs) => {
    return (
        <div>
            <p>Yhteensä {probs.osat[0].tehtavia + probs.osat[1].tehtavia + probs.osat[2].tehtavia} tehtävää</p>
        </div>
    )
}

const App = () => {
    const kurssi = {
      nimi: 'Half Stack -sovelluskehitys',
      osat: [
        {
          nimi: 'Reactin perusteet',
          tehtavia: 10,
        },
        {
          nimi: 'Tiedonvälitys propseilla',
          tehtavia: 7
        },
        {
          nimi: 'Komponenttien tila',
          tehtavia: 14
        }
      ]
    }
  
    return (
        <div>
          <Otsikko nimi={kurssi.nimi} />
          <Sisalto osat={kurssi.osat} />
          <Yhteensa osat={kurssi.osat} />
        </div>
      )
  }

ReactDOM.render(
    <App />,
    document.getElementById('root')
)
