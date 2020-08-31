
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

/**
 * returns the failed constraints { errors: [] } 
 * or true if valid.
 * constraints are a map of supported constraint 
 * names and values.
 * validators return true if valid,
 * false otherwise.
 */
const validate = (fieldVal, constraints=null) => {
  // test each constraint
  for(const prop in constraints){
    if(validators.hasOwnProperty(prop)){
      const validator = validators[prop]
      const constraint = constraints[prop]
      if(!validator.assert(fieldVal, constraint)){
        return {
          msg: validator.msg(fieldVal, constraint)
        }
      }
    }
  }
  // no error
  return {}
}

// formUtil is function utility that you
// pass node and constraints and returns
// a validateField utility
const elemUtil = (node, constraints=null) => {
  const getInputElement = ref => (node[ref]
    ? node[ref].querySelector('input')
    : node.parentNode
      .querySelector('[name='+ref+'] input')
  )
  
  // typeof name == 'string'
  // typeof override == 'object'
  const validateField = (name, value, override=null) => {
    const error = {}
    if(name in constraints){
      const constraint = override || constraints[name]
      Object.assign(error, validate(value, constraint))
    }
    return error
  }
  
  return {
    getInputElement,
    validateField
  }
}

export { validate, elemUtil }
