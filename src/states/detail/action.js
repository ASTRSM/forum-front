import api from '../../utils/api'

const ActionType = {
  GET_DETAIL: 'GET_DETAIL',
  UPVOTE_DETAIL: 'UPVOTE_DETAIL',
  DOWNVOTE_DETAIL: 'DOWNVOTE_DETAIL',
  CREATE_COMMENT: 'CREATE_COMMENT',
  UPVOTE_COMMENT: 'UPVOTE_COMMENT',
  DOWNVOTE_COMMENT: 'DOWNVOTE_COMMENT'
}

function getDetailActionCreator (detail) {
  return {
    type: ActionType.GET_DETAIL,
    payload: detail
  }
}

function upvoteDetailActionCreator ({ detailId, userId }) {
  return {
    type: ActionType.UPVOTE_DETAIL,
    payload: {
      detailId,
      userId
    }
  }
}

function downvoteDetailActionCreator ({ detailId, userId }) {
  return {
    type: ActionType.DOWNVOTE_DETAIL,
    payload: {
      detailId,
      userId
    }
  }
}

function createCommentActionCreator (comment) {
  return {
    type: ActionType.CREATE_COMMENT,
    payload: comment
  }
}

function upvoteCommentActionCreator (commentId, userId) {
  return {
    type: ActionType.UPVOTE_COMMENT,
    payload: { commentId, userId }
  }
}

function downvoteCommentActionCreator (commentId, userId) {
  return {
    type: ActionType.DOWNVOTE_COMMENT,
    payload: { commentId, userId }
  }
}

function asyncGetDetail (threadId) {
  return async (dispatch) => {
    try {
      const detail = await api.getDetail(threadId)

      dispatch(getDetailActionCreator(detail))
    } catch (error) {
      alert(error.message)
    }
  }
}

function asyncCreateComment (threadId, content) {
  return async (dispatch) => {
    try {
      const comment = await api.createComment(threadId, content)

      dispatch(createCommentActionCreator(comment))
    } catch (error) {
      alert(error.message)
    }
  }
}

function asyncUpvoteComment (commentId) {
  return async (dispatch, getState) => {
    const { details, authUser } = getState()
    const comment = details.comments.find(comment => comment.id === commentId)
    dispatch(upvoteCommentActionCreator(commentId, authUser.id))

    try {
      if (comment.upVotesBy.includes(authUser.id)) {
        await api.neutralVoteComment(commentId, details.id)
      } else {
        await api.upvoteComment(commentId, details.id)
      }
    } catch (error) {
      alert(error.message)
      dispatch(upvoteCommentActionCreator(commentId, authUser.id))
    }
  }
}

function asyncDownvoteComment (commentId) {
  return async (dispatch, getState) => {
    const { details, authUser } = getState()
    const comment = details.comments.find(comment => comment.id === commentId)
    dispatch(downvoteCommentActionCreator(commentId, authUser.id))

    try {
      if (comment.downVotesBy.includes(authUser.id)) {
        await api.neutralVoteComment(commentId, details.id)
      } else {
        await api.downvoteComment(commentId, details.id)
      }
    } catch (error) {
      alert(error.message)
      dispatch(downvoteCommentActionCreator(commentId, authUser.id))
    }
  }
}

export {
  ActionType,
  getDetailActionCreator,
  createCommentActionCreator,
  upvoteCommentActionCreator,
  downvoteCommentActionCreator,
  asyncGetDetail,
  asyncCreateComment,
  asyncUpvoteComment,
  asyncDownvoteComment,
  upvoteDetailActionCreator,
  downvoteDetailActionCreator
}
