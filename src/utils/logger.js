const { createLogger, format, transports } = require('winston');
const config = require('../config');

const { combine, timestamp, printf, colorize, json } = format;

// Custom log format
const consoleFormat = printf(({ level, message, timestamp, ...meta }) => {
  const metaString = Object.keys(meta).length ? JSON.stringify(meta, null, 2) : '';
  return `${timestamp} [${level}]: ${message} ${metaString}`;
});

// Create logger
const logger = createLogger({
  level: config.nodeEnv === 'production' ? 'info' : 'debug',
  format: combine(
    timestamp(),
    config.nodeEnv === 'production' ? json() : combine(colorize(), consoleFormat)
  ),
  transports: [
    new transports.Console(),
  ],
  exitOnError: false,
});

// Stream for Morgan middleware
logger.stream = {
  write: (message) => logger.info(message.trim()),
};

module.exports = logger;
