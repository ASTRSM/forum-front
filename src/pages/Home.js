import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LeftBar from '../components/LeftBar'
import MiddleBar from '../components/MiddleBar'
import RightBar from '../components/RightBar'
import { asyncPopulateUsersAndThreads } from '../states/shared/action'
import { setActiveTagActionCreator } from '../states/tag/action'

export default function Home () {
  const dispatch = useDispatch()
  const {
    threads = [],
    users = [],
    activeTag
  } = useSelector((states) => states)
  const [filteredThreads, setFilteredThreads] = React.useState(threads)

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads())

    if (activeTag) {
      setFilteredThreads(threads.filter((thread) => thread.category === activeTag))
    } else {
      setFilteredThreads(threads)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, activeTag])

  const setActiveTag = (e) => {
    dispatch(setActiveTagActionCreator(e.target.id))
  }

  return (
    <main className='main-page'>
      <LeftBar threads={threads} setActiveTag={setActiveTag}/>
      <MiddleBar threads={activeTag ? filteredThreads : threads} users={users}/>
      <RightBar />
    </main>
  )
}
