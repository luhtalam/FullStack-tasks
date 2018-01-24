import React from 'react'
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom'
import { ListGroup, ListGroupItem, FormGroup, FormControl, ControlLabel, Button, Grid, Col, Row } from 'react-bootstrap'

const Menu = () => {
  const navStyle = {
    backgroundColor: 'lightBlue',
    padding: 10,
    borderRadius: 10
  }
  const activeStyle = {
    fontWeight: 'bold',
    color: 'red'
  }
  return (
    <div style={navStyle}>
      <NavLink exact to='/' activeStyle={activeStyle}>anecdotes</NavLink> &nbsp;
      <NavLink exact to='/create' activeStyle={activeStyle}>create new</NavLink> &nbsp;
      <NavLink exact to='/about' activeStyle={activeStyle}>about</NavLink> &nbsp;
    </div>
  )
}

const Notification = ({ notification }) => {
  const style = {
    color: 'green',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    marginTop: 10
  }
  if (notification === null) {
    return null
  }
  return (
    <div style={style} className="notification">
      {notification}
    </div>
  )
}

const AnecdoteList = ({ anecdotes, addVote }) => (
  <div>
    <h2>Anecdotes</h2>
    <ListGroup>
      {anecdotes.map(anecdote =>
        <ListGroupItem key={anecdote.id} >
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>&nbsp;
          <Button onClick={addVote(anecdote)}>vote</Button>
        </ListGroupItem>)}
    </ListGroup>
  </div>
)

const Anecdote = ({ anecdote }) => (
  <div>
    <h2>{anecdote.content} by {anecdote.author}</h2>
    <p>has {anecdote.votes} votes</p>
    <p>for more info see {anecdote.url}</p>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <Grid>
      <Row>
        <Col xs={3} md={6}>
          <p>According to Wikipedia:</p>

          <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

          <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
        </Col>
        <Col xs={3} md={3}>
          <img src={require('./dijkstra.jpg')} alt='Dijkstra' height="200" width="150" />
        </Col>
      </Row>
    </Grid>

  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code.
  </div>
)

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.props.history.push('/')
  }

  render() {
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={this.handleSubmit}>
          <FormGroup>
            <ControlLabel>content:</ControlLabel>
            <FormControl
              type='text'
              name='content'
              value={this.state.content}
              onChange={this.handleChange}
            />
            <ControlLabel>author</ControlLabel>
            <FormControl
              type='text'
              name='author'
              value={this.state.author}
              onChange={this.handleChange}
            />
            <ControlLabel>ulr for more info</ControlLabel>
            <FormControl
              type='text'
              name='info'
              value={this.state.info}
              onChange={this.handleChange}
            />
            <Button bsStyle="success" type="submit">create</Button>
          </FormGroup>
        </form>
      </div>
    )

  }
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: null
    }
  }

  addVote = (anecdote) => () => {
    const votedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    this.setState({
      anecdotes: this.state.anecdotes.map(a =>
        a.id === votedAnecdote.id ? votedAnecdote : a)
    })
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ anecdotes: this.state.anecdotes.concat(anecdote) })
    this.addNotification(`a new anecdote ${anecdote.content} added!`, 10)
  }

  addNotification = (notification, timeout) => {
    this.setState({ notification })
    setTimeout(() => {
      this.setState({ notification: null })
    }, timeout * 1000)
  }

  anecdoteById = (id) => this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  render() {
    return (
      <div className='container'>
        <Router>
          <div>
            <h1>Software anecdotes</h1>
            <Menu />
            <Notification notification={this.state.notification} />
            <Route exact path='/' render={() => <AnecdoteList anecdotes={this.state.anecdotes} addVote={this.addVote} />} />
            <Route exact path='/create' render={({ history }) => <CreateNew addNew={this.addNew} history={history} />} />
            <Route exact path='/about' render={() => <About />} />
            <Route path="/anecdotes/:id" render={({ match }) => <Anecdote anecdote={this.anecdoteById(match.params.id)} />} />
          </div>
        </Router>
        <div>
          <Footer />
        </div>
      </div>
    )
  }
}

export default App;
