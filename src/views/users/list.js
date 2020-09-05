import React  from 'react' 
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import UserView from 'APPSRC/views/users/view'

export default function(props){
  const users = useSelector(state => state.user.users)
  
  return (
    <ul className="user-list">
      {users ? users.map(v => (
        <li key={v.userId}>
          <Link to={`/users/${v.userId}`}>
            <UserView userId={v.userId} small={true} />
          </Link>
        </li>
      )) : <aside>no users here...</aside>}
    </ul>
  )
}
