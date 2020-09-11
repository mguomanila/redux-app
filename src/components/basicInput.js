import React from 'react'
import classnames from 'classnames'
import update from 'immutability-helper'

const style = {
  position: {
    position: 'static'
  },
  color: {
    color: '#aa0000'
  }
}

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
      {props.children}
      <aside style={style.position}>{
        error 
          ? error.map(el => el.msg + ', ')
          : <span style={style.color}>{helptext}</span>
      }</aside>
    </div>
  )
}
