import React from 'react'
import ClassNames from 'classnames'


export default function(props){
  // like ng-class, but for react
  const classes = ClassNames({
    'loader-container': true,
    'inline': props.inline
  })
    
  return (
    <div className="loader">
      <div className={classes}>
        <aside></aside>
        <aside></aside>
        <aside></aside>
        <aside></aside>
        <aside></aside>
      </div>
    </div>
  )
}
