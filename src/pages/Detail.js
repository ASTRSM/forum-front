import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { postedAt } from '../utils'
import parse from 'html-react-parser'
import { useDispatch, useSelector } from 'react-redux'
import { asyncGetDetail } from '../states/detail/action'
import CommentSection from '../components/CommentSection'
import ThreadInteraction from '../components/ThreadInteraction'

export default function Detail () {
  const location = useLocation()
  const { details } = useSelector((states) => states)
  const { thread, user } = location.state
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(asyncGetDetail(thread.id))
  }, [dispatch, thread.id])

  return (
    <div className='detail'>
      <header className='detail-header'>
        <Link to='..'>Back</Link>
        <h1>Details</h1>
      </header>
      <div className='thread-container'>
        <ThreadInteraction thread={details}/>
        <div className='thread-main'>
          <p className='thread-date'>{postedAt(thread.createdAt)}</p>
          <h3 className='thread-title'>{thread.title}</h3>
          <p className='thread-tag'>{thread.category}</p>
          <div className='thread-body_detail'>{parse(thread.body)}</div>
          <div className='thread-user'>
            <img src={user?.avatar} alt={user?.name} />
            <p>{user?.name}</p>
          </div>
        </div>
      </div>
      <CommentSection />
    </div>
  )
}
