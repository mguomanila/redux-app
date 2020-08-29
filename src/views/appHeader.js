import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import {
  getSessionContext as sessionContextSelect
} from 'APPSRC/features/session/slice'

export default function(props){
  const state = useSelector(sessionContextSelect)
  
  return (
    <header className="app-header">
      <Link to="/">
        <h1>ph&#923;edrus</h1>
      </Link>
      <section className="account-ctrl">
        <Link to="/users/create">Join</Link>
        <Link to="/login">{state.loggedIn ? "Loggedin" : 'LogIn'}</Link>
      </section>
    </header>
  )
}
