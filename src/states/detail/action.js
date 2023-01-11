import api from '../../utils/api'

const ActionType = {
  GET_DETAIL: 'GET_DETAIL'
}

function getDetailActionCreator (detail) {
  return {
    type: ActionType.GET_DETAIL,
    payload: detail
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

export {
  ActionType,
  asyncGetDetail
}
