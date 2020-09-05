import { createSlice } from '@reduxjs/toolkit'
import { reactLocalStorage } from 'reactjs-localstorage'


export const counterSlice = createSlice({
  name: 'session',
  initialState: reactLocalStorage.getObject('session', {loggedIn: false}),
  reducers: {
    getPost: state => {},
    modifyPost: state => {},
    login: (state, {payload}) => {
      Object.assign(state, payload)
    },
    logout: state => {
      Object.assign(state, {loggedIn: false})
      reactLocalStorage.remove('session')
      reactLocalStorage.remove('users')
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
