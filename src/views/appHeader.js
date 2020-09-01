import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'


export default function(props){
  const { loggedIn } = useSelector(state => state.session)
  
  return (
    <header className="app-header">
      <Link to="/">
        <h1>ph&#923;edrus</h1>
      </Link>
      <section className="account-ctrl">
        <Link to="/counter">Counter</Link>
        <Link to="/users/create">Join</Link>
        <Link to="/login">{loggedIn ? "Loggedin" : 'LogIn'}</Link>
      </section>
    </header>
  )
}
