import { createSlice } from '@reduxjs/toolkit'
import update from 'immutability-helper'
import Request from 'superagent'

import config from 'APPSRC/app/appConfig'

export const postSlice = createSlice({
  name: 'post',
  initialState: {
    posts: [],
    failed: [],
  },
  reducer: {
    init: (state, {payload}) => {
      state.posts = payload
    },
    post: (state, {payload}) => {
      const index = state.posts.findIndex(post => post.id == payload.id)
      if(index)
        state.posts = update(state.posts, {$splice: [[index, 1, payload]]})
      else
        state.posts = update(state.posts, {$push: payload})
    },
    failed: (state, {payload}) => {
      state.failed = update(state.failed, {$push: payload})
    }
  }
})

export const{
  post, failed
} = postSlice.actions

// private actions
const { init } = postSlice.actions

export const initAsync = () => dispatch => {
  Request
  .get(config.endpoint.posts)
  .end((err, res) => {
    if(res.ok){
      dispatch(init(res.body.posts))
    }
  })
}

export const getPostAsync = id => dispatch => {
  const req = () => {
    Request
    .get(config.endpoint.posts)
    .query({id})
    .end((err, res) => {
      if(res.ok){
        dispatch(post({id, post: res.body.post}))
      }
    })
  }
  config.loadTimeSimMs ? setTimeout(req, config.loadTimeSimMs) : req()
}

export const modifyPostAsync = (newpost, id) => dispatch => {
  const req = () => {
    const endpoint = id ? config.endpoint.posts + '/' + id : config.endpoint.posts
    const req = () => {
      Request[id ? 'put' : 'post'](endpoint)
      .send(newpost)
      .end((err, res) => {
        if(res.ok){
          dispatch(post({id, msg: newpost}))
        } else {
          dispatch(failed({id, err}))
        }
      })
    }
    config.loadTimeSimMs ? setTimeout(req, config.loadTimeSimMs) : req()
  }
}

export default postSlice.reducer
