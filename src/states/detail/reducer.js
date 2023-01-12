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
    case ActionType.UPVOTE_COMMENT:
      return {
        ...detail,
        comments: detail.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              upVotesBy: comment.upVotesBy.includes(action.payload.userId)
                ? comment.upVotesBy.filter((id) => id !== action.payload.userId)
                : comment.upVotesBy.concat([action.payload.userId]),
              downVotesBy: comment.downVotesBy.includes(action.payload.userId)
                ? comment.downVotesBy.filter((id) => id !== action.payload.userId)
                : comment.downVotesBy
            }
          }
          return comment
        })
      }
    case ActionType.DOWNVOTE_COMMENT:
      return {
        ...detail,
        comments: detail.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              downVotesBy: comment.downVotesBy.includes(action.payload.userId)
                ? comment.downVotesBy.filter((id) => id !== action.payload.userId)
                : comment.downVotesBy.concat([action.payload.userId]),
              upVotesBy: comment.upVotesBy.includes(action.payload.userId)
                ? comment.upVotesBy.filter((id) => id !== action.payload.userId)
                : comment.upVotesBy
            }
          }
          return comment
        })
      }
    default:
      return detail
  }
}
