const app = require('./app');
const config = require('./config');
const logger = require('./utils/logger');
const db = require('./utils/db');

const PORT = config.port;

// Start the server
const server = app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT} in ${config.nodeEnv} mode`);
  logger.info(`Health check available at /health`);
  logger.info(`API documentation available at /docs`);
});

// Handle graceful shutdown
process.on('SIGTERM', gracefulShutdown('SIGTERM'));
process.on('SIGINT', gracefulShutdown('SIGINT'));

/**
 * Graceful shutdown handler
 * @param {string} signal - The signal received
 * @returns {Function} Shutdown function
 */
function gracefulShutdown(signal) {
  return async () => {
    logger.info(`Received ${signal}. Shutting down gracefully...`);
    
    // Close the server first to stop accepting new connections
    server.close(async () => {
      logger.info('HTTP server closed');
      
      try {
        // Disconnect from the database
        await db.disconnect();
        
        process.exit(0);
      } catch (error) {
        logger.error('Error during shutdown:', error);
        process.exit(1);
      }
    });
    
    // Force close if graceful shutdown fails
    setTimeout(() => {
      logger.error('Could not close connections in time, forcefully shutting down');
      process.exit(1);
    }, 10000);
  };
}