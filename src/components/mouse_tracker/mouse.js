import React, {useState} from 'react'


// the <Mouse> component encapsulates the behaviour
export default props => {
  const [state, setState] = useState({x: 0, y: 0})
  
  const handleMouseMove = e => {
    setState({
      x: event.clientX,
      y: event.clientY
    })
  }
  
  return (
    <div style={{height: '100vh'}}
      onMouseMove={handleMouseMove}>
      {/* instead of providing a static representation
          of what <Mouse> renders, use the 'render'
          prop to dynamically determine what to
          render 
        */}
      // <p>current mouse position: {state.x}, {state.y}</p>
      {props.render(state)}
    </div>
  )
}
