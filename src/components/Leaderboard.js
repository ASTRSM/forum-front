import React, { useEffect } from 'react'
import { MdOutlineLeaderboard } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { asyncGetLeaderboard } from '../states/leaderboard/action'

export default function Leaderboard () {
  const { leaderboard } = useSelector(states => states)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(asyncGetLeaderboard())
  }, [dispatch])

  return (
    <div className="left-bar_content-item">
      <h3 className='link-icon transition-02'><MdOutlineLeaderboard />Leaderboards</h3>
      <div className="leaderboard-container">
        {leaderboard?.map((item, index) => (
          <div className="leaderboard-item" key={item.user.id}>
            <div className="thread-user">
              <img className="leaderboard-item-avatar" src={item.user.avatar} alt={item.user.name} />
              <p className="leaderboard-item-name">{item.user.name}</p>
            </div>
            <p className="leaderboard-item-score">{item.score}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
