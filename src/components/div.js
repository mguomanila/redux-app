import React from 'react'
import classnames from 'classnames'


export default function(props){
  {className, id, small, children, ...rest} = props
  
  return (
    <div className=classnames({
      [className]: true,
      "small": small,
    }) id={id}
    {...rest}>
      {children}
    </div>
  )
}
