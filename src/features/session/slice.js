import { createSlice } from '@reduxjs/toolkit'
import Cookie from 'APPSRC/vendor/cookie'


export const counterSlice = createSlice({
  name: 'session',
  initialState: {
    context: {
      loggedIn: false,
    },
  },
  reducers: {
    getPost: state => {},
    modifyPost: state => {},
    login: (state, action) => {
      state.context = Object.assign({}, action.payload)
    },
    logout: state => {
      Cookie.removeItem('session')
      state.context = Object.assign({}, {
        loggedIn: false
      })
    },
    editUser: state => {},
    createUser: state => {},
    search: state => {},
  }
})

export const getSessionContext =  state => state.session.context

export const {
  getPost, modifyPost,
  login, logout,
  editUser, createUser,
  search
} = counterSlice.actions

export default counterSlice.reducer
