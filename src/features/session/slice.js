import { createSlice } from '@reduxjs/toolkit'
import Request from 'superagent'
import Config from 'APPSRC/app/appConfig'
import Cookie from 'APPSRC/vendor/cookie'


export const counterSlice = createSlice({
  name: 'session',
  initialState: {
    context: {
      loggedIn: false,
      name: '',
      pass: ''
    },
  },
  reducers: {
    getPost: state => {},
    modifyPost: state => {},
    login: (state, action) => {
      Request
      .get(Config.endpoint('/users'))
      .query({
        'username': action.payload.name,
        'password': action.payload.pass
      })
      .end(getResponseResolver(state))
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

const getResponseResolver = state => {
  return  (err, res) => {
    if(res.ok && res.body instanceof Array && res.body.length > 0){
      Object.assign(state.context, res.body[0])
      state.context.loggedIn = true
      state.context.profileImageData = null
      Cookie.setItem('session', JSON.stringify(state.context))
    }
  }
}

export const getSessionContext =  state => state.session.context

export const populateSessionInfo = () => JSON.parse(Cookie.getItem('session'))

export const {
  getPost, modifyPost,
  login, logout,
  editUser, createUser,
  search
} = counterSlice.actions

// Thunk functions that allow async logic are 
// defined here.
// ie. 

export default counterSlice.reducer
