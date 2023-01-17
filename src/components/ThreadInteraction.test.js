/**
 * test scenario for ThreadInteraction component
 *
 * - should call onUpvote dispatch when upvote button is clicked
 * - should call onDownvote dispatch when downvote button is clicked
 */

import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { useDispatch, useSelector } from 'react-redux'
import ThreadInteraction from './ThreadInteraction'

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn()
}))

describe('Thread interaction component', () => {
  let dispatch, upvoteBtn, downvoteBtn, thread
  beforeEach(async () => {
    dispatch = jest.fn()
    thread = {
      id: '1',
      title: 'thread title',
      content: 'thread content',
      createdAt: '2021-08-01T08:00:00.000Z',
      owner: {
        id: '1',
        name: 'John Doe',
        avatar: 'avatar.png'
      },
      upVotesBy: [],
      downVotesBy: []
    }

    useDispatch.mockReturnValue(dispatch)

    useSelector.mockImplementation(() => ({
      authUser: {
        id: '1'
      }
    }))

    render(<ThreadInteraction thread={thread} />)
    upvoteBtn = await screen.findByTestId('upvote-btn')
    downvoteBtn = await screen.findByTestId('downvote-btn')
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should call onUpvote dispatch when upvote button is clicked', async () => {
    fireEvent.click(upvoteBtn)
    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenCalled()
  })

  it('should call onDownvote dispatch when downvote button is clicked', async () => {
    fireEvent.click(downvoteBtn)
    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenCalled()
  })
})
