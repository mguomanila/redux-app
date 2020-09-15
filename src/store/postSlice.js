import { createSlice } from '@reduxjs/toolkit'
import update from 'immutability-helper'
import Request from 'superagent'

import config from 'APPSRC/app/appConfig'


export const postSlice = createSlice({
  name: 'post',
  initialState: {
    posts: [],
    failed: [],
    loading: true
  },
  reducers: {
    initPost: (state, {payload}) => {
      state.posts = payload || []
      state.loading = false
    },
    post: (state, {payload}) => {
      const index = state.posts.findIndex(post => post.id === payload.id)
      if(index){
        state.posts = update(state.posts, {$splice: [[index, 1, payload]]})
      } else{
        state.posts = update(state.posts, {$push: payload})
      }
      state.loading = false
    },
    failed: (state, {payload}) => {
      state.failed = update(state.failed, {$push: payload})
    }
  }
})

export const {
  initPost, post, failed
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
        dispatch(failed({id: blog.id, err}))
      }
    })
  }
  config.loadTimeSimMs ? setTimeout(req, config.loadTimeSimMs) : req()
}

export default postSlice.reducer
