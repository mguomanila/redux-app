import React from 'react'
import { useSelector } from 'react-redux'
import classnames from 'classnames'
import { reactLocalStorage } from 'reactjs-localstorage'


export default function(props){
  const state = useSelector(state => state.user)
  const userId = useSelector(state => state.session.userId)
  const user = reactLocalStorage.getObject('user', '{}')
  
  return userId ? (
    <div className={classnames({
      'user': true,
      'small': props.small
    })}>
      <img className={classnames({
        'profile-img': true,
        'small': props.small
      })} src={user.profileImageData} />
      <div className="user-meta">
        <strong>{user.blogName}</strong>
      </div>
    </div>
  ) : ''
}
