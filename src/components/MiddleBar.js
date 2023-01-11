import React from 'react'
import PropTypes from 'prop-types'
import ThreadItem from './ThreadItem'

export default function MiddleBar ({ threads, users }) {

  const handleSubmit = (e) => {
  return (
    <div className='middle-bar'>
      <h2>Threads</h2>
      <div className='thread-create_container'>
        <form onSubmit={}>
          <input type='text' placeholder='Insert a title' name='title' />
          <input type='text' placeholder='Insert a description' name='description' />
          <button type='submit'>Create</button>
        </form>
      </div>
      {threads.map((thread) => (
        <ThreadItem key={thread.id} thread={thread} users={users}/>
      ))}
    </div>
  )
}

MiddleBar.propTypes = {
  threads: PropTypes.array,
  users: PropTypes.array
}
