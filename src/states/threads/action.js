import api from '../../utils/api'
import { downvoteDetailActionCreator, upvoteDetailActionCreator } from '../detail/action'

const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  ADD_THREAD: 'ADD_THREAD',
  TOGGLE_VOTE_THREAD: 'TOGGLE_VOTE_THREAD',
  TOGGLE_DOWNVOTE_THREAD: 'TOGGLE_DOWNVOTE_THREAD'
}

function receiveThreadsActionCreator (threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads
    }
  }
}

function addThreadActionCreator (thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: {
      thread
    }
  }
}

function toggleVoteThreadActionCreator ({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_VOTE_THREAD,
    payload: {
      threadId,
      userId
    }
  }
}

function toggleDownvoteThreadActionCreator ({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_DOWNVOTE_THREAD,
    payload: {
      threadId,
      userId
    }
  }
}

function asyncAddThread ({ title, body, category }) {
  return async (dispatch) => {
    try {
      const thread = await api.createThread({ title, body, category })
      dispatch(addThreadActionCreator(thread))
    } catch (error) {
      alert(error.message)
    }
  }
}

function asynctoggleVoteThread (threadId) {
  return async (dispatch, getState) => {
    const { authUser, threads } = getState()
    const thread = threads.find((thread) => thread.id === threadId)

    dispatch(toggleVoteThreadActionCreator({ threadId, userId: authUser.id }))
    dispatch(upvoteDetailActionCreator({ threadId, userId: authUser.id }))

    try {
      if (thread.upVotesBy.includes(authUser.id)) {
        await api.neutralVoteThread(threadId)
      } else {
        await api.voteThread(threadId)
      }
    } catch (error) {
      alert(error.message)
      dispatch(toggleVoteThreadActionCreator({ threadId, userId: authUser.id }))
      dispatch(upvoteDetailActionCreator({ threadId, userId: authUser.id }))
    }
  }
}

function asynctoggleDownvoteThread (threadId) {
  return async (dispatch, getState) => {
    const { authUser, threads } = getState()
    const thread = threads.find((thread) => thread.id === threadId)

    dispatch(toggleDownvoteThreadActionCreator({ threadId, userId: authUser.id }))
    dispatch(downvoteDetailActionCreator({ threadId, userId: authUser.id }))

    try {
      if (thread.downVotesBy.includes(authUser.id)) {
        await api.neutralVoteThread(threadId)
      } else {
        await api.downvoteThread(threadId)
      }
    } catch (error) {
      alert(error.message)
      dispatch(toggleDownvoteThreadActionCreator({ threadId, userId: authUser.id }))
      dispatch(downvoteDetailActionCreator({ threadId, userId: authUser.id }))
    }
  }
}

export {
  ActionType,
  receiveThreadsActionCreator,
  addThreadActionCreator,
  toggleVoteThreadActionCreator,
  asyncAddThread,
  asynctoggleVoteThread,
  asynctoggleDownvoteThread
}
