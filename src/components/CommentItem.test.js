/**
 * test scenario for CommentItem component
 *
 * - should call onUpvote dispatch when upvote button is clicked
 * - should call onDownvote dispatch when downvote button is clicked
 */

import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { useDispatch } from 'react-redux'
import CommentItem from './CommentItem'

jest.mock('react-redux', () => ({
  useDispatch: jest.fn()
}))

describe('Comment item component', () => {
  let dispatch, upvoteBtn, downvoteBtn, comment

  beforeEach(async () => {
    dispatch = jest.fn()
    comment = {
      id: '1',
      content: 'comment content',
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

    render(<CommentItem comment={comment} />)
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
