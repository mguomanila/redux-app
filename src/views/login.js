import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import BasicInput from 'APPSRC/components/basicInput'

import {
  reqLogin as asyncLogin
} from 'APPSRC/store/sessionSlice'


export default function(props){
  const dispatch = useDispatch()
  const history = useHistory()
  const state = useSelector(state => state.session)
  
  const login = e => {
    const credential = {}
    e.preventDefault()
    e.stopPropagation()
    Array
    .from(e.target.querySelectorAll('input'))
    .forEach(el => {
      credential[el.getAttribute('name')] = el.value
    })
    dispatch(asyncLogin(credential))
  }
  
  useEffect(() => {
    if(state.loggedIn){
      history.push('/users')
      window.location.reload()
    }
  }, [state.loggedIn])
  
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
