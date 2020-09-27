import { createSlice } from '@reduxjs/toolkit'
import { reactLocalStorage } from 'reactjs-localstorage'
import Request from 'superagent'

import config from 'APPSRC/app/appConfig'


const defaultImg = null
const users = reactLocalStorage.getObject('users', [])
// user data structure
// {
//   userId,
//   blogName,
//   username,
//   password,
//   firstname,
//   lastname,
//   email,
//   image
// }

export const userSlice = createSlice({
  name: 'admin',
  initialState: { users, defaultImg },
  reducers: {
    validate: (state, {payload}) => {
      Object.assign(state, payload)
    },
    init: (state, {payload}) => {
      state.defaultImg = payload.image
      debugger
    }
  }
})

export const {
  create, edit, validate, init
} = userSlice.actions

export const initAsync = () => dispatch => {
  Request
  .get(config.endpoint.createuser)
  .end((err, res) => {
    if(err) console.log(err)
    else
      dispatch(init(res.body))
  })
}

export const createUserAsync = payload => dispatch => {
  Request
  .post(config.endpoint.createuser)
  .send(payload)
  .end((err, res) => {
    // todo
  })
}

export default userSlice.reducer
