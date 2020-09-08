import React  from 'react' 
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import UserView from 'APPSRC/views/users/view'


export default function(props){
  const profile = useSelector(state => state.user)
  debugger
  
  return (
    <ul className="user-list">
      {profile.users.length ? profile.users.map(v => (
        <li key={v.userId}>
          <Link to={`/users/${v.userId}`}>
            <UserView userId={v.userId} small={true} />
          </Link>
        </li>
      )) : ''}
    </ul>
  )
}
