const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.username = validText(data.username) ? data.username : '';
  data.password = validText(data.password) ? data.password : '';

//   if (!Validator.isEmail(data.email)) {
//     errors.email = 'Email is invalid';
//   }

    if (!Validator.isLength(data.username, { min: 2, max: 20 })) {
        errors.username = 'Username must be between 2 and 20 characters';
    }
    if (Validator.isEmpty(data.username)) {
        errors.username = 'Username field is required';
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
};