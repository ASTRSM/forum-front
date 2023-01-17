import React from 'react'
import PropTypes from 'prop-types'
import ThreadItem from './ThreadItem'
import { useDispatch } from 'react-redux'
import { asyncAddThread } from '../states/threads/action'

export default function MiddleBar ({ threads, users }) {
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    const { title, body, category } = e.target.elements

    dispatch(asyncAddThread({ title: title.value, body: body.value, category: category.value }))

    title.value = ''
    body.value = ''
    category.value = ''
  }

  return (
    <div className='middle-bar'>
      <h1>Threads</h1>
        <form onSubmit={handleSubmit} className='thread-create_container' data-testid='thread-create'>
          <input type='text' placeholder='Insert a title' name='title' />
          <input type='text' placeholder='Insert a tag/category' name='category' />
          <textarea placeholder='Insert a body' name='body' rows='5' />
          <button type='submit' className='button transition-01'>Create</button>
        </form>
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
