/**
 * test scenario for MiddleBar component
 *
 * - should call handleSubmit dispatch when form is submitted
 */

import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { useDispatch, useSelector } from 'react-redux'
import MiddleBar from './MiddleBar'

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn()
}))

jest.mock('./ThreadItem', () => {
  const mockedThreadItem = () => <div data-testid='mock-thread-item' />
  mockedThreadItem.displayName = 'ThreadItem'
  return mockedThreadItem
})

describe('Middle bar component', () => {
  let dispatch, form, threads, users

  beforeEach(async () => {
    dispatch = jest.fn()

    threads = [
      {
        id: '1',
        title: 'thread title',
        body: 'thread content',
        createdAt: '2021-08-01T08:00:00.000Z',
        owner: {
          id: '1',
          name: 'John Doe',
          avatar: 'avatar.png'
        },
        comments: []
      }
    ]

    users = [
      {
        id: '1',
        name: 'John Doe',
        avatar: 'avatar.png'
      }
    ]

    useDispatch.mockReturnValue(dispatch)

    useSelector.mockImplementation(() => ({
      authUser: {
        id: '1'
      },
      details: {
        id: '1'
      }
    }))

    render(<MiddleBar threads={threads} users={users} />)
    form = await screen.findByTestId('thread-create')
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should call handleSubmit dispatch when form is submitted', async () => {
    fireEvent.submit(form)
    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenCalled()
  })
})
