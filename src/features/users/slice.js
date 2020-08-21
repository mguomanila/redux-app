import { createSlice } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import Request from 'superagent'
import Config from 'APPSRC/app/appConfig'
import { login } from 'APPSRC/features/session/slice'

export const counterSlice = createSlice({
  name: 'users',
  initialState: {
    users: []
  },
  reducers: {
    init: state => Request
      .get(Config.endpoint('/users'))
      .end((state => {
        return (err, res) => {
          if(res.ok){
            state.users = res.body
          }
        }
      })()),
    createUser: (state, action) => {
      modifyUser('post', action.details, state)
    },
    editUser: (state, action) => {
      modifyUser('put', action.details, state)
    }
  }
})

const modifyUser = (method, details, state) => {
  const dispatch = useDispath()
  Request
  [method](Config.endpoint('/users'))
  .send(details)
  .end((err, res) => {
    if(res.ok){
      dispatch(login({
        name: res.body.username,
        pass: res.body.password
      }))
    } else {
      console.log(err)
    }
  }
}

export const getInitialState = state => state.users.users
