import React, { useEffect } from 'react'
import { BiComment } from 'react-icons/bi'
import { FcDislike, FcLike } from 'react-icons/fc'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { asynctoggleDownvoteThread, asynctoggleVoteThread } from '../states/threads/action'

export default function ThreadInteraction ({ thread }) {
  const [isUpvoted, setIsUpvoted] = React.useState(false)
  const [isDownvoted, setIsDownvoted] = React.useState(false)
  const { authUser } = useSelector((state) => state)
  const dispatch = useDispatch()

  useEffect(() => {
    setIsUpvoted(thread.upVotesBy?.includes(authUser.id))
    setIsDownvoted(thread.downVotesBy?.includes(authUser.id))
  }, [authUser.id, thread.downVotesBy, thread.upVotesBy])

  const onUpvote = () => {
    dispatch(asynctoggleVoteThread(thread.id))
  }

  const onDownvote = () => {
    dispatch(asynctoggleDownvoteThread(thread.id))
  }

  return (
    <div className="thread-interaction">
    <button type='button' className="btn-interaction transition-01" onClick={onUpvote}>
      <FcLike />
      <span>{isUpvoted ? <b>{thread?.upVotesBy?.length}</b> : thread?.upVotesBy?.length}</span>
    </button>
    <button type='button' className="btn-interaction transition-01" onClick={onDownvote}>
      <FcDislike />
      <i className="fas fa-thumbs-down"></i>
      <span>{isDownvoted ? <b>{thread?.downVotesBy?.length}</b> : thread?.downVotesBy?.length}</span>
    </button>
    <button type='button' className="btn-interaction transition-01">
      <BiComment />
      <span>{thread.totalComments}</span>
    </button>
  </div>
  )
}

ThreadInteraction.propTypes = {
  thread: PropTypes.object
}
