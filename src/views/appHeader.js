import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'


export default function(props){
  const session = useSelector(state => state.session)
  
  const logout = e => {
    
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
