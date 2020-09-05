import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'

import {
  logout as logoutAction
} from 'APPSRC/store/sessionSlice'


export default function(props){
  const history = useHistory()
  const dispatch = useDispatch()
  const session = useSelector(state => state.session)
  
  const logout = e => {
    dispatch(logoutAction())
    history.push('/')
  }
  
  
  return (
    <header className="app-header">
      <Link to="/">
        <h1>ph&#923;edrus</h1>
      </Link>
      <section className="account-ctrl">
      {session.loggedIn ? (
        <Link to="/posts/create">
          Hello {session.name}, welcome back!
        </Link>
      ) : <Link to="/users/create">Join</Link>}
      {session.loggedIn ? 
        <a onClick={logout}>Log Out</a>
      : <Link to="/login">Log In</Link>}
      </section>
    </header>
  )
}
