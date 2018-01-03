import React from 'react'
import ReactDOM from 'react-dom'
import personService from './services/persons'
import './index.css'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [],
            newName: '',
            newNumber: '',
            filter: '',
            notification: null
        }
    }

    componentWillMount() {
        personService
            .getAll()
            .then(persons => {
                this.setState({ persons })
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

    deletePerson = (person) => () => {
        if (window.confirm(`poistetaanko ${person.name}?`)) {
            personService.deletePerson(person.id)
            this.setState({
                persons: this.state.persons.filter(
                    p => p.id !== person.id
                ),
                newName: '',
                newNumber: '',
                filter: '',
                notification: `${person.name} poistettiin luettelosta`
            })
            setTimeout(() => {
                this.setState({ notification: null })
            }, 5000)
        }
    }

    createPerson = (personObject) => {
        personService
            .create(personObject)
            .then(newPerson => {
                this.setState({
                    persons: this.state.persons.concat(newPerson),
                    newName: '',
                    newNumber: '',
                    filter: '',
                    notification: `${newPerson.name} lisättiin luetteloon`
                })
                setTimeout(() => {
                    this.setState({ notification: null })
                }, 5000)
            })
    }

    updatePerson = (id, personObject) => {
        personService
            .update(id, personObject)
            .then(changedObject => {
                const persons = this.state.persons.filter(person =>
                    person.id !== id)
                this.setState({
                    persons: persons.concat(changedObject),
                    newName: '',
                    newNumber: '',
                    filter: '',
                    notification: `henkilön ${changedObject.name} numero päivitettiin`
                })
                setTimeout(() => {
                    this.setState({ notification: null })
                }, 5000)
            })
            .catch(error => {
                personService
                    .getAll()
                    .then(persons => {
                        this.setState({ persons })
                    })
                this.createPerson(personObject)
            })
    }

    addPerson = (e) => {
        e.preventDefault()
        const personObject = {
            name: this.state.newName,
            number: this.state.newNumber
        }
        const person = this.state.persons.find(person =>
            person.name === this.state.newName)
        if (person === undefined) {
            this.createPerson(personObject)
        } else {
            this.updatePerson(person.id, personObject)
        }
    }

    render() {
        const byId = (person1, person2) => person1.id - person2.id

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

                <h3>Lisää uusi / muuta olemassa olevaa numeroa</h3>
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

                <Notification message={this.state.notification} />

                <Numbers persons={personsToShow.sort(byId)} deleteHandler={this.deletePerson} />
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

const Numbers = ({ persons, deleteHandler }) => {
    return (
        <table>
            <tbody>
                {persons.map(person =>
                    <Number key={person.id}
                        person={person}
                        deleteHandler={deleteHandler}
                    />)}
            </tbody>
        </table>
    )
}

const Number = ({ person, deleteHandler }) => {
    return (
        <tr>
            <td>{person.name}</td>
            <td>{person.number}</td>
            <td>
                <button onClick={deleteHandler(person)}>poista</button>
            </td>
        </tr>
    )
}

const Notification = ({ message }) => {
    if (message === null) {
        return null
    }
    return (
        <div className="error">
            {message}
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)
