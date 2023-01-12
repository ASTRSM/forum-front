import React, { useEffect } from 'react'
import { BiComment } from 'react-icons/bi'
import { FcDislike, FcLikePlaceholder } from 'react-icons/fc'
import { Link, useLocation } from 'react-router-dom'
import { postedAt } from '../utils'
import parse from 'html-react-parser'
import { useDispatch } from 'react-redux'
import { asyncGetDetail } from '../states/detail/action'
import CommentSection from '../components/CommentSection'

export default function Detail () {
  const location = useLocation()
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
