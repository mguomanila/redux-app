import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import classnames from 'classnames'
import useLocalStorage from 'react-use-localstorage'


export default function(props){
  const { userId } = useParams()
  const user = useSelector(state => {
    const index = state.user.users.findIndex(user => parseInt(user.userId) === parseInt(userId))
  debugger
    return index != -1 ? state.user.users[index]
      : false
  })
  
  return user ? (
    <div className={classnames({
      'user': true,
      'small': props.small
    })}>
      <img className={classnames({
        'profile-img': true,
        'small': props.small
      })} src={user.profile} alt="" />
      <div className="user-meta">
        <strong>{user.blogName}</strong>
      </div>
      <div className="user-meta">
        <strong>{user.email}</strong>
      </div>
    </div>
  ) : <aside>no users</aside>
}
