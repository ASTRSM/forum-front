import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LoadingBar from 'react-redux-loading-bar'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import { asyncPreloadProcess } from './states/isPreload/action'

function App () {
  const dispatch = useDispatch()
  const {
    authUser = null,
    isPreload = false
  } = useSelector((states) => states)

  useEffect(() => {
    dispatch(asyncPreloadProcess())
  }, [dispatch])

  if (isPreload) {
    return null
  }

  if (!authUser) {
    return (
      <div className="App">
        <LoadingBar />
        <main>
        <Routes>
            <Route path="/*" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </div>
    )
  }

  return (
    <div className="App">
      <LoadingBar />
      <Home />
    </div>
  )
}

export default App
