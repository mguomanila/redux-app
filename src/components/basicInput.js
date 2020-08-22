import React from 'react'
import PropTypes from 'prop-types'
import update from 'react-addons-update'
import ClassNames from 'classnames'


function app(props) {
  const { helpText, error } = props
  
  return (
    <div className={ClassNames({
      'basic-input': true,
      'error': error
    })} {...props}>
      <input className={error ? 'error' : ''}
      {...update(props, {
        children: {$set: null}
      })}/> 
      {props.children}
      <aside>{helpText || error}</aside>
    </div>
  )
}

// enforce props types
app.propTypes = {
  helpText: PropTypes.string,
  error: PropTypes.bool
}

export default app
