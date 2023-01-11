import React from 'react'
import { Link } from 'react-router-dom'
import { TbMessageDots } from 'react-icons/tb'
import PropTypes from 'prop-types'
import Taglist from './Taglist'

export default function LeftBar ({ threads, setActiveTag }) {
  return (
    <aside className='left-bar'>
      <header className="App-header">
        <h1>Forum Front</h1>
        <Link to='/' className='link-icon transition-02'><TbMessageDots /><h3>Threads</h3></Link>
        <div className="link-icon"><p><b>#</b></p><h3>Popular Tags</h3></div>
        <div className="tags">
          <Taglist threads={threads} setActiveTag={setActiveTag}/>
        </div>
      </header>
    </aside>
  )
}

LeftBar.propTypes = {
  threads: PropTypes.array,
  setActiveTag: PropTypes.func
}
