import React from 'react'
import { useSelector } from 'react-redux'
import CommentInput from './CommentInput'
import CommentItem from './CommentItem'

export default function CommentSection () {
  const { details } = useSelector((state) => state)

  return (
    <div className='thread-comment'>
      <h3>Comments</h3>
      <CommentInput />
      <div className='comment-list'>
        {details.comments?.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  )
}
