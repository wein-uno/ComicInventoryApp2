const express = require('express');
const { body, validationResult } = require('express-validator');
const { addComic, editComic } = require('../controllers/comicsController');
const router = express.Router();

router.post('/',
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('number')
      .isInt({ min: 0, max: 1000001 })
      .withMessage('Number must be between 0 and 1,000,001.'),
    body('value')
      .isFloat({ min: 0, max: 10000000 })
      .withMessage('Value must be a number between 0 and 10,000,000.'),
    // You can add more validators for grade, etc.
  ],
  (req, res, next) => {
    // Check validation result
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  addComic
);

router.put('/:id',
  [
    body('title').optional().notEmpty().withMessage('Title cannot be empty'),
    body('number')
      .optional()
      .isInt({ min: 0, max: 1000001 })
      .withMessage('Number must be between 0 and 1,000,001.'),
    body('value')
      .optional()
      .isFloat({ min: 0, max: 10000000 })
      .withMessage('Value must be a number between 0 and 10,000,000.'),
  ],
  (req, res, next) => {
    // Check validation result
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  editComic
);

module.exports = router;
