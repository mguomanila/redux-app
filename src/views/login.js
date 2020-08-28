import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createBrowserHistory } from 'history'
import Request from 'superagent'
import Config from 'APPSRC/app/appConfig'
import Cookie from 'APPSRC/vendor/cookie'

import BasicInput from 'APPSRC/components/basicInput'

import {
  login as loginReduce,
  getSessionContext as sessionContextSelect
} from 'APPSRC/features/session/slice'

const history = createBrowserHistory()

export default function(props){
  const dispatch = useDispatch()
  let state = useSelector(sessionContextSelect)
  
  const login = e => {
    const detail = {}
    Array
    .from(e.target.querySelectorAll('input'))
    .forEach(el => {
      detail[el.getAttribute('name')] = el.value
    })
    e.preventDefault()
    e.stopPropagation()
    Request
    .post(Config.endpoint('/users'))
    .set('Accept', 'application/json')
    .query({
      'username': detail.username,
      'password': detail.password
    })
    .end((err, res) => {
      if(!err && res.body){
        Cookie.setItem('session', JSON.stringify(res.body))
        dispatch(loginReduce(Object.assign({
          loggedIn: true,
          name: detail.username,
          pass: detail.password,
        }, res.body)))
      } else {
        Cookie.setItem('session', JSON.stringify({loginError: true}))
        dispatch(loginReduce({
          loggedIn: false,
          loginError: 'Something went wrong!'
        }))
      }
    })
    history.push('/', '')
  }
  
  return (
    <form className="login-form"
      onSubmit={login}>
      
      <fieldset>
        <legend>Log In</legend>
        <BasicInput name="username" type="text"
          placeholder="username" />
        <BasicInput name="password" type="password"
          placeholder="password" />
          {state.loginError && <aside className="error">{state.loginError}</aside>}
          {state.name && <aside className="error">hello {state.name} ... Welcome Back</aside>}
        <button type="submit">Log In</button>
      </fieldset>
    </form>
  )
}
