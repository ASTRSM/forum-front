/**
 * test scenario for detail thunk action
 *
 * -asyncGetDetail function
 *  - should dispatch correct action when data is fetched successfully
 *  - should throw error and call alert when data is not fetched successfully
 * - asyncCreateComment function
 *  - should dispatch correct action when given valid comment data
 *  - should throw error and call alert when given invalid comment data
 * - asyncUpvoteComment function
 *  - should dispatch correct action when given valid commentId
 *  - should dispatch correct action when given already voted commentId
 *  - should throw error and call alert when given invalid commentId
 * - asyncDownvoteComment function
 *  - should dispatch correct action when given valid commentId
 *  - should dispatch correct action when given already downvoted commentId
 *  - should throw error and call alert when given invalid commentId
 */

import api from '../../utils/api'
import { asyncCreateComment, asyncDownvoteComment, asyncGetDetail, asyncUpvoteComment, createCommentActionCreator, downvoteCommentActionCreator, getDetailActionCreator, upvoteCommentActionCreator } from './action'

const getStateReturn = {
  authUser: {
    id: 1
  },
  details: {
    id: 1,
    title: 'thread1',
    content: 'body1',
    category: 'category1',
    upVotesBy: [],
    downVotesBy: [],
    comments: [
      {
        id: 1,
        content: 'comment1',
        upVotesBy: [],
        downVotesBy: []
      }
    ]
  }
}

describe('detail thunk action', () => {
  it('should dispatch correct action when asyncGetDetail were given valid threadId', async () => {
    const dispatch = jest.fn()
    const getState = jest.fn()
    const detail = { id: 1, title: 'thread1' }
    api.getDetail = jest.fn().mockResolvedValue(detail)

    await asyncGetDetail(1)(dispatch, getState)

    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenCalledWith(getDetailActionCreator(detail))
  })

  it('should throw error and call alert when asyncGetDetail were given invalid threadId', async () => {
    const dispatch = jest.fn()
    const getState = jest.fn()
    window.alert = jest.fn()
    const error = new Error('error')
    api.getDetail = jest.fn().mockRejectedValue(error)

    await asyncGetDetail()(dispatch, getState)

    expect(dispatch).toHaveBeenCalledTimes(0)
    expect(window.alert).toHaveBeenCalledWith(error.message)
  })

  it('should dispatch correct action when asyncCreateComment were given valid comment data', async () => {
    const dispatch = jest.fn()
    const getState = jest.fn()
    const comment = { id: 1, content: 'comment1' }
    api.createComment = jest.fn().mockResolvedValue(comment)

    await asyncCreateComment(1, 'comment1')(dispatch, getState)

    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenCalledWith(createCommentActionCreator(comment))
  })

  it('should throw error and call alert when asyncCreateComment were given invalid comment data', async () => {
    const dispatch = jest.fn()
    const getState = jest.fn()
    window.alert = jest.fn()
    const error = new Error('error')
    api.createComment = jest.fn().mockRejectedValue(error)

    await asyncCreateComment()(dispatch, getState)

    expect(dispatch).toHaveBeenCalledTimes(0)
    expect(window.alert).toHaveBeenCalledWith(error.message)
  })

  it('should dispatch correct action when asyncUpvoteComment were given valid commentId', async () => {
    const commentId = 1
    const userId = 1
    const dispatch = jest.fn()
    const getState = jest.fn().mockReturnValue(getStateReturn)
    api.upvoteComment = jest.fn().mockResolvedValue()

    await asyncUpvoteComment(commentId)(dispatch, getState)

    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenCalledWith(upvoteCommentActionCreator(commentId, userId))
  })

  it('should dispatch correct action when asyncUpvoteComment were given already voted commentId', async () => {
    const commentId = 1
    const userId = 1
    const dispatch = jest.fn()
    const getState = jest.fn().mockReturnValue({ ...getStateReturn, details: { ...getStateReturn.details, comments: [{ ...getStateReturn.details.comments[0], upVotesBy: [1] }] } })
    api.neutralVoteComment = jest.fn().mockResolvedValue()

    await asyncUpvoteComment(commentId)(dispatch, getState)

    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenCalledWith(upvoteCommentActionCreator(commentId, userId))
  })

  it('should throw error and call alert when asyncUpvoteComment were given invalid commentId', async () => {
    const dispatch = jest.fn()
    const getState = jest.fn().mockReturnValue(getStateReturn)
    window.alert = jest.fn()
    const error = new Error("Cannot read properties of undefined (reading 'upVotesBy')")
    api.upvoteComment = jest.fn().mockRejectedValue(error)

    await asyncUpvoteComment()(dispatch, getState)

    expect(dispatch).toHaveBeenCalledTimes(2)
    expect(window.alert).toHaveBeenCalledWith(error.message)
  })

  it('should dispatch correct action when asyncDownvoteComment were given valid commentId', async () => {
    const commentId = 1
    const userId = 1
    const dispatch = jest.fn()
    const getState = jest.fn().mockReturnValue(getStateReturn)
    api.downvoteComment = jest.fn().mockResolvedValue()

    await asyncDownvoteComment(commentId)(dispatch, getState)

    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenCalledWith(downvoteCommentActionCreator(commentId, userId))
  })

  it('should dispatch correct action when asyncDownvoteComment were given already downvoted commentId', async () => {
    const commentId = 1
    const userId = 1
    const dispatch = jest.fn()
    const getState = jest.fn().mockReturnValue({ ...getStateReturn, details: { ...getStateReturn.details, comments: [{ ...getStateReturn.details.comments[0], downVotesBy: [1] }] } })
    api.neutralVoteComment = jest.fn().mockResolvedValue()

    await asyncDownvoteComment(commentId)(dispatch, getState)

    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenCalledWith(downvoteCommentActionCreator(commentId, userId))
  })

  it('should throw error and call alert when asyncDownvoteComment were given invalid commentId', async () => {
    const dispatch = jest.fn()
    const getState = jest.fn().mockReturnValue(getStateReturn)
    window.alert = jest.fn()
    const error = new Error("Cannot read properties of undefined (reading 'downVotesBy')")
    api.downvoteComment = jest.fn().mockRejectedValue(error)

    await asyncDownvoteComment()(dispatch, getState)

    expect(dispatch).toHaveBeenCalledTimes(2)
    expect(window.alert).toHaveBeenCalledWith(error.message)
  })
})
