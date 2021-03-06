const { checkSchema } = require('express-validator');
const { countryList } = require('../../utils')

const register = checkSchema({
  name: {
    in: ['body'],
    isString: true,
    errorMessage: 'Name is required'
  },
  email: {
    in: ['body'],
    isEmail: true,
    errorMessage: 'Invalid email',
  },
  phone: {
    in: ['body'],
    isNumeric: true,
    errorMessage: 'Invalid phone',
    optional: true,
  },
  country: {
    in: ['body'],
    isString: true,
    optional: true,
    custom: {
      options: (value) => {
        if (!countryList.includes(value)) {
          throw new Error('Invalid country');
        }
        return true;
      },
    }
  },
  address: {
    in: ['body'],
    isString: true,
    errorMessage: 'Invalid address',
    optional: true,
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

const login = checkSchema({
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
  register,
  login
};