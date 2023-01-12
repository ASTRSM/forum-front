import { ActionType } from './action'

export default function leaderboardReducer (leaderboard = [], action) {
  switch (action.type) {
    case ActionType.GET_LEADERBOARD: {
      return action.payload.leaderboard
    }
    default: {
      return leaderboard
    }
  }
}
