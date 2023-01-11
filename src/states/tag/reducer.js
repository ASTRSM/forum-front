import { ActionType } from './action'

function tagReducer (activeTag = null, action = []) {
  switch (action.type) {
    case ActionType.SET_ACTIVE_TAG:
      if (activeTag === action.payload.activeTag) {
        return null
      }
      return action.payload.activeTag
    case ActionType.UNSET_ACTIVE_TAG:
      return null
    default:
      return activeTag
  }
}

export default tagReducer
