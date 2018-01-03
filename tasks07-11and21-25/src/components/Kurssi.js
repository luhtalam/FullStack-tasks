import React from 'react'

const Kurssi = ({ kurssi }) => {
    return (
        <div>
            <Otsikko nimi={kurssi.nimi} />
            <Sisalto osat={kurssi.osat} />
            <Yhteensa osat={kurssi.osat} />
        </div>
    )
}

const Otsikko = ({ nimi }) => {
    return (
        <div>
            <h2>{nimi} </h2>
        </div>
    )
}

const Sisalto = ({ osat }) => {
    return (
        <div>
            <h3>sisältö</h3>
            <ul>
                {osat.map((osa, i) => <Osa key={osa.id} osa={osa} />)}
            </ul>
        </div>
    )
}

const Osa = ({ osa }) => {
    return (
        <li>
            {osa.nimi}, tehtäviä {osa.tehtavia} kappaletta
        </li>
    )
}

const Yhteensa = ({osat}) => {
    return (
        <div>
            <p>
                Yhteensä {osat.reduce((sum, osa) => sum + osa.tehtavia, 0)} tehtävää
            </p>
        </div>
    )
}

export default Kurssi