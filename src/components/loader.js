import React, { useState } from 'react'
import ClassNames from 'classnames'


export default props => {
  // like ng-class, but for react
  const classes = ClassNames({
    'loader-container': true,
    'inline': props.inline
  })
    
  return (
    <div className="loader">
      <h3>Your task is in progress...</h3>
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
