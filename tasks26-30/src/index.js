import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [],
            newName: '',
            newNumber: '',
            filter: ''
        }
    }

    componentWillMount() {
        axios.get('http://localhost:3001/persons')
            .then(response => {
                this.setState({ persons: response.data })
            })
    }



    handleNameChange = (e) => {
        this.setState({ newName: e.target.value })
    }

    handleNumberChange = (e) => {
        this.setState({ newNumber: e.target.value })
    }

    handleFilterChange = (e) => {
        this.setState({ filter: e.target.value })

    }

    addPerson = (e) => {
        e.preventDefault()

        const onList = this.state.persons.reduce((bool, person) =>
            person.name === this.state.newName ? true : bool, false)

        const newPersons =
            !onList ?
                this.state.persons.concat(
                    { name: this.state.newName, number: this.state.newNumber }) :
                this.state.persons

        this.setState({
            persons: newPersons,
            newName: '',
            newNumber: '',
            filter: ''
        })
    }

    render() {
        const personsToShow =
            this.state.filter === '' ?
                this.state.persons :
                this.state.persons.filter(person => person.name.includes(this.state.filter))

        return (
            <div>
                <h1>Puhelinluettelo</h1>
                <InputField text='rajaa näytettäviä'
                    valueState={this.state.filter}
                    handler={this.handleFilterChange} />

                <h3>Lisää uusi</h3>
                <form onSubmit={this.addPerson}>
                    <InputField text='nimi'
                        valueState={this.state.newName}
                        handler={this.handleNameChange} />
                    <InputField text='numero'
                        valueState={this.state.newNumber}
                        handler={this.handleNumberChange} />
                    <div>
                        <button type="submit">lisää</button>
                    </div>
                </form>

                <h3>Numerot</h3>
                <Numbers persons={personsToShow} />
            </div>
        )
    }
}

const InputField = ({ text, valueState, handler }) => {
    return (
        <div>
            {text}: <input
                value={valueState}
                onChange={handler}
            />
        </div>
    )
}

const Numbers = ({ persons }) => {
    return (
        <table>
            <tbody>
                {persons.map(person =>
                    <Number key={person.name} person={person} />)}
            </tbody>
        </table>
    )
}

const Number = ({ person }) => {
    return (
        <tr>
            <td>{person.name}</td>
            <td>{person.number}</td>
        </tr>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)
