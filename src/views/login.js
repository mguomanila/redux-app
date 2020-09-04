import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import useLocalStorage from 'react-use-localstorage'
import Request from 'superagent'

import config from 'APPSRC/app/appConfig'
import BasicInput from 'APPSRC/components/basicInput'

import {
  login as loginAction
} from 'APPSRC/features/session/slice'


export default function(props){
  const dispatch = useDispatch()
  const state = useSelector(state => state.session)
  const [, setUsers] = useLocalStorage('users')
  const [, setSession] = useLocalStorage('session')
  const history = useHistory()
  
  const login = e => {
    const detail = {}
    e.preventDefault()
    e.stopPropagation()
    Array
    .from(e.target.querySelectorAll('input'))
    .forEach(el => {
      detail[el.getAttribute('name')] = el.value
    })
    Request
    .post(config.endpoint.login)
    .set('Accept', 'application/json')
    .query({
      'username': detail.username,
      'password': detail.password
    })
    .end((err, res) => {
      if(!err && res.body){
        setSession(JSON.stringify(res.body.session))
        setUsers(JSON.stringify(res.body.users))
        history.push('/')
        window.location.reload()
      } else {
        dispatch(loginAction({
          loggedIn: false,
          loginError: 'Something went wrong!'
        }))
      }
    })
  }
  
  return (
    <>
    {(state.loggedIn && <div className="jumbotron">hello {state.name} ... Welcome Back</div>) ||
    <form className="login-form"
      onSubmit={login}>
      
      <fieldset>
        <legend>Log In</legend>
        <BasicInput name="username" type="text"
          placeholder="username" />
        <BasicInput name="password" type="password"
          placeholder="password" />
          {state.loginError && <aside className="error">{state.loginError}</aside>}
        <button type="submit">Log In</button>
      </fieldset>
    </form>}
    </>
  )
}
