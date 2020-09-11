import React, { useState, useEffect } from 'react' 
import { useSelector, useDispatch } from 'react-redux'
import update from 'immutability-helper'
import { useHistory } from 'react-router-dom'
import ReactQuill from 'react-quill'
import Moment from 'moment'

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

export default function(props){
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
  
  const init = () => {
    debugger
    if(postId){
      dispatch(getPost(postId))
    } else {
      dispatch(initAction())
    }
  }
  init()
  
  const submit = e => {
    e.preventDefault()
    const postBody = ''
  }
  
  const titleChange = e => {
    setPost(update(post, {
      title: {$set: e.target.value}
    }))
  }
  
  useEffect(() => {
  })
  
  const Editor = {
    placeholder: 'place your ideas here....',
    modules: {
      toolbar: {
        container: '#toolbar',
      }
    },
    handleChange: e => {}
  }
  
  return (
    <form className="post-edit"
      onSubmit={submit}>
      {loading ? <Loader /> : ''}
      <fieldset style={{display: loading || state.error ? 'none' : 'block'}}>
        <BasicInput type="text"
          name="title"
          value={post.title}
          error={validity.title}
          onChange={titleChange}
          placeholder="post title" />
        <div className='rich-editor'>
          <div id="toolbar"></div>
          <ReactQuill theme="snow"
            name=""
//             value={Editor.value}
//             onChange={Editor.handleChange}
            placeholder={Editor.placeholder}
            modules={Editor.modules} />
        </div>
        <button type="submit">
          {state.edit ? 'Edit Post' : 'Create'}
        </button>
      </fieldset>
    </form>
  )
}
