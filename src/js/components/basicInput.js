import React from 'react'
import PropTypes from 'prop-types'
import update from 'react-addons-update'
import ClassNames from 'classnames'


export default class extends React.Component{
  static propTypes = {
    helpText: PropTypes.string,
    error: PropTypes.string
  }
  render(){
    const { helpText, error } = this.props
    return (
      <div className={ClassNames({
        'basic-input': true,
        'error': error
      })} {...this.props}>
        <input className={error ? 'error' : ''}
        {...update(this.props, {
          children: {$set: null}
        })}/> 
        {this.props.children}
        <aside>{helpText || error}</aside>
      </div>
    )
  }
}
