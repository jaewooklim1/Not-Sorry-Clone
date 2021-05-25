const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateRoomInput(data) {
    let errors = {};
  
    data.roomname = validText(data.roomname) ? data.roomname : '';
  
    if (!Validator.isLength(data.roomname, { min: 5, max: 30 })) {
      errors.text = 'roomname must be between 5 and 140 characters';
    }
  
    if (Validator.isEmpty(data.roomname)) {
      errors.roomname = 'Roomname field is required';
    }
  
    return {
      errors,
      isValid: Object.keys(errors).length === 0
    };
  };