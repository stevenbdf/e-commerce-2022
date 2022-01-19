const { checkSchema } = require('express-validator');
const { countryList } = require('../../utils')

const update = checkSchema({
  name: {
    in: ['body'],
    isString: true,
    optional: true,
  },
  email: {
    in: ['body'],
    isEmail: true,
    errorMessage: 'Invalid email',
    optional: true
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
});

module.exports = {
  update
};