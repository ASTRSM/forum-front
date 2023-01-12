import React from 'react'
import { useDispatch } from 'react-redux'
import { asyncUnsetAuthUser } from '../states/auth/action'

export default function LogoutButton () {
  const dispatch = useDispatch()

  const onLogout = () => {
    dispatch(asyncUnsetAuthUser())
  }

  return (
    <button type='button' className='red-button' onClick={onLogout}>
      Logout
    </button>
  )
}
