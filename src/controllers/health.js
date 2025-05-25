/**
 * Health check controller
 */
const healthCheck = require('../utils/healthCheck');
const { asyncHandler } = require('../utils/errorHandler');

/**
 * Get basic health status
 * @route GET /health
 */
exports.getBasicHealth = asyncHandler(async (req, res) => {
  res.status(200).json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date()
  });
});

/**
 * Get detailed health status
 * @route GET /health/details
 */
exports.getDetailedHealth = asyncHandler(async (req, res) => {
  const health = await healthCheck.performHealthCheck();
  
  // Send appropriate status code based on health
  const statusCode = health.status === 'ok' ? 200 : 503;
  res.status(statusCode).json(health);
});
