import React from 'react'
import ClassNames from 'classnames'


const app = props => {
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

app.propTypes = {
  inline: PropTypes.bool
}

export default app
