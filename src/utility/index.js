
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
  const error = []
  // test each constraint
  for(const prop in constraints){
    if(validators.hasOwnProperty(prop)){
      const validator = validators[prop]
      const constraint = constraints[prop]
      if(!validator.assert(fieldVal, constraint)){
        error.push({
          name: prop,
          msg: validator.msg(fieldVal, constraint)
        })
      }
    }
  }
  return error
}

// formUtil is function utility that you
// pass node and constraints and returns
// a validateField utility
const elemUtil = (node, constraints=null) => {
  
  const tag = 'input'
  const parent_node = node.parentNode
  
  const getInputElement = ref => {
    
    let child, parent
    if(ref == tag || !ref){
      child = node.querySelector(tag)
      parent = parent_node.querySelector(tag)
    } else {
      child = node.querySelector('[name='+ref+'] input')
      parent = parent_node.querySelector('[name='+ref+'] input')
    }
  
    return child ? child
      : parent ? parent
        : parent_node.querySelector('[name='+ref+'] input')
  }
  
  const getInputElementAll = ref => {
    
    const children = node.querySelectorAll(tag)
    const parents = parent_node.querySelectorAll(tag)
    
    return children.length ? children
      : parents.length ? parents
        : parent_node.querySelectorAll(ref ? ref : tag)
    
  }
  
  // typeof name == 'string'
  // typeof override == 'object'
  // returns array of msg objects
  const validateField = (name, value, override=null) => {
    let error = []
    name = name.toLowerCase()
    if(name in constraints){
      const constraint = override || constraints[name]
      error = validate(value, constraint)
    }
    return error
  }
  
  return {
    getInputElementAll,
    getInputElement,
    validateField
  }
}

export { validate, elemUtil }
