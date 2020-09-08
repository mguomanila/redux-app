import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import classnames from 'classnames'


export default function(props){
  const profile = useSelector(state => state.user)
  debugger
  const userId = props.userId || useParams().userId
  const user = profile.users.find(user => user.userId === userId)
  
  return user ? (
    <div className={classnames({
      'user': true,
      'small': props.small
    })}>
      <img className={classnames({
        'profile-img': true,
        'small': props.small
      })} src={user.image} alt="" />
      <div className="user-meta">
        <strong>{user.blogName}</strong>
      </div>
      <div className="user-meta">
        <strong>{user.username}</strong>
      </div>
      <div className="user-meta">
        <strong>{user.email}</strong>
      </div>
    </div>
  ) : ''
}
