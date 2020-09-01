import React, { useState, useEffect } from 'react' 
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import BasicInput from 'APPSRC/components/basicInput'
import { elemUtil } from 'APPSRC/utility'

// actions
import {
  validate as validateAction,
  imageUpload as uploadAction,
  createUser as userAction
} from 'APPSRC/features/users/slice'

const constraints = {
  username: {
    required: true,
    minLength: 3
  },
  password: {
    required: true,
    minLength: 5
  },
  blogname: {
    required: true,
    minLength: 5
  }
}

export default function(props){
  const history = useHistory()
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const userId = useSelector(state => state.session.userId)
  
  const validateUser = e => {
    const util = elemUtil(e.target, constraints)
    let error
    Array
    .from(e.target.parentNode.querySelectorAll('input'))
    .forEach(v => {
      const fieldname = v.getAttribute('name')
      const validity = {}
      if(fieldname === 'username'){
        validity[fieldname] = util.validateField(fieldname, v.value, {
          exclusive: user.users.map(v => v.username)
        }) 
      } else {
        validity[fieldname] = util.validateField(fieldname, v.value)
      }
      error = validity[fieldname].length || error
      dispatch(validateAction(validity))
    })
    return error
  }
  
  const createUser = e => {
    e.preventDefault()
    const util = elemUtil(e.target)
    const error = validateUser(e)
    debugger
    if(!error){
      dispatch(userAction({
        blogName: util.getInputElement('blogName').value,
        userName: util.getInputElement('blogName').value,
        password: util.getInputElement('password').value,
        firstname: util.getInputElement('firstName').value,
        lastname: util.getInputElement('lastName').value,
        email: util.getInputElement('email').value,
      }))
      history.push(`/user/${userId}`)
    }
  }
  
  const chooseFile = e => {
    const util = elemUtil(e.target)
    return util
      .getInputElement('profileImage')
      .click()
  }
  
  const imageLoadedHandler = e => {
    const imageSize = atob(decodeURI(e.target.result).replace(/^.*base64,/, '')).length
    const sizeExceeded = imageSize > 1024*1000
    dispatch(uploadAction({ sizeExceeded }))
    if(!sizeExceeded){
      dispatch(uploadAction({
        profileImageData: e.target.result
      }))
    }
  }
  
  const userImageUpload = e => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onload = imageLoadedHandler
    reader.readAsDataURL(file)
  }
  
  // noValidate disables native validation
  // to avoid react collisions with native state
  return (
    <form className="user-edit"
      name="useredit"
      onSubmit={e => e.preventDefault()}
      noValidate>
      <fieldset>
        <legend>become an author</legend>
        <BasicInput type="text"
          name="blogName"
          placeholder="blog name"
          error={user.validity.blogName}
          autoFocus /><hr />
        <BasicInput type="text"
          name="username"
          error={user.validity.username}
          placeholder="user name" />
        <BasicInput type="password"
          name="password"
          placeholder="password"
          error={user.validity.password}
          required /> <br />
        <div className="profile-image-container">
          <label>profile image</label>
          <img className="profile-img"
            src={user.image.profileImageData} />
          <BasicInput type="file"
            name="profileImage"
            onChange={userImageUpload}
            helptext={user.image.sizeExceeded ? 'less than 1MB' : ''}>
            <button style={{width: 210, top: -10, left: -10}}
              onClick={chooseFile}>
              choose an image
            </button>
          </BasicInput>
        </div>
        <BasicInput type="text"
          name="firstName"
          placeholder="first name" />
        <BasicInput type="text"
          name="lastName"
          placeholder="last name" />
        <BasicInput type="text"
          name="email"
          placeholder="email" />
        <button type="submit"
          onClick={createUser}>
          I&#39;m ready to write</button>
      </fieldset>
    </form>
  )
}
