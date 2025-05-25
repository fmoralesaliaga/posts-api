const swaggerJSDoc = require('swagger-jsdoc');
const config = require('../config');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Posts API',
      version: '1.0.0',
      description: 'API for managing posts',
      contact: {
        name: 'API Support',
        email: 'support@example.com',
      },
    },
    servers: [
      {
        url: `http://localhost:${config.port}${config.api.prefix}`,
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        Post: {
          type: 'object',
          required: ['name', 'description'],
          properties: {
            id: {
              type: 'integer',
              description: 'Unique identifier for the post',
              example: 1,
            },
            name: {
              type: 'string',
              description: 'Title of the post',
              example: 'My first post',
            },
            description: {
              type: 'string',
              description: 'Content of the post',
              example: 'This is my first post content',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Creation timestamp',
              example: '2023-01-01T12:00:00Z',
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  example: 'Error message',
                },
                status: {
                  type: 'integer',
                  example: 400,
                },
              },
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
