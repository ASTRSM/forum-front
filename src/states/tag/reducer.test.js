/**
 * test scenario for tag reducer
 *
 * - tag reducer function
 *  - should return the initial state when given unknown action type
 *  - should return the active tag when given SET_ACTIVE_TAG action type
 *  - should return null when given SET_ACTIVE_TAG action type with same active tag
 *  - should return null when given UNSET_ACTIVE_TAG action type
 *
 */

import tagReducer from './reducer'

describe('tag reducer', () => {
  it('should return the initial state when given unknown action type', () => {
    const initialState = null
    const action = { type: 'UNKNOWN' }
    const newState = tagReducer(initialState, action)
    expect(newState).toEqual(initialState)
  })

  it('should return the active tag when given SET_ACTIVE_TAG action type', () => {
    const initialState = null
    const action = {
      type: 'SET_ACTIVE_TAG',
      payload: {
        activeTag: 'tag1'
      }
    }
    const newState = tagReducer(initialState, action)
    expect(newState).toEqual(action.payload.activeTag)
  })

  it('should return null when given SET_ACTIVE_TAG action type with same active tag', () => {
    const initialState = 'tag1'
    const action = {
      type: 'SET_ACTIVE_TAG',
      payload: {
        activeTag: 'tag1'
      }
    }
    const newState = tagReducer(initialState, action)
    expect(newState).toEqual(null)
  })

  it('should return null when given UNSET_ACTIVE_TAG action type', () => {
    const initialState = 'tag1'
    const action = {
      type: 'UNSET_ACTIVE_TAG'
    }
    const newState = tagReducer(initialState, action)
    expect(newState).toEqual(null)
  })
})
