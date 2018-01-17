import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  it('should return a proper initial state when called with undefined state', () => {
    const state = []
    const action = {
      type: 'DO_NOTHING'
    }
    deepFreeze(state)
    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  it('return new state with action GOOD', () => {
    const action = { type: 'GOOD' }

    deepFreeze(initialState)
    const newState = counterReducer(initialState, action)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })
  it('return new state with action OK', () => {
    const action = { type: 'OK' }

    deepFreeze(initialState)
    const newState = counterReducer(initialState, action)
    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0
    })
  })
  it('return new state with action BAD', () => {
    const action = { type: 'BAD' }

    deepFreeze(initialState)
    const newState = counterReducer(initialState, action)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1
    })
  })
  it('return new state with action ZERO', () => {
    const action = { type: 'ZERO' }

    const state = {
      good: 2,
      ok: 1,
      bad: 5
    }

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 0
    })
  })
})