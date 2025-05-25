/**
 * Database service provider to centralize Prisma client initialization
 */
// Load environment variables first
require('dotenv').config();

// Load .env.local if it exists (for local development)
const fs = require('fs');
const path = require('path');
const localEnvPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(localEnvPath)) {
  require('dotenv').config({ path: localEnvPath });
}

const { PrismaClient } = require('@prisma/client');
const logger = require('./logger');

// Implementar un singleton para conexión a la base de datos
let prisma;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  // Evitar múltiples instancias de Prisma Client durante desarrollo
  if (!global.prisma) {
    global.prisma = new PrismaClient({
      log: ['query', 'info', 'warn', 'error'],
    });
  }
  prisma = global.prisma;
}

// Log queries in development mode
if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
  prisma.$on('query', (e) => {
    logger.debug('Prisma Query', {
      query: e.query,
      params: e.params,
      duration: `${e.duration}ms`,
    });
  });
}

// Log database errors
if (process.env.NODE_ENV !== 'test') {
  prisma.$on('error', (e) => {
    logger.error('Prisma Error', {
      message: e.message,
      target: e.target,
    });
  });
}

/**
 * Get the Prisma client instance
 * @returns {PrismaClient} The Prisma client
 */
function getClient() {
  return prisma;
}

/**
 * Disconnect the Prisma client
 * @returns {Promise<void>}
 */
async function disconnect() {
  await prisma.$disconnect();
  logger.info('Database connection closed');
}

module.exports = {
  getClient,
  disconnect,
};
