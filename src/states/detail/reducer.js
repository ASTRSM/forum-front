import { ActionType } from './action'

export default function detailReducer (detail = {}, action = {}) {
  switch (action.type) {
    case ActionType.GET_DETAIL:
      return action.payload
    default:
      return detail
  }
}
