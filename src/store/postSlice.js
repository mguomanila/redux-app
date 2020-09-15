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
  reducers: {
    initPost: (state, {payload}) => {
      state.posts = payload || []
    },
    post: (state, {payload}) => {
      const index = state.posts.findIndex(post => post.id === payload.id)
      if(index > -1){
        state.posts = update(state.posts, {$splice: [[index, 1, payload]]})
      } else{
        state.newId = payload.id
        state.posts = update(state.posts, {$push: [payload]})
      }
    },
    failed: (state, {payload}) => {
      state.failed = update(state.failed, {$push: [payload]})
    },
    removeNewId: state => {
      state.newId = false
    }
  }
})

export const {
  initPost, post, failed, removeNewId
} = postSlice.actions

export const initAsync = () => dispatch => {
  Request
  .get(config.endpoint.posts)
  .end((err, res) => {
    if(res && res.ok){
      dispatch(initPost(res.body.posts))
    } else {
      console.log(err)
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
        dispatch(post(res.body.post))
      }
    })
  }
  config.loadTimeSimMs ? setTimeout(req, config.loadTimeSimMs) : req()
}

export const modifyPostAsync = blog => dispatch => {
  const endpoint = blog.id 
    ? config.endpoint.posts + '/' + blog.id 
    : config.endpoint.posts
  const req = () => {
    Request[blog.id ? 'put' : 'post'](endpoint)
    .send(blog)
    .end((err, res) => {
      if(res.ok){
        dispatch(post(Object.assign(res.body, blog)))
      } else {
        dispatch(failed(err))
      }
    })
  }
  config.loadTimeSimMs ? setTimeout(req, config.loadTimeSimMs) : req()
}

export default postSlice.reducer
