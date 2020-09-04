import React, { useState, useEffect } from 'react' 
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import BasicInput from 'APPSRC/components/basicInput'
import { elemUtil } from 'APPSRC/utility'

import md5 from 'md5'

// actions
import {
//   edit as editAction,
  create as createAction,
  validate as validateAction
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
  },
  image: {
    maxsize: 1024*1000
  }
}

export default function(props){
  const history = useHistory()
  const dispatch = useDispatch()
  const state = useSelector(state => state.user)
  const [users, setUsers] = useState(state.users)
  const [userImg, setUserImg] = useState(state.defaultImg)
  const [sizeExceeded, setImageOverload] = useState(false)
  
  const validateUser = e => {
    const util = elemUtil(e.target, constraints)
    let error
    
    Array
    .from(util.getInputElementAll('input'))
    .forEach(v => {
      const fieldname = v.getAttribute('name')
      const validity = {}
      if(fieldname === 'username'){
        validity[fieldname] = util.validateField(fieldname, v.value, {
          exclusive: state.users.map(v => v.username)
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
    const userId = md5(state.users.length)
      .substring(0,5)
    const util = elemUtil(e.target)
    const error = validateUser(e)
    
    if(!error){
      const user = {
        userId,
        blogName: util.getInputElement('blogName').value,
        username: util.getInputElement('username').value,
        password: util.getInputElement('password').value,
        firstname: util.getInputElement('firstName').value,
        lastname: util.getInputElement('lastName').value,
        email: util.getInputElement('email').value,
        profile: userImg,
      }
      dispatch(createAction(user))
      history.push(`/users/${userId}`)
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
    const sizeOverload = imageSize > constraints.image.maxsize
    setImageOverload(sizeOverload)
    if(!sizeOverload){
      setUserImg(e.target.result)
    }
  }
  
  const userImageUpload = e => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onload = imageLoadedHandler
    reader.readAsDataURL(file)
  }
  
    debugger
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
          error={state.blogName}
          autoFocus /><hr />
        <BasicInput type="text"
          name="username"
          error={state.username}
          placeholder="user name" />
        <BasicInput type="password"
          name="password"
          placeholder="password"
          error={state.password}
          required /> <br />
        <div className="profile-image-container">
          <label>profile image</label>
          <img className="profile-img"
            src={userImg}
            alt="" />
          <BasicInput type="file"
            name="profileImage"
            onChange={userImageUpload}
            helptext={sizeExceeded ? 'less than 1MB' : ''}>
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
