/**
 * Validation schemas for API endpoints
 */
const { check } = require('express-validator');

/**
 * Common validation schema for Post entity
 */
const postSchema = [
  check('name')
    .not().isEmpty().withMessage('Name is required')
    .trim()
    .isLength({ min: 3 }).withMessage('Name must be at least 3 characters')
    .isLength({ max: 100 }).withMessage('Name must be less than 100 characters'),
  
  check('description')
    .not().isEmpty().withMessage('Description is required')
    .trim()
    .isLength({ min: 5 }).withMessage('Description must be at least 5 characters')
    .isLength({ max: 1000 }).withMessage('Description must be less than 1000 characters')
];

/**
 * ID Parameter validation 
 */
const idParamSchema = [
  check('id')
    .isNumeric().withMessage('ID must be a number')
    .toInt()
];

/**
 * Validation for filtering posts by name
 */
const nameFilterSchema = [
  check('name')
    .optional()
    .isString().withMessage('Name filter must be a string')
    .trim()
];

module.exports = {
  postSchema,
  idParamSchema,
  nameFilterSchema
};
