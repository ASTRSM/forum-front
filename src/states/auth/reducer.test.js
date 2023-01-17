/**
 * test scenario for auth reducer
 *
 * - auth reducer function
 *  - should return the initial state when given unknown action type
 *  - should return the auth user when given SET_AUTH_USER action type
 *  - should return null when given UNSET_AUTH_USER action type
 */

import authUserReducer from './reducer'

describe('auth reducer', () => {
  it('should return the initial state when given unknown action type', () => {
    const initialState = null
    const action = { type: 'UNKNOWN' }
    const newState = authUserReducer(initialState, action)
    expect(newState).toEqual(initialState)
  })

  it('should return the auth user when given SET_AUTH_USER action type', () => {
    const initialState = null
    const action = {
      type: 'SET_AUTH_USER',
      payload: {
        authUser: 'user1'
      }
    }
    const newState = authUserReducer(initialState, action)
    expect(newState).toEqual(action.payload.authUser)
  })

  it('should return null when given UNSET_AUTH_USER action type', () => {
    const initialState = 'user1'
    const action = {
      type: 'UNSET_AUTH_USER'
    }

    const newState = authUserReducer(initialState, action)
    expect(newState).toEqual(null)
  })
})
