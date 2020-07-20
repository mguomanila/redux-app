import React from 'react'
import { Link } from 'react-router-dom'

export default class extends React.Component{
  render(){
    return (
      <header className="app-header">
        <Link to="/">
          <h1>&#923;eneid</h1>
        </Link>
        <section className="account-ctrl">
          <Link to="/users/create">Join</Link>
          <Link to="/login">Login</Link>
        </section>
      </header>
    )
  }
}
