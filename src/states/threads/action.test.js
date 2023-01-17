/**
 * test scenario for threads thunk action
 *
 * - asyncAddThread function
 *  - should dispatch correct action when given valid thread data
 *  - should throw error and call alert when given invalid thread data
 * - asynctoggleVoteThread function
 *  - should dispatch correct action when given valid threadId
 *  - should dispatch correct action when given already voted threadId
 *  - should throw error and call alert when given invalid threadId
 * - asyncToggleDownvoteThread function
 *  - should dispatch correct action when given valid threadId
 *  - should dispatch correct action when given already downvoted threadId
 *  - should throw error and call alert when given invalid threadId
 */

import api from '../../utils/api'
import { downvoteDetailActionCreator, upvoteDetailActionCreator } from '../detail/action'
import { addThreadActionCreator, asyncAddThread, asynctoggleDownvoteThread, asynctoggleVoteThread, toggleDownvoteThreadActionCreator, toggleVoteThreadActionCreator } from './action'

const getStateReturn = {
  authUser: {
    id: 1
  },
  threads: [
    {
      id: 1,
      title: 'thread1',
      body: 'body1',
      category: 'category1',
      upVotesBy: [],
      downVotesBy: []
    }
  ]
}

describe('threads thunk action', () => {
  it('should dispatch correct action when asyncAddThread were given valid thread data', async () => {
    const dispatch = jest.fn()
    const getState = jest.fn()
    const thread = { id: 1, title: 'thread1' }
    api.createThread = jest.fn().mockResolvedValue(thread)

    await asyncAddThread({ title: 'thread1', body: 'body1', category: 'category1' })(dispatch, getState)

    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenCalledWith(addThreadActionCreator(thread))
  })

  it('should throw error and call alert when asyncAddThread were given invalid thread data', async () => {
    const dispatch = jest.fn()
    const getState = jest.fn()
    window.alert = jest.fn()
    const error = new Error('error')
    api.createThread = jest.fn().mockRejectedValue(error)

    await asyncAddThread({})(dispatch, getState)

    expect(dispatch).toHaveBeenCalledTimes(0)
    expect(window.alert).toHaveBeenCalledWith(error.message)
  })

  it('should dispatch correct action when asynctoggleVoteThread were given valid threadId', async () => {
    const dispatch = jest.fn()
    const getState = jest.fn().mockReturnValue({ ...getStateReturn })
    const threadId = 1
    const userId = 1
    window.alert = jest.fn()
    api.voteThread = jest.fn().mockResolvedValue(threadId)

    await asynctoggleVoteThread(threadId)(dispatch, getState)

    expect(dispatch).toHaveBeenCalledTimes(2)
    expect(dispatch).toHaveBeenNthCalledWith(1, toggleVoteThreadActionCreator({ threadId, userId }))
    expect(dispatch).toHaveBeenNthCalledWith(2, upvoteDetailActionCreator({ threadId, userId }))
  })

  it('should dispatch correct action when asynctoggleVoteThread were given already voted threadId', async () => {
    const dispatch = jest.fn()
    const getState = jest.fn().mockReturnValue({ ...getStateReturn, threads: [{ ...getStateReturn.threads[0], upVotesBy: [1] }] })
    const threadId = 1
    const userId = 1
    window.alert = jest.fn()
    api.neutralVoteThread = jest.fn().mockResolvedValue(threadId)

    await asynctoggleVoteThread(threadId)(dispatch, getState)

    expect(dispatch).toHaveBeenCalledTimes(2)
    expect(dispatch).toHaveBeenNthCalledWith(1, toggleVoteThreadActionCreator({ threadId, userId }))
    expect(dispatch).toHaveBeenNthCalledWith(2, upvoteDetailActionCreator({ threadId, userId }))
  })

  it('should throw error and call alert when asynctoggleVoteThread were given invalid threadId', async () => {
    const dispatch = jest.fn()
    const getState = jest.fn().mockReturnValue({ ...getStateReturn })
    const threadId = ''
    const error = new Error("Cannot read properties of undefined (reading 'upVotesBy')")
    window.alert = jest.fn()
    api.voteThread = jest.fn().mockRejectedValue(error)

    await asynctoggleVoteThread(threadId)(dispatch, getState)

    expect(window.alert).toHaveBeenCalledWith(error.message)
  })

  it('should dispatch correct action when asynctoggleDownvoteThread were given valid threadId', async () => {
    const dispatch = jest.fn()
    const getState = jest.fn().mockReturnValue({ ...getStateReturn })
    const threadId = 1
    const userId = 1
    api.downvoteThread = jest.fn().mockResolvedValue(threadId)

    await asynctoggleDownvoteThread(threadId)(dispatch, getState)

    expect(dispatch).toHaveBeenCalledTimes(2)
    expect(dispatch).toHaveBeenNthCalledWith(1, toggleDownvoteThreadActionCreator({ threadId, userId }))
    expect(dispatch).toHaveBeenNthCalledWith(2, downvoteDetailActionCreator({ threadId, userId }))
  })

  it('should dispatch correct action when asynctoggleDownvoteThread were given already downvoted threadId', async () => {
    const dispatch = jest.fn()
    const getState = jest.fn().mockReturnValue({ ...getStateReturn, threads: [{ ...getStateReturn.threads[0], downVotesBy: [1] }] })
    const threadId = 1
    const userId = 1
    api.neutralVoteThread = jest.fn().mockResolvedValue(threadId)

    await asynctoggleDownvoteThread(threadId)(dispatch, getState)

    expect(dispatch).toHaveBeenCalledTimes(2)
    expect(dispatch).toHaveBeenNthCalledWith(1, toggleDownvoteThreadActionCreator({ threadId, userId }))
    expect(dispatch).toHaveBeenNthCalledWith(2, downvoteDetailActionCreator({ threadId, userId }
    ))
  })

  it('should throw error and call alert when asynctoggleDownvoteThread were given invalid threadId', async () => {
    const dispatch = jest.fn()
    const getState = jest.fn().mockReturnValue({ ...getStateReturn })
    const threadId = ''
    const error = new Error("Cannot read properties of undefined (reading 'downVotesBy')")
    window.alert = jest.fn()
    api.downvoteThread = jest.fn().mockRejectedValue(error)

    await asynctoggleDownvoteThread(threadId)(dispatch, getState)

    expect(window.alert).toHaveBeenCalledWith(error.message)
  })
})
