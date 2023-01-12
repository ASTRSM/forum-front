import React from 'react'
import { FcDislike, FcLikePlaceholder } from 'react-icons/fc'
import { postedAt } from '../utils'
import parse from 'html-react-parser'
import PropTypes from 'prop-types'

export default function CommentItem ({ comment }) {
  return (
    <div className='thread-container'>
      <div className="thread-interaction">
        <button className="btn-interaction transition-01">
          <FcLikePlaceholder />
          <span>{comment.upVotesBy.length}</span>
        </button>
        <button className="btn-interaction transition-01">
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
