/**
 * Error handling service with centralized error management
 */
const logger = require('./logger');
const { AppError } = require('../models');

/**
 * Handle operation errors (used in catch blocks)
 * @param {Error} err - The error object
 * @param {string} operation - Description of the operation that failed
 * @throws {AppError} - Rethrown error with additional context
 */
exports.handleOperationError = (err, operation) => {
  // Log the original error
  logger.error(`Error in operation: ${operation}`, {
    error: err.message,
    stack: err.stack,
    code: err.code
  });

  // If it's already our AppError, just rethrow it
  if (err instanceof AppError) {
    throw err;
  }

  // Handle Prisma specific errors
  if (err.code) {
    switch (err.code) {
      case 'P2002': // Unique constraint violation
        throw new AppError(`Duplicate entry: ${err.meta?.target?.join(', ')}`, 400);
      case 'P2025': // Record not found
        throw new AppError('Record not found', 404);
      case 'P2003': // Foreign key constraint failed
        throw new AppError('Referenced record does not exist', 400);
      case 'P2016': // Query interpretation error
        throw new AppError('Invalid query parameter', 400);
    }
  }

  // Default error handling for unexpected errors
  throw new AppError(`Operation failed: ${operation}`, 500);
};

/**
 * Format error response for client
 * @param {Error} err - Error object
 * @param {Object} req - Express request object
 * @returns {Object} Formatted error response
 */
exports.formatErrorResponse = (err, req) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  const errorResponse = {
    error: {
      message,
      status: statusCode,
      requestId: req.id,
    }
  };

  // Add validation errors if available
  if (err.errors) {
    errorResponse.error.details = err.errors;
  }

  // Add stack trace in development mode
  if (process.env.NODE_ENV === 'development') {
    errorResponse.error.stack = err.stack;
  }

  return errorResponse;
};

/**
 * Async handler to reduce try/catch boilerplate in controllers
 * @param {Function} fn - The async function to wrap
 * @returns {Function} Express middleware function
 */
exports.asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
