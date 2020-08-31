import React, { useState, useEffect } from 'react' 
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import BasicInput from 'APPSRC/components/basicInput'
import { elemUtil } from 'APPSRC/utility'

// actions
import {
  validate as validateAction,
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
  const state = useSelector(state => state.user)
  const [validity, setValidity] = useState({})
  
  const valueChanged = e => {
    const detail = {}
    const util = elemUtil(e.target, constraints)
    Array
    .from(e.target.parentNode.querySelectorAll('input'))
    .forEach(v => {
      const fieldname = v.getAttribute('name')
      detail[fieldname] = v.value
      if(fieldname === 'username'){
        setValidity(Object.assign(validity, validity[fieldname] = util.validateField(fieldname, detail[fieldname], {
          exclusive: state.users.map(v => v.username)
        })))
      } else {
        setValidity(Object.assign(validity, validity[fieldname] = util.validateField(fieldname, detail[fieldname]))) 
      }
    })
  }
  
  const createUser = e => {
    e.preventDefault()
    
    valueChanged(e)
    if(!validity.blogName.length && !validity.username.length && !validity.password.length){
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
      dispatch(validateAction({
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
          error={validity.blogName}
          onChange={valueChanged}
          autoFocus /><hr />
        <BasicInput type="text"
          name="username"
          placeholder="user name" />
        <BasicInput type="text"
          name="password"
          onChange={valueChanged}
          placeholder="password"
          error={validity.password}
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
