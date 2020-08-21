import React from 'react'
import ReactDOM from 'react-dom'

const validators = {
  minLength: {
    assert: (val, len) => (typeof val == 'string' && val.length >= len),
    msg: (val, len) => 'minimum ' + len + ' characters'
  },
  required: {
    assert: val => (typeof val == 'string' 
      ? !/^\s*$/.test(val)
      : val !== undefined && val !== null
    ),
    msg: () => 'required field'
  },
  exclusive: {
    assert: (val, list) => {
      if (!(list instanceof Array)) return false
      return (list.filter( v => v === val).length < 1)
    },
    msg: val => val + ' is already taken.'
  }
}

const assert_constraints = constraints => {
  if(!constraints || typeof constraints !== 'object') 
    return false
  else return true
}

/**
 * returns the failed constraints { errors: [] } 
 * or true if valid.
 * constraints are a map of supported constraint 
 * names and values.
 * validators return true if valid,
 * false otherwise.
 */
const validate = (val, constraints=null) => {
  const errors = []
  if(!assert_constraints(constraints))
    return true
  // test each constraint
  for(const prop in constraints){
    if(validators.hasOwnProperty(prop)){
      const validator = validators[prop]
      const constraint = constraints[prop]
      if(!validator.assert(val, constraint)){
        errors.push({
          msg: validator.msg(val, constraint),
          constraint
        })
      }
    }
  }
  
  return errors.length ? {errors} : true
}

// formUtil is function utility that you
// pass node and constraints and returns
// a validateField utility
const formUtil = (node, constraints) => {
  const getInpuElement = ref => (node[ref]
    ? ReactDOM.findDOMNode(node[ref])
      .querySelector('input')
    : ReactDOM.findDOMNode(node)
      .querySelector('[name='+ref+'] input')
  )
  
  return {
    // typeof name == 'string'
    // typeof override == 'object'
    validateField(name, override=null){
      const fieldVal = getInpuElement(name).value
      if(name in constraints){
        const constraint = override || constraints[name]
        const errors = validate(fieldVal, constraint)
        
        return !!errors.error ? errors.error : false
      } else {
        return true
      }
    }
  }
}

export validate, formUtil
