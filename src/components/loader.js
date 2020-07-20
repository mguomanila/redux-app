import React from 'react'
import ClassNames from 'classnames'

export default class extends React.Component{
  render(){
    // like ng-class, but for react
    const classes = ClassNames({
      'loader-container': true,
      'inline': this.props.inline
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
}
