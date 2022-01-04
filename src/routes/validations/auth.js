const { checkSchema } = require('express-validator');

const register = checkSchema({
  email: {
    in: ['body'],
    isEmail: true,
    errorMessage: 'Invalid email',
  },
  password: {
    in: ['body'],
    isLength: {
      options: { min: 6 },
      errorMessage: 'Password must be at least 6 characters long',
    },
    errorMessage: 'Invalid password',
  },
});

module.exports = {
  register
};