import React, { useState } from 'react'
import classnames from 'classnames'
import update from 'immutability-helper'


export default function(props) {
  const { helptext, error } = props
  
  return (
    <div className={classnames({
      'basic-input': true,
      'error': error
    })} {...props}>
      <input className={error ? 'error' : ''} 
      {...update(props, {
        children: {$set: null}
      })}/>
      {error ? error.map((err, i) => (<aside key={i}>{helptext || err.msg}</aside>)) : ""}
    </div>
  )
}
