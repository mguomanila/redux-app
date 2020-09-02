import React  from 'react' 
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import UserView from 'APPSRC/views/users/view'

export default function(props){
  const state = useSelector(state => state.user)
  debugger
  
  return (
    <ul className="user-list">
      {state.users ? state.users.map(v => (
        <li key={v.id}>
          <Link to={`/users/${v.id}`}>
            <UserView userId={v.id} small={true} />
          </Link>
        </li>
      )) : <aside>no users here...</aside>}
    </ul>
  )
}
