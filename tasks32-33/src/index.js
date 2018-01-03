import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            countries: [],
            filter: ''
        }
    }

    componentWillMount() {
        axios.get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                this.setState({ countries: response.data })
            })
    }

    handleClick = (name) => () => {
        this.setState({ filter: name })
    }

    handleFilterChange = (e) => {
        this.setState({ filter: e.target.value })
    }

    render() {
        const countriesToShow =
            this.state.filter === '' ?
                [] :
                this.state.countries.filter(country => country.name.includes(this.state.filter))

        return (
            <div>
                <div>
                    find countries: <input
                        value={this.state.filter}
                        onChange={this.handleFilterChange}
                    />
                </div>
                <Countries countries={countriesToShow} clickHandler={this.handleClick} />
            </div>
        )

    }
}

const Countries = ({ countries, clickHandler }) => {
    if (countries.length > 10) {
        return (
            <p>too many matches, specify another filter</p>
        )
    } else if (countries.length === 1) {
        const country = countries[0]
        return (<Country country={country} />)
    } else {
        return (
            <ul>
                {countries.map(country =>
                    <li key={country.name} onClick={clickHandler(country.name)}>{country.name}</li>
                )}
            </ul>
        )
    }
}

const Country = ({ country }) => {
    return (
        <div>
            <h2>{country.name} {country.nativeName}</h2>
            <p>capital: {country.capital}</p>
            <p>Population: {country.population}</p>
            <img src={country.flag} width={250} height={150} alt='flag' />
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)
