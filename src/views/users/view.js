import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import classnames from 'classnames'
import useLocalStorage from 'react-use-localstorage'


export default function(props){
  const { userId } = useParams()
  const state = useSelector(state => state.user)
  const user = (({users}) => {
    const index = users.findIndex(user => user.userId === (userId || props.userId))
    return index !== -1 ? users[index] : false
  })(state)
  const [, setUsersStg] = useLocalStorage('users')
  
  useEffect(() => {
    // persist data
    setUsersStg(JSON.stringify(state.users))
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
  ) : <aside>....</aside>
}
