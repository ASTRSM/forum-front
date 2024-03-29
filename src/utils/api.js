const api = (() => {
  const BASE_URL = 'https://forum-api.dicoding.dev/v1'

  async function _fetchWithAuth (url, options = {}) {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${getAccessToken()}`
      }
    })
  }

  function putAccessToken (token) {
    localStorage.setItem('accessToken', token)
  }

  function getAccessToken () {
    return localStorage.getItem('accessToken')
  }

  async function register ({ name, email, password }) {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        password
      })
    })

    const responseJson = await response.json()
    const { status, message } = responseJson

    if (status !== 'success') {
      throw new Error(message)
    }

    const {
      data: { user }
    } = responseJson

    return user
  }

  async function login ({ email, password }) {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })

    const responseJson = await response.json()

    const { status, message } = responseJson

    if (status !== 'success') {
      throw new Error(message)
    }

    const {
      data: { token }
    } = responseJson

    return token
  }

  async function getOwnProfile () {
    const response = await _fetchWithAuth(`${BASE_URL}/users/me`)

    const responseJson = await response.json()

    const { status, message } = responseJson

    if (status !== 'success') {
      throw new Error(message)
    }

    const {
      data: { user }
    } = responseJson

    return user
  }

  async function getAllUsers () {
    const response = await fetch(`${BASE_URL}/users`)

    const responseJson = await response.json()

    const { status, message } = responseJson

    if (status !== 'success') {
      throw new Error(message)
    }

    const { data: { users } } = responseJson

    return users
  }

  async function getAllThreads () {
    const response = await fetch(`${BASE_URL}/threads`)

    const responseJson = await response.json()

    const { status, message } = responseJson

    if (status !== 'success') {
      throw new Error(message)
    }

    const { data: { threads } } = responseJson

    return threads
  }

  async function createThread ({ title, body, category = null }) {
    const response = await _fetchWithAuth(`${BASE_URL}/threads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        body,
        category
      })
    })

    const responseJson = await response.json()

    const { status, message } = responseJson

    if (status !== 'success') {
      throw new Error(message)
    }

    const { data: { thread } } = responseJson

    return thread
  }

  async function getDetail (threadId) {
    const response = await fetch(`${BASE_URL}/threads/${threadId}`)
    const responseJson = await response.json()

    const { status, message } = responseJson

    if (status !== 'success') {
      throw new Error(message)
    }

    const { data: { detailThread } } = responseJson

    return detailThread
  }

  async function createComment (threadId, content) {
    const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content
      })
    })

    const responseJson = await response.json()

    const { status, message } = responseJson

    if (status !== 'success') {
      throw new Error(message)
    }

    const { data: { comment } } = responseJson

    return comment
  }

  async function getLeaderboard () {
    const response = await fetch(`${BASE_URL}/leaderboards`)
    const responseJson = await response.json()

    const { status, message } = responseJson

    if (status !== 'success') {
      throw new Error(message)
    }

    const { data: { leaderboards } } = responseJson

    return leaderboards
  }

  async function voteThread (threadId) {
    const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/up-vote`, {
      method: 'POST'
    })

    const responseJson = await response.json()

    const { status, message } = responseJson

    if (status !== 'success') {
      throw new Error(message)
    }

    const { data: { vote } } = responseJson

    return vote
  }

  async function neutralVoteThread (threadId) {
    const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/neutral-vote`, {
      method: 'POST'
    })

    const responseJson = await response.json()

    const { status, message } = responseJson

    if (status !== 'success') {
      throw new Error(message)
    }

    const { data: { vote } } = responseJson

    return vote
  }

  async function downvoteThread (threadId) {
    const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/down-vote`, {
      method: 'POST'
    })

    const responseJson = await response.json()

    const { status, message } = responseJson

    if (status !== 'success') {
      throw new Error(message)
    }

    const { data: { vote } } = responseJson

    return vote
  }

  async function upvoteComment (commentId, threadId) {
    const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments/${commentId}/up-vote`, {
      method: 'POST'
    })

    const responseJson = await response.json()

    const { status, message } = responseJson

    if (status !== 'success') {
      throw new Error(message)
    }

    const { data: { vote } } = responseJson

    return vote
  }

  async function downvoteComment (commentId, threadId) {
    const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments/${commentId}/down-vote`, {
      method: 'POST'
    })

    const responseJson = await response.json()

    const { status, message } = responseJson

    if (status !== 'success') {
      throw new Error(message)
    }

    const { data: { vote } } = responseJson

    return vote
  }

  async function neutralVoteComment (commentId, threadId) {
    const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments/${commentId}/neutral-vote`, {
      method: 'POST'
    })

    const responseJson = await response.json()

    const { status, message } = responseJson

    if (status !== 'success') {
      throw new Error(message)
    }

    const { data: { vote } } = responseJson

    return vote
  }

  return {
    putAccessToken,
    getAccessToken,
    register,
    login,
    getOwnProfile,
    getAllUsers,
    getAllThreads,
    createThread,
    getDetail,
    createComment,
    getLeaderboard,
    voteThread,
    neutralVoteThread,
    downvoteThread,
    upvoteComment,
    downvoteComment,
    neutralVoteComment
  }
})()

export default api
