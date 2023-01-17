/**
 * test scenario for detail reducer
 *
 * - detail reducer function
 *  - should return the initial state when given unknown action type
 *  - should return the detail when given GET_DETAIL action type
 *  - should return the detail with new comment when given CREATE_COMMENT action type
 *  - should return the detail with toggled upvote when given UPVOTE_DETAIL action type
 *  - should return the detail with toggled downvote when given DOWNVOTE_DETAIL action type
 *  - should return the detail with toggled upvote when given UPVOTE_COMMENT action type
 *  - should return the detail with toggled downvote when given DOWNVOTE_COMMENT action type
 */

import detailReducer from './reducer'

describe('detail reducer', () => {
  it('should return the initial state when given unknown action type', () => {
    const initialState = {}
    const action = { type: 'UNKNOWN' }
    const newState = detailReducer(initialState, action)
    expect(newState).toEqual(initialState)
  })

  it('should return the detail when given GET_DETAIL action type', () => {
    const initialState = {}
    const action = {
      type: 'GET_DETAIL',
      payload: {
        detail: {
          id: '1',
          title: 'Thread 1',
          body: 'Thread 1 body',
          upVotesBy: [],
          downVotesBy: [],
          comments: []
        }
      }
    }
    const newState = detailReducer(initialState, action)
    expect(newState).toEqual(action.payload)
  })

  it('should return the detail with new comment when given CREATE_COMMENT action type', () => {
    const initialState = {
      id: '1',
      title: 'Thread 1',
      body: 'Thread 1 body',
      upVotesBy: [],
      downVotesBy: [],
      comments: []
    }
    const action = {
      type: 'CREATE_COMMENT',
      payload: {
        comment: {
          id: '2',
          body: 'Comment 2 body',
          upVotesBy: [],
          downVotesBy: []
        }
      }
    }
    const newState = detailReducer(initialState, action)
    expect(newState.comments).toEqual([action.payload])
  })

  it('should return the detail with toggled upvote when given UPVOTE_DETAIL action type', () => {
    const initialState = {
      id: '1',
      title: 'Thread 1',
      body: 'Thread 1 body',
      upVotesBy: [],
      downVotesBy: [],
      comments: []
    }
    const action = {
      type: 'UPVOTE_DETAIL',
      payload: {
        detailId: '1',
        userId: '1'
      }
    }

    const newState = detailReducer(initialState, action)
    expect(newState.upVotesBy).toEqual([action.payload.userId])
  })

  it('should return the detail with toggled downvote when given DOWNVOTE_DETAIL action type', () => {
    const initialState = {
      id: '1',
      title: 'Thread 1',
      body: 'Thread 1 body',
      upVotesBy: [],
      downVotesBy: [],
      comments: []
    }
    const action = {
      type: 'DOWNVOTE_DETAIL',
      payload: {
        detailId: '1',
        userId: '1'
      }
    }

    const newState = detailReducer(initialState, action)
    expect(newState.downVotesBy).toEqual([action.payload.userId])
  })

  it('should return the detail with toggled upvote when given UPVOTE_COMMENT action type', () => {
    const initialState = {
      id: '1',
      title: 'Thread 1',
      body: 'Thread 1 body',
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: '2',
          body: 'Comment 2 body',
          upVotesBy: [],
          downVotesBy: []
        }
      ]
    }
    const action = {
      type: 'UPVOTE_COMMENT',
      payload: {
        commentId: '2',
        userId: '1'
      }
    }

    const newState = detailReducer(initialState, action)
    expect(newState.comments[0].upVotesBy).toEqual([action.payload.userId])
  })

  it('should return the detail with toggled downvote when given DOWNVOTE_COMMENT action type', () => {
    const initialState = {
      id: '1',
      title: 'Thread 1',
      body: 'Thread 1 body',
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: '2',
          body: 'Comment 2 body',
          upVotesBy: [],
          downVotesBy: []
        }
      ]
    }
    const action = {
      type: 'DOWNVOTE_COMMENT',
      payload: {
        commentId: '2',
        userId: '1'
      }
    }

    const newState = detailReducer(initialState, action)
    expect(newState.comments[0].downVotesBy).toEqual([action.payload.userId])
  })
})
