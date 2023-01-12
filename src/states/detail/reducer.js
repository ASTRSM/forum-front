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
    case ActionType.UPVOTE_DETAIL:
      return {
        ...detail,
        upVotesBy: detail.upVotesBy.includes(action.payload.userId)
          ? detail.upVotesBy.filter((id) => id !== action.payload.userId)
          : detail.upVotesBy.concat([action.payload.userId]),
        downVotesBy: detail.downVotesBy.includes(action.payload.userId)
          ? detail.downVotesBy.filter((id) => id !== action.payload.userId)
          : detail.downVotesBy
      }
    case ActionType.DOWNVOTE_DETAIL:
      return {
        ...detail,
        downVotesBy: detail.downVotesBy.includes(action.payload.userId)
          ? detail.downVotesBy.filter((id) => id !== action.payload.userId)
          : detail.downVotesBy.concat([action.payload.userId]),
        upVotesBy: detail.upVotesBy.includes(action.payload.userId)
          ? detail.upVotesBy.filter((id) => id !== action.payload.userId)
          : detail.upVotesBy
      }
    default:
      return detail
  }
}
