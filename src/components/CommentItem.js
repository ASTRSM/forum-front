import React from 'react'
import { FcDislike, FcLikePlaceholder } from 'react-icons/fc'
import { postedAt } from '../utils'
import parse from 'html-react-parser'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { asyncDownvoteComment, asyncUpvoteComment } from '../states/detail/action'

export default function CommentItem ({ comment }) {
  const dispatch = useDispatch()

  const onUpvote = () => {
    dispatch(asyncUpvoteComment(comment.id))
  }

  const onDownvote = () => {
    dispatch(asyncDownvoteComment(comment.id))
  }

  return (
    <div className='thread-container'>
      <div className="thread-interaction">
        <button className="btn-interaction transition-01" onClick={onUpvote}>
          <FcLikePlaceholder />
          <span>{comment.upVotesBy.length}</span>
        </button>
        <button className="btn-interaction transition-01" onClick={onDownvote}>
          <FcDislike />
          <i className="fas fa-thumbs-down"></i>
          <span>{comment.downVotesBy.length}</span>
        </button>
      </div>
      <div className='thread-main'>
        <p className='thread-date'>{postedAt(comment.createdAt)}</p>
        <div className='thread-body'>{parse(comment.content)}</div>
        <div className='thread-user'>
          <img src={comment?.owner?.avatar} alt={comment?.owner?.name} />
          <p>{comment?.owner?.name}</p>
        </div>
      </div>
    </div>
  )
}

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired
}
