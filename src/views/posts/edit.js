import React, { useState, useEffect } from 'react' 
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import update from 'immutability-helper'

import BasicInput from 'APPSRC/components/basicInput'
import Loader from 'APPSRC/components/loader'
import { elemUtil } from 'APPSRC/utility'
import Blog from 'APPSRC/components/quill'

import {
  getPostAsync as getPost,
  initAsync as initAction,
  modifyPostAsync as postBlog,
} from 'APPSRC/store/postSlice'


const constraints = {
  title: {
    required: true,
    minLength: 5
  }
}


export default props => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [validity, setValidity] = useState({})
  const [state, setState] = useState({
    edit: false,
    error: false
  })
  const _ = useSelector(state => {
    const index = state.post.posts.findIndex(post => post.id === props.id)
    return state.post.posts[index] || {}
  })
  const [post, setPost] = useState(_)
  const loading = useSelector(state => state.post.loading)
  const { postId } = props
  
  const submit = e => {
    e.preventDefault()
    debugger
    const title = e.target['title'].value
    const msg = e.target.innerText.split('Create')[0].trim()
    if(!state.edit){
      // create blog!
      dispatch(postBlog({ title, msg }))
    } else {
      setPost(update(post, {
        id: postId,
        title,
        msg
      }))
    }
  }
  
  useEffect(() => {
    // initialize post 
    if(postId){
      dispatch(getPost(postId))
    } else {
      dispatch(initAction())
    }
  }, [loading])
  
  
  return (
    <form className="post-edit"
      onSubmit={submit}>
      {loading ? <Loader /> : ''}
      <fieldset style={{display: loading || state.error ? 'none' : 'block'}}>
        <BasicInput type="text"
          name="title"
          value={post.title}
          error={validity.title}
          placeholder="post title" />
        <Blog name="blogPost"
          style={{width: 500, height: 300}}/>
        <button type="submit">
          {state.edit ? 'Edit Post' : 'Create'}
        </button>
      </fieldset>
    </form>
  )
}
