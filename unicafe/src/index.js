import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createStore } from 'redux'
import counterReducer from './reducer'

const store = createStore(counterReducer)

const render = () => {
  ReactDOM.render(<App store={store} />, document.getElementById('root'))
}

render()
store.subscribe(render)