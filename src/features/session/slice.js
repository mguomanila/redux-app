import { createSlice } from '@reduxjs/toolkit'
import Cookie from 'APPSRC/vendor/cookie'


export const counterSlice = createSlice({
  name: 'session',
  initialState: (() => JSON.parse(Cookie.getItem('session')) || {loggedIn: false})(),
  reducers: {
    getPost: state => {},
    modifyPost: state => {},
    login: (state, {payload}) => {
      Object.assign(state, payload)
    },
    logout: state => {
      state.context = { loggedIn: false }
    },
    editUser: state => {},
    createUser: state => {},
    search: state => {},
  }
})

export const {
  getPost, modifyPost,
  login, logout,
  editUser, createUser,
  search
} = counterSlice.actions

export default counterSlice.reducer
