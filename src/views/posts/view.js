import React, { useState, useEffect }  from 'react' 
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'

import ClassNames from 'classnames'
import Moment from 'moment'

import Loader from 'APPSRC/components/loader'

import {
} from 'APPSRC/store/userSlice'

import {
} from 'APPSRC/store/postSlice'


const DATEFORMAT = 'MM/DD/YYYY HH:mm:ss'

export default props => {
  const { postId } = useParams()
  const session = useSelector(state => state.session)
  const user = useSelector(state => {
  })
  const blog = useSelector(state => {
    const index = state.post.posts.findIndex(blog => blog.id === postId)
    return state.post.posts[index]
  })
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    if(loading)
      setLoading(!loading)
  }, [loading])
  
  
  return loading ? <Loader /> : props.mode === 'summary' ? (
    // summary / list view
    <li className="post-view-summary">
      <aside>
        <img className="profile-img small"
          alt=""
          src={session.image} />
        <div className="post-metadata">
          <strong>{blog.title}</strong>
          <span className="user-name">{session.username}</span>
          <em>{Moment(blog.date, 'x').format(DATEFORMAT)}</em>
        </div>
      </aside>
      <summary>{blog.summary}</summary>&nbsp;
      <Link to={`/posts/${blog.id}`}>read more</Link>
      {
        user.id === session.id ? (
          <div>
            <Link to={`/posts/${blog.id}/edit`}>
              <button>edit post</button>
            </Link>
          </div>
        ) : ''
      }
    </li>
  ) : (
    // full post view
    <div className="post-view-full">
      <div className="post-view-container">
        <h2>
          <img className="profile-img"
            alt=""
            src={user.image} />
          <div className="post-metadata">
            <strong>{blog.title}</strong>
            <span className="user-name">{session.username}</span>
            <em>{Moment(blog.date, 'x').format(DATEFORMAT)}</em>
          </div>
        </h2>
        <section className="post-body"
          dangerouslySetInnerHTML={{__html: blog.body}}>
        </section>
      </div>
    </div>
  )
}
