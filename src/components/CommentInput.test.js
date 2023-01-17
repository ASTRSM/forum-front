/**
 * test scenario for CommentInput component
 *
 * - should handle textarea comment input typing correctly
 * - should call onCommmentSubmit dispatch when form is submitted
 */

import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import CommentInput from './CommentInput'
import { useSelector, useDispatch } from 'react-redux'
import userEvent from '@testing-library/user-event'

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn()
}))

describe('Comment input component', () => {
  let dispatch, textarea, form

  beforeEach(async () => {
    dispatch = jest.fn()

    useSelector.mockImplementation(() => ({
      authUser: {
        id: '1'
      },
      details: {
        id: '1'
      }
    }))

    useDispatch.mockReturnValue(dispatch)

    render(<CommentInput />)
    textarea = await screen.findByPlaceholderText('Post a nice comments...')
    form = await screen.findByTestId('comment-input')
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should handle textarea comment input typing correctly', async () => {
    await userEvent.type(textarea, 'new comment')
    expect(textarea.value).toEqual('new comment')
  })

  it('should call onCommmentSubmit dispatch when form is submitted', async () => {
    await userEvent.type(textarea, 'new comment')
    fireEvent.submit(form, { target: { comment: { value: 'new comment' } } })
    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenCalled()
  })
})
