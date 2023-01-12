import React from 'react'
import parse from 'html-react-parser'
import PropTypes from 'prop-types'
import { postedAt } from '../utils'
import { Link } from 'react-router-dom'
import ThreadInteraction from './ThreadInteraction'

export default function ThreadItem ({ thread, users }) {
  const user = users.find((user) => user.id === thread.ownerId)

  return (
    <div className='thread-container'>
      <ThreadInteraction thread={thread} />
      <div className='thread-main'>
        <p className='thread-date'>{postedAt(thread.createdAt)}</p>
        <Link to={`/details/${thread.id}`} state={{ thread, user }}>
          <h3 className='thread-title'>{thread.title}</h3>
        </Link>
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
