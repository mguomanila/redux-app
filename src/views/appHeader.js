import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import useLocalStorage from 'react-use-localstorage'

import {
  logout as logoutAction
} from 'APPSRC/store/sessionSlice'

import {
  create as userAction
} from 'APPSRC/store/userSlice'


export default function(props){
  const history = useHistory()
  const dispatch = useDispatch()
  const session = useSelector(state => state.session)
  
  const logout = e => {
    dispatch(logoutAction())
  }
  
  return (
    <header className="app-header">
      <Link to="/">
        <h1>ph&#923;edrus</h1>
      </Link>
      <section className="account-ctrl">
      {session.loggedIn ? (
        <Link to="/posts/create">
          Hello {session.username}, write something!
        </Link>
      ) : <Link to="/users/create">Join</Link>}
      {session.loggedIn ? 
        <a href="/" onClick={logout}>Log Out</a>
      : <Link to="/login">Log In</Link>}
      </section>
    </header>
  )
}
