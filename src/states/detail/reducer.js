import { ActionType } from './action'

export default function detailReducer (detail = {}, action = {}) {
  switch (action.type) {
    case ActionType.GET_DETAIL:
      return action.payload
    case ActionType.CREATE_COMMENT:
      return {
        ...detail,
        comments: [action.payload, ...detail.comments]
      }
    default:
      return detail
  }
}
