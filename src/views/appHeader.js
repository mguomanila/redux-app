import React from 'react'
import { Link } from 'react-router-dom'

const app = props => {
  
  return (
    <header className="app-header">
      <Link to="/">
        <h1>ph&#923;edrus</h1>
      </Link>
      <section className="account-ctrl">
        <Link to="/users/create">Join</Link>
        <Link to="/login">Login</Link>
      </section>
    </header>
  )
}

export default app
