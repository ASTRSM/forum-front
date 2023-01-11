import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { asyncRegisterUser } from '../states/users/action'

export default function Register () {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onRegister = (event) => {
    event.preventDefault()
    const { name, email, password } = event.target.elements
    dispatch(asyncRegisterUser({ name: name.value, email: email.value, password: password.value }))
    navigate('/')
  }

  return (
    <div className='auth'>
      <h2>Register</h2>
      <form onSubmit={onRegister} className='auth-form'>
        <label htmlFor='name' className='auth-form_input'>
          <p>Name</p>
          <input type='text' id='name' name='name' />
        </label>
        <label htmlFor='email' className='auth-form_input'>
          <p>Email</p>
          <input type='email' id='email' name='email' />
        </label>
        <label htmlFor='password' className='auth-form_input'>
          <p>Password</p>
          <input type='password' id='password' name='password' />
        </label>
        <button type='submit' className='button'>Register</button>
      </form>
      <p>
        Already have an account?
        {' '}
        <Link to="/login">Login</Link>
      </p>
    </div>
  )
}
