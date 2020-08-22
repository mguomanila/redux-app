import React from 'react'

import AppHeader from 'APPSRC/views/appHeader'


export default function(props){
  
  return (
    <div className="app-container">
      <AppHeader />
      <main>
        {React.cloneElement(props.children, props)}
      </main>
    </div>
  )
}
