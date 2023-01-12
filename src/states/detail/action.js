import api from '../../utils/api'

const ActionType = {
  GET_DETAIL: 'GET_DETAIL',
  CREATE_COMMENT: 'CREATE_COMMENT'
}

function getDetailActionCreator (detail) {
  return {
    type: ActionType.GET_DETAIL,
    payload: detail
  }
}

function createCommentActionCreator (comment) {
  return {
    type: ActionType.CREATE_COMMENT,
    payload: comment
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

export {
  ActionType,
  asyncGetDetail,
  asyncCreateComment
}
