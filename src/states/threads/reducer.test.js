/**
 * test scenario for threads reducer
 *
 * - threads reducer function
 *  - should return the initial state when given unknown action type
 *  - should return the threads when given RECEIVE_THREADS action type
 *  - should return the threads with new thread when given ADD_THREAD action type
 *  - should return the threads with toggled upvote when given TOGGLE_VOTE_THREAD action type
 *  - should return the threads with toggled downvote when given TOGGLE_DOWNVOTE_THREAD action type
 */

import threadsReducer from './reducer'

describe('threads reducer', () => {
  it('should return the initial state when given unknown action type', () => {
    const initialState = []
    const action = { type: 'UNKNOWN' }
    const newState = threadsReducer(initialState, action)
    expect(newState).toEqual(initialState)
  })

  it('should return the threads when given RECEIVE_THREADS action type', () => {
    const initialState = []
    const action = {
      type: 'RECEIVE_THREADS',
      payload: {
        threads: [
          {
            id: '1',
            title: 'Thread 1',
            body: 'Thread 1 body',
            upVotesBy: [],
            downVotesBy: [],
            comments: []
          }
        ]
      }
    }
    const newState = threadsReducer(initialState, action)
    expect(newState).toEqual(action.payload.threads)
  })

  it('should return the threads with new thread when given ADD_THREAD action type', () => {
    const initialState = [
      {
        id: '1',
        title: 'Thread 1',
        body: 'Thread 1 body',
        upVotesBy: [],
        downVotesBy: [],
        comments: []
      }
    ]
    const action = {
      type: 'ADD_THREAD',
      payload: {
        thread: {
          id: '2',
          title: 'Thread 2',
          body: 'Thread 2 body',
          upVotesBy: [],
          downVotesBy: [],
          comments: []
        }
      }
    }
    const newState = threadsReducer(initialState, action)
    expect(newState).toEqual([action.payload.thread, ...initialState])
  })

  it('should return the threads with toggled upvote when given TOGGLE_VOTE_THREAD action type', () => {
    const initialState = [
      {
        id: '1',
        title: 'Thread 1',
        body: 'Thread 1 body',
        upVotesBy: [],
        downVotesBy: [],
        comments: []
      }
    ]
    const action = {
      type: 'TOGGLE_VOTE_THREAD',
      payload: {
        threadId: '1',
        userId: '1'
      }
    }
    const newState = threadsReducer(initialState, action)
    expect(newState).toEqual([
      {
        ...initialState[0],
        upVotesBy: [action.payload.userId]
      }
    ])
  })

  it('should return the threads with toggled downvote when given TOGGLE_DOWNVOTE_THREAD action type', () => {
    const initialState = [
      {
        id: '1',
        title: 'Thread 1',
        body: 'Thread 1 body',
        upVotesBy: [],
        downVotesBy: [],
        comments: []
      }
    ]
    const action = {
      type: 'TOGGLE_DOWNVOTE_THREAD',
      payload: {
        threadId: '1',
        userId: '1'
      }
    }
    const newState = threadsReducer(initialState, action)
    expect(newState).toEqual([
      {
        ...initialState[0],
        downVotesBy: [action.payload.userId]
      }
    ])
  })
})
