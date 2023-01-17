import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { asyncCreateComment } from '../states/detail/action'

export default function CommentInput () {
  const { authUser, details } = useSelector((states) => states)
  const dispatch = useDispatch()

  const onCommmentSubmit = (e) => {
    e.preventDefault()
    const comment = e.target.elements.comment.value
    dispatch(asyncCreateComment(details.id, comment))
    e.target.comment.value = ''
  }

  return (
    <div className='comment-input_container'>
      <div className="comment-input_profile">
        <img src={authUser?.avatar} alt={authUser?.name} className='avatar'/>
      </div>
      <form className='comment-input' onSubmit={onCommmentSubmit} data-testid='comment-input'>
        <textarea name="comment" id="comment" rows="3" placeholder='Post a nice comments...'></textarea>
        <button className='button transition-01'>Post</button>
      </form>
    </div>
  )
}
