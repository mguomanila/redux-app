import { createSlice } from '@reduxjs/toolkit'
import { reactLocalStorage } from 'reactjs-localstorage'
import Request from 'superagent'

import config from 'APPSRC/app/appConfig'

const initialState = {loggedIn: false}
// session data structure
// {
//   userId,
//   username,
//   blogName,
//   image
// }

export const counterSlice = createSlice({
  name: 'session',
  initialState: reactLocalStorage.getObject('session', initialState),
  reducers: {
    getPost: state => {},
    modifyPost: state => {},
    login: (state, {payload}) => {
      Object.assign(state, payload)
    },
    logout: state => {
      reactLocalStorage.clear()
      state = initialState
    },
  }
})

export const {
  getPost, modifyPost,
  login, logout,
} = counterSlice.actions

export const reqLogin = creds => dispatch => {
  Request
  .post(config.endpoint.login)
  .send(creds)
  .end((err, res) => {
    if(!err && res.body){
      reactLocalStorage.setObject('users', res.body.users)
      const islogin = {loggedIn: true}
      reactLocalStorage.setObject('session', Object.assign(islogin, res.body.session))
      dispatch(login(islogin))
    } else {
      dispatch(login({
        loginError: 'Something went wrong!'
      }))
    }
  })
  
}

export default counterSlice.reducer
