import React from 'react'
import classnames from 'classnames'
import update from 'immutability-helper'


export default function(props) {
  const { helpText, error } = props
  const isError = error && error.msg
  
  return (
    <div className={classnames({
      'basic-input': true,
      'error': isError
    })} {...props}>
      <input className={isError ? 'error' : ''} 
      {...update(props, {
        children: {$set: null}
      })}/>
      <aside>{helpText || isError ? error.msg : ''}</aside>
    </div>
  )
}
