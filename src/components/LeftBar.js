import React from 'react'
import { Link } from 'react-router-dom'
import { TbMessageDots } from 'react-icons/tb'
import PropTypes from 'prop-types'
import Taglist from './Taglist'
import LogoutButton from './LogoutButton'
import Leaderboard from './Leaderboard'

export default function LeftBar ({ threads, setActiveTag }) {
  return (
    <aside className='left-bar'>
      <h1>Forum Front</h1>
      <div className="left-bar_content">
        <div className="left-bar_content-item">
        <Link to='/' className='link-icon transition-02'><TbMessageDots /><h3>Threads</h3></Link>
        </div>
        <div className="left-bar_content-item">
          <div className="link-icon"><p><b>#</b></p><h3>Popular Tags</h3></div>
          <div className="tags">
            <Taglist threads={threads} setActiveTag={setActiveTag}/>
          </div>
        </div>
        <Leaderboard />
        <div className="left-bar_content-item">
          <LogoutButton />
        </div>
      </div>
    </aside>
  )
}

LeftBar.propTypes = {
  threads: PropTypes.array,
  setActiveTag: PropTypes.func
}
