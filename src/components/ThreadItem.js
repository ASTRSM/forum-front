import React from 'react'
import parse from 'html-react-parser'
import PropTypes from 'prop-types'
import { FcLikePlaceholder, FcDislike } from 'react-icons/fc'
import { BiComment } from 'react-icons/bi'
import { postedAt } from '../utils'

export default function ThreadItem ({ thread, users }) {
  const user = users.find((user) => user.id === thread.ownerId)

  return (
    <div className='thread-container'>
      <div className="thread-interaction">
        <button className="btn-interaction transition-01">
          <FcLikePlaceholder />
          <span>{thread.upVotesBy.length}</span>
        </button>
        <button className="btn-interaction transition-01">
          <FcDislike />
          <i className="fas fa-thumbs-down"></i>
          <span>{thread.downVotesBy.length}</span>
        </button>
        <button className="btn-interaction transition-01">
          <BiComment />
          <span>{thread.totalComments}</span>
        </button>
      </div>
      <div className='thread-main'>
        <p className='thread-date'>{postedAt(thread.createdAt)}</p>
        <h3 className='thread-title'>{thread.title}</h3>
        <p className='thread-tag'>{thread.category}</p>
        <div className='thread-body'>{parse(thread.body)}</div>
        <div className='thread-user'>
          <img src={user?.avatar} alt={user?.name} />
          <p>{user?.name}</p>
        </div>
      </div>
    </div>
  )
}

ThreadItem.propTypes = {
  thread: PropTypes.object,
  users: PropTypes.array
}
