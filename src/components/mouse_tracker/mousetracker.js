import React from 'react'

import Mouse from './mouse.js'
import Cat from './cat.js'

export default props => {
  
  return (
    <>
      <h1>Move the mouse around!</h1>
      <Mouse render={mouse => <Cat mouse={mouse}}/>
    </>
  )
}
