import { createSlice } from '@reduxjs/toolkit'


export const counterSlice = createSlice({
  name: 'session',
  initialState: {
    loggedIn: false
  },
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
