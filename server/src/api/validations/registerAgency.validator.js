const { body, validationResult } = require('express-validator');

// Middleware for validating and sanitizing input
const validateRegisterAgency = [
  // Validate fullname
  body('fullname')
    .trim()
    .notEmpty()
    .withMessage('Fullname is required')
    .isLength({ min: 4 })
    .withMessage('Fullname must be at least 4 characters long'),

    // Validate Phone
  body('phone')
  .trim()
  .notEmpty()
  .withMessage('Phone is required')
  .isLength({ min: 10 })
  .withMessage('Phone must be at least 10 characters long'),

  // Validate Email
  body('email')
  .trim()
  .notEmpty()
  .withMessage('Email is required')
  .isEmail()
  .withMessage('Invalid email address. Please try again.'),

  // Validate Address
  body('addresse')
  .trim()
  .notEmpty()
  .withMessage('Addresse is required')
  .isLength({ min: 10 })
  .withMessage('Addresse must be at least 10 characters long'),

  // Validate password
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),

  // Sanitize inputs
  body('*').escape(),

  // Handle validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = validateRegisterAgency;
