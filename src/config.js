/**
 * Application configuration
 */
require('dotenv').config();

// Load .env.local if it exists (for local development)
const fs = require('fs');
const path = require('path');
const localEnvPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(localEnvPath)) {
  require('dotenv').config({ path: localEnvPath });
}

const config = {
  port: process.env.PORT || 3001,
  nodeEnv: process.env.NODE_ENV || 'development',
  db: {
    url: process.env.DATABASE_URL
  },
  api: {
    prefix: process.env.API_PREFIX || '',
  },
  cors: {
    origin: process.env.CORS_ORIGIN || '*'
  }
};

module.exports = config;