/**
 * Health check service to monitor application status
 */
const os = require('os');
const db = require('./db');

/**
 * Get system information for health check
 * @returns {Object} System health information
 */
exports.getSystemInfo = () => {
  const uptime = process.uptime();
  const { rss, heapTotal, heapUsed } = process.memoryUsage();
  
  return {
    timestamp: new Date(),
    uptime: uptime,
    memory: {
      rss: `${Math.round(rss / 1024 / 1024)} MB`,
      heapTotal: `${Math.round(heapTotal / 1024 / 1024)} MB`,
      heapUsed: `${Math.round(heapUsed / 1024 / 1024)} MB`,
    },
    cpu: {
      cores: os.cpus().length,
      model: os.cpus()[0].model,
      loadAvg: os.loadavg(),
    },
    os: {
      platform: process.platform,
      release: os.release(),
      hostname: os.hostname(),
    }
  };
};

/**
 * Check database connection
 * @returns {Promise<Object>} Database health status
 */
exports.checkDatabaseConnection = async () => {
  try {
    const prisma = db.getClient();
    // Execute a simple query to check connection
    await prisma.$queryRaw`SELECT 1`;
    
    return {
      status: 'ok',
      message: 'Database connection successful',
    };
  } catch (error) {
    return {
      status: 'error',
      message: 'Database connection failed',
      error: error.message,
    };
  }
};

/**
 * Perform a comprehensive health check
 * @returns {Promise<Object>} Complete health status
 */
exports.performHealthCheck = async () => {
  const systemInfo = exports.getSystemInfo();
  const dbStatus = await exports.checkDatabaseConnection();
  
  return {
    status: dbStatus.status === 'ok' ? 'ok' : 'degraded',
    timestamp: systemInfo.timestamp,
    uptime: systemInfo.uptime,
    database: dbStatus,
    system: systemInfo
  };
};
