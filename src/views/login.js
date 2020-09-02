import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createBrowserHistory } from 'history'
import { Cookies } from 'react-cookie'
import Request from 'superagent'

import Config from 'APPSRC/app/appConfig'
import BasicInput from 'APPSRC/components/basicInput'

import {
  login as loginAction
} from 'APPSRC/features/session/slice'

import {
  createUser as usersAction
} from 'APPSRC/features/users/slice'

const history = createBrowserHistory()


export default function(props){
  const dispatch = useDispatch()
  const state = useSelector(state => state.session)
  const Cookie =  new Cookies()
  
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
    .post(Config.endpoint)
    .set('Accept', 'application/json')
    .query({
      'username': detail.username,
      'password': detail.password
    })
    .end((err, res) => {
      if(!err && res.body){
        Cookie.set('session', JSON.stringify(res.body.session))
        Cookie.set('users', JSON.stringify( res.body.users))
        dispatch(loginAction(res.body.session))
        dispatch(usersAction({users: res.body.users}))
      } else {
        Cookie.set('session')
        dispatch(loginAction({
          loggedIn: false,
          loginError: 'Something went wrong!'
        }))
      }
    })
    history.push('/', '')
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
