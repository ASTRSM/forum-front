/**
 * test scenario for auth thunk action
 *
 * - asyncSetAuthUser function
 *  - should dispatch correct action when given valid user data
 *  - should throw error and call alert when given invalid user data
 * - asyncUnsetAuthUser function
 *  - should dispatch correct action when given valid user data
 *  - should throw error and call alert when given invalid user data
 */

import api from '../../utils/api'
import { asyncSetAuthUser, asyncUnsetAuthUser, setAuthUserActionCreator, unsetAuthUserActionCreator } from './action'

const getStateReturn = {
  authUser: {
    id: 1
  }
}

describe('auth thunk action', () => {
  it('should dispatch correct action when given valid user data', async () => {
    const dispatch = jest.fn()
    const getState = jest.fn()
    const user = { email: 'test@test, test', password: 'test' }
    api.login = jest.fn().mockResolvedValue(user)
    api.putAccessToken = jest.fn()
    api.getOwnProfile = jest.fn().mockResolvedValue(getStateReturn)

    await asyncSetAuthUser(user)(dispatch, getState)

    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(getStateReturn))
  })

  it('should throw error and call alert when given invalid user data', async () => {
    const dispatch = jest.fn()
    const getState = jest.fn()
    window.alert = jest.fn()
    const user = { email: 'test@test, test', password: 'test' }
    const error = new Error('error')
    api.login = jest.fn().mockRejectedValue(error)

    await asyncSetAuthUser(user)(dispatch, getState)

    expect(dispatch).toHaveBeenCalledTimes(0)
    expect(window.alert).toHaveBeenCalledWith(error.message)
  })

  it('should dispatch correct action when given valid user data', async () => {
    const dispatch = jest.fn()
    const getState = jest.fn()
    const user = { email: 'test@test, test', password: 'test' }
    api.putAccessToken = jest.fn()

    await asyncUnsetAuthUser(user)(dispatch, getState)

    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenCalledWith(unsetAuthUserActionCreator({ ...getStateReturn, authUser: null }))
  })
})
