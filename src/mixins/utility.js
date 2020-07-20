import ReactDOM from 'react-dom'

/**
 * returns the failed constraints { errors: [] } 
 * or true if valid.
 * constraints are a map of supported constraint 
 * names and values.
 * validators return true if valid,
 * false otherwise.
 */
export function validate(val, constraints){
  const errors = []
  const validators = {
    minLength: {
      fn: (val, cVal) => (typeof val == 'string' && val.length >= cVal),
      msg: (val, cVal) => 'minimum ' + cVal + ' characters'
    },
    required: {
      fn: val => (typeof val == 'string' 
        ? !/^\s*$/.test(val)
        : val !== undefined && val !== null
      ),
      msg: () => 'required field'
    },
    exclusive: {
      fn: (val, list) => {
        if (!(list instanceof Array)) return false
        return (list.filter( v => v === val).length < 1)
      },
      msg: val => val + ' is already taken.'
    }
  }
  
  if(!constraints || typeof constraints !== 'object') return true
  
  // test each constraint
  for(const constraint in constraints){
    let validator, cConstraint
    if(validators.hasOwnProperty(constraint)){
      validator = validators[constraint]
      cConstraint = constraints[constraint]
      if(!validator.fn(val, cConstraint)){
        errors.push({
          constraint: constraint, 
          msg: validator.msg(val, cConstraint)
        })
      }
    }
  }
  
  return errors.length ? {errors: errors} : true
}
// end validate function


// the mixin
export const formMixins = {
  getInpuEle: function(ref){
    return this.refs[ref] 
      ? ReactDOM.findDOMNode(this.refs[ref])
        .querySelector('input')
      : ReactDOM.findDOMNode(this)
        .querySelector('[name='+ref+'] input')
  },
  validateField: function(fieldName, constraintOverride){
    const fieldVal = this.getInpuEle(fieldName).value
    let cConstraint, errors
    if(fieldName in this.constraints){
      cConstraint = constraintOverride || this.constraints[fieldName]
      errors = validate(fieldVal, cConstraint)
      return !!errors.error ? errors.error : false
    } else {
      return true
    }
  }
}
