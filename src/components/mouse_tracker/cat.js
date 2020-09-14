import React from 'react'


// <Cat> component that renders the image of 
// a cat chasing the mouse around the screen.
export default props => {
  const { mouse } = props
  const image = props.image || './cat.png'
  const cat_st = {
    position: 'absolute',
    left: mouse.x,
    top: mouse.y
  }
  
  return (
    <img src={image} style={cat_st} />
  )
}
