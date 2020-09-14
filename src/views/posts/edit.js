import React, { useState, useEffect } from 'react' 
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useQuill } from 'react-quilljs'
import update from 'immutability-helper'

import BasicInput from 'APPSRC/components/basicInput'
import Loader from 'APPSRC/components/loader'
import { elemUtil } from 'APPSRC/utility'

import {
  getPostAsync as getPost,
  initAsync as initAction,
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
  // initialize post 
  if(postId){
    dispatch(getPost(postId))
  } else {
    dispatch(initAction())
  }
  
  
  const submit = e => {
    e.preventDefault()
    const postBody = ''
    setPost(update(post, {
      title: {$set: e.target.value}
    }))
  }
  
//   createEditor()
  const Editor = {
    modules: {
      toolbar: "#toolbar"
    },
    formats: ['bold', 'size', 'script']
  }
  const { quill, quillRef } = useQuill()
  
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
        <div className="rich-editor">
          <div ref={quillRef} />
        </div>
        <button type="submit">
          {state.edit ? 'Edit Post' : 'Create'}
        </button>
      </fieldset>
    </form>
  )
}
