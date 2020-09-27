import React, { useState, useEffect } from 'react' 
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import update from 'immutability-helper'
import Moment from 'moment'

import BasicInput from 'APPSRC/components/basicInput'
import Loader from 'APPSRC/components/loader'
import { elemUtil } from 'APPSRC/utility'
import Blog from 'APPSRC/components/quill'

import {
  getPostAsync as getPost,
  modifyPostAsync as postBlog,
  removeNewId as removeIdAction
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
  const { postId } = useParams()
  const [mode, setMode] = useState({
    edit: postId ? true : false,
    error: false
  })
  const [loading, setLoading] = useState(true)
  const userId = useSelector(state => state.session.userId)
  
  // handle posts here
  // if no `postId` just create new post
  // initialize post 
  if(postId){
    dispatch(getPost(postId))
  }
  // for new post `newId` will be created after
  // successful query to the db
  const newId = useSelector(state => state.post.newId)
  const [post, setPost] = useState({})
  
  const submit = e => {
    e.preventDefault()
    const error = {}
    const util = elemUtil(e.target, constraints)
    const title = e.target['title'].value
    const msg = e.target.innerText.split('Create')[0].trim()
    error['title'] = util.validateField('title', title)
    if(error.title.length){
      setValidity(error)
    } else {
      setValidity({})
      if(!mode.edit){
        // create blog!
        dispatch(postBlog({ title, msg,
          date: Moment().valueOf(),
          userId
        }))
      } else {
        // edit post
        setPost(update(post, {
          id: postId,
          userId,
          title,
          msg
        }))
      }
    }
  }
  
  useEffect(() => {
    if(newId)
      history.push(`/posts/${newId}`)
    setLoading(false)
    dispatch(removeIdAction())
  }, [newId, history, dispatch])
  
  
  return (
    <form className="post-edit"
      onSubmit={submit}>
      {loading ? <Loader /> : ''}
      <fieldset style={{display: loading || mode.error ? 'none' : 'block'}}>
        <BasicInput type="text"
          name="title"
          value={post.title}
          error={validity.title}
          placeholder="post title" />
        <Blog name="blogPost"
          style={{width: 500, height: 300}}/>
        <button type="submit">
          {mode.edit ? 'Edit Post' : 'Create'}
        </button>
      </fieldset>
    </form>
  )
}
