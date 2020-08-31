import React, { useState } from 'react' 
import { createBrowserHistory } from 'history'
import { useSelector, useDispatch } from 'react-redux'

import BasicInput from 'APPSRC/components/basicInput'
import { elemUtil } from 'APPSRC/utility'

// actions
import {
  createUser as createUserAction,
  editUser as editUserAction,
  validate as validateAction,
  image as imageAction
} from 'APPSRC/features/users/slice'

const history = createBrowserHistory()

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
  const dispatch = useDispatch()
  const state = useSelector(state => state.user)
  
  const createUser = e => {
    e.preventDefault()
    const detail = {}
    const validationState = {}
    const error = false
    const util = elemUtil(e.target, constraints)
    
    Array
    .from(e.target.parentNode.querySelectorAll('input'))
    .forEach(v => {
      const fieldname = v.getAttribute('name')
      detail[fieldname] = v.value
      if(fieldname === 'username'){
        validationState[fieldname] =  util.validateField(fieldname, detail[fieldname], {
          exclusive: state.users.map(v => v.username)
        })
      } else {
        validationState[fieldname] =  util.validateField(fieldname, detail[fieldname]) 
      }
    })
    
    if(state.profileImageData){
      detail['profileImageData'] = state.profileImageData
    }
    dispatch(validateAction({
      validity: validationState
    }))
    if(!error){
//       dispatch(createUserAction(detail))
      history.push('', `/users/${state.users[0].id}`)
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
    dispatch(validateAction({
      sizeExceeded: imageSize > 1024*1000
    }))
    if(!state.sizeExceeded){
      dispatch(imageAction({
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
          error={state.validity.blogName}
          autoFocus /><hr />
        <BasicInput type="text"
          name="username"
          placeholder="user name"
          error={state.validity.username} />
        <BasicInput type="text"
          name="password"
          placeholder="password"
          error={state.validity.password}
          required /> <br />
        <div className="profile-image-container">
          <label>profile image</label>
          <img className="profile-img"
            src={state.profileImageData} />
          <BasicInput type="file"
            name="profileImage"
            onChange={userImageUpload}
            helptext={state.sizeExceed ? 'less than 1MB' : ''}>
            <button style={{width: 130, top: -10, left: -33}}
              onClick={chooseFile}>
              choose file
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
