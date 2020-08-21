import React from 'react'

import  'APPSRC/style/app.less'
import AppHeader from 'APPSRC/views/appHeader'

// Components must be uppercase - regular DOM
// is lowercase
const app = props => {
  
  return (
    <div className="app-container">
      <AppHeader />
      <main>
        {React.cloneElement(props.children, props)}
      </main>
    </div>
  )
}


export default app
