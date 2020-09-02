import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import AppLayout from './layout'
import Login from 'APPSRC/views/login'

import PostList from 'APPSRC/views/posts/list'
import PostView from 'APPSRC/views/posts/view'
import PostEdit from 'APPSRC/views/posts/edit'

import UserList from 'APPSRC/views/users/list'
import UserView from 'APPSRC/views/users/view'
import UserEdit from 'APPSRC/views/users/edit'

import {Counter} from 'APPSRC/features/counter/Counter'


// router
export default function(props){
  
  return (
    <BrowserRouter>
      <Route path="/">
        <AppLayout>
          <Switch>
            <Route exact path="posts/:pageNum/?"
              ignoreScrollBehavior>
              <PostList />
            </Route>
            <Route exact path="/posts/create">
              <PostEdit />
            </Route>
            <Route exact path="/posts/:postId/edit">
              <PostEdit />
            </Route>
            <Route exact path="/posts/:postId">
              <PostView />
            </Route>
            <Route exact path="/users">
              <UserList />
            </Route>
            <Route exact path="/users/create">
              <UserEdit />
            </Route>
            <Route exact path="/users/:userId">
              <UserView />
            </Route>
            <Route exact path="/users/:userId/edit">
              <UserEdit />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/counter">
              <Counter />
            </Route>
          </Switch>
        </AppLayout>
      </Route>
    </BrowserRouter>
  )
}
