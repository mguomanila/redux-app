import React from 'react'
import { useSelector } from 'react-redux'
import classnames from 'classnames'
import useLocalStorage from 'react-use-localstorage'


export default function(props){
  const state = useSelector(state => state.user)
  const userId = useSelector(state => state.session.userId)
  const [user, setUser] = useLocalStorage('user', '{}')
  const userObj = JSON.parse(user)
  debugger
  
  return userId ? (
    <div className={classnames({
      'user': true,
      'small': props.small
    })}>
      <img className={classnames({
        'profile-img': true,
        'small': props.small
      })} src={userObj.profileImageData} />
      <div className="user-meta">
        <strong>{userObj.blogName}</strong>
      </div>
    </div>
  ) : ''
}
