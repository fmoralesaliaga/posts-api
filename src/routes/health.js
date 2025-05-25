/**
 * Health check routes
 */
const express = require('express');
const router = express.Router();
const healthController = require('../controllers/health');

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Get basic health status
 *     description: Returns basic health status of the application
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Application is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 uptime:
 *                   type: number
 *                   example: 3600.05
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 */
router.get('/', healthController.getBasicHealth);

/**
 * @swagger
 * /health/details:
 *   get:
 *     summary: Get detailed health status
 *     description: Returns detailed health status including system and database information
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Application is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                 uptime:
 *                   type: number
 *                   example: 3600.05
 *                 database:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       example: ok
 *                     message:
 *                       type: string
 *                       example: Database connection successful
 *                 system:
 *                   type: object
 *       503:
 *         description: Application is in a degraded state
 */
router.get('/details', healthController.getDetailedHealth);

module.exports = router;
