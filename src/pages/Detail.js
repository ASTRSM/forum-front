import React, { useEffect } from 'react'
import { BiComment } from 'react-icons/bi'
import { FcDislike, FcLikePlaceholder } from 'react-icons/fc'
import { useLocation } from 'react-router-dom'
import { postedAt } from '../utils'
import parse from 'html-react-parser'
import { useDispatch, useSelector } from 'react-redux'
import { asyncGetDetail } from '../states/detail/action'

export default function Detail () {
  const location = useLocation()
  const { thread, user } = location.state
  const { details } = useSelector((state) => state)
  const dispatch = useDispatch()
  console.log(details)

  useEffect(() => {
    console.log('masuk')
    dispatch(asyncGetDetail(thread.id))
  }, [dispatch, thread.id])

  return (
    <div className='detail'>
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
        <div className='thread-comment'>
          <h3>Comments</h3>
          <div className='comment-input_container'>
            <img src={user?.avatar} alt={user?.name} />
            <input type='text' placeholder='Add a comment...' />
            <button>Post</button>
          </div>
          <div className='comment-list'>
            {details.comments?.map((comment) => (
              <div className='comment-container' key={comment.id}>
                <div className="comment-user">
                  <img src={comment.owner.avatar} alt={comment.owner.name} />
                  <p>{comment.owner.name}</p>
                </div>
                <div className='comment-content'>
                  <p>{parse(comment.content)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
