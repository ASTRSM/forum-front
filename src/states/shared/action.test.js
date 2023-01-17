/**
 *  test scenarion for shared thunk action
 *
 *  - asyncPopulateUsersAndThreads thunk action
 *   - should dispatch action correctly when data fetching success
 *   - should dispatch action and call alert when data fetching failed
 */

import { hideLoading, showLoading } from 'react-redux-loading-bar'
import api from '../../utils/api'
import { receiveThreadsActionCreator } from '../threads/action'
import { receiveUsersActionCreator } from '../users/action'
import { asyncPopulateUsersAndThreads } from './action'

describe('shared thunk action', () => {
  it('should dispatch action correctly when data fetching success', async () => {
    const dispatch = jest.fn()
    const getState = jest.fn()
    const users = [{ id: 1, name: 'user1' }]
    const threads = [{ id: 1, title: 'thread1' }]
    api.getAllUsers = jest.fn().mockResolvedValue(users)
    api.getAllThreads = jest.fn().mockResolvedValue(threads)

    await asyncPopulateUsersAndThreads()(dispatch, getState)

    expect(dispatch).toHaveBeenCalledTimes(4)
    expect(dispatch).toHaveBeenNthCalledWith(1, showLoading())
    expect(dispatch).toHaveBeenNthCalledWith(2, receiveUsersActionCreator(users))
    expect(dispatch).toHaveBeenNthCalledWith(3, receiveThreadsActionCreator(threads))
    expect(dispatch).toHaveBeenNthCalledWith(4, hideLoading())
  })

  it('should dispatch action and call alert when data fetching failed', async () => {
    const dispatch = jest.fn()
    const getState = jest.fn()
    window.alert = jest.fn()
    const error = new Error('error')
    api.getAllUsers = jest.fn().mockRejectedValue(error)
    api.getAllThreads = jest.fn().mockRejectedValue(error)

    await asyncPopulateUsersAndThreads()(dispatch, getState)

    expect(dispatch).toHaveBeenCalledTimes(2)
    expect(dispatch).toHaveBeenNthCalledWith(1, showLoading())
    expect(dispatch).toHaveBeenNthCalledWith(2, hideLoading())
    expect(window.alert).toHaveBeenCalledWith(error.message)
  })
})
