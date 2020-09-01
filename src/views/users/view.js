import React from 'react'
import { useSelector } from 'react-redux'
import classnames from 'classnames'


export default function(props){
  const user = useSelector(state => state.user)
  
  return user.userId ? (
    <div className={classnames({
      'user': true,
      'small': props.small
    })}>
      <img className={classnames({
        'profile-img': true,
        'small': props.small
      })} src={user.image.profileImageData} />
      <div className="user-meta">
        <strong>{user.blogName}</strong>
      </div>
    </div>
  ) : ''
}
