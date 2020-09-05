import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import useLocalStorage from 'react-use-localstorage'
import Request from 'superagent'

import config from 'APPSRC/app/appConfig'
import BasicInput from 'APPSRC/components/basicInput'

import {
  login as loginAction
} from 'APPSRC/store/sessionSlice'


export default function(props){
  const dispatch = useDispatch()
  const state = useSelector(state => state.session)
  const [, setUsers] = useLocalStorage('users')
  const [, setSession] = useLocalStorage('session')
  const history = useHistory()
  
  const login = e => {
    const credential = {}
    e.preventDefault()
    e.stopPropagation()
    Array
    .from(e.target.querySelectorAll('input'))
    .forEach(el => {
      credential[el.getAttribute('name')] = el.value
    })
    Request
    .post(config.endpoint.login)
    .send(credential)
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
