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
      state.context.loggedIn = true
      Request
      .post(Config.endpoint('/users'))
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

function getResponseResolver(state){
  return (err, res) => {
    console.log({res})
    console.log({state})
//     if(res.ok){
//       Object.assign(state.context, res.body)
//       state.context.loggedIn = true
//       state.context.profileImageData = null
//       Cookie.setItem('session', JSON.stringify(state.context))
      Cookie.setItem('test', 'test')
//     } else {
      Cookie.setItem('loggedIn', true)
//     }
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
