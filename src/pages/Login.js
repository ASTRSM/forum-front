import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { asyncSetAuthUser } from '../states/auth/action'

export default function Login () {
  const dispatch = useDispatch()

  const onLogin = (event) => {
    event.preventDefault()
    const { email, password } = event.target.elements
    dispatch(asyncSetAuthUser({ email: email.value, password: password.value }))
  }

  return (
    <div className='auth'>
      <h2>Sign In</h2>
      <form onSubmit={onLogin} className='auth-form'>
        <label htmlFor='email' className='auth-form_input'>
        <p>Email</p>
        <input type='email' id='email' name='email' />
        </label>
        <label htmlFor='password' className='auth-form_input'>
        <p>Password</p>
        <input type='password' id='password' name='password' />
        </label>
        <button type='submit' className='button transition-02'>Sign In</button>
      </form>
      <p>
          Don&apos;t have an account?
          {' '}
          <Link to="/register">Register</Link>
        </p>
    </div>
  )
}
