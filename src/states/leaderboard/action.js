import api from '../../utils/api'

const ActionType = {
  GET_LEADERBOARD: 'GET_LEADERBOARD'
}

function getLeaderboardActionCreator (leaderboard) {
  return {
    type: ActionType.GET_LEADERBOARD,
    payload: {
      leaderboard
    }
  }
}

function asyncGetLeaderboard () {
  return async (dispatch) => {
    const leaderboard = await api.getLeaderboard()
    dispatch(getLeaderboardActionCreator(leaderboard))
  }
}

export { ActionType, getLeaderboardActionCreator, asyncGetLeaderboard }
