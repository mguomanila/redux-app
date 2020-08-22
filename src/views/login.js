import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createBrowserHistory } from 'history'

import BasicInput from 'APPSRC/components/basicInput'

import {
  login as loginReduce,
  getSessionContext as sessionContextReduce,
  getInitialState
} from 'APPSRC/features/session/slice'

const history = createBrowserHistory()

export default function(props){
  const dispatch = useDispatch()
  const state = useSelector(sessionContextReduce)
  console.log({state})
  const login = e => {
    const detail = {}
    Array
    .from(e.target.querySelectorAll('input'))
    .forEach(el => {
      detail[el.getAttribute('name')] = el.value
    })
    dispatch(loginReduce({
      name: detail.username,
      pass: detail.password
    }))
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
        <button type="submit">Log In</button>
      </fieldset>
    </form>
  )
}
