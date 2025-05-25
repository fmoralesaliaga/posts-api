const request = require('supertest');
const app = require('../../src/app');
const { PrismaClient } = require('@prisma/client');
const { mockDeep, mockReset } = require('jest-mock-extended');

// Mock Prisma client
jest.mock('@prisma/client', () => {
  const originalModule = jest.requireActual('@prisma/client');
  const mockPrismaClient = {
    post: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    $disconnect: jest.fn(),
  };
  
  return {
    __esModule: true,
    PrismaClient: jest.fn(() => mockPrismaClient),
  };
});

const prisma = new PrismaClient();

describe('Posts API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });
  describe('GET /posts', () => {
    it('should return all posts', async () => {
      const mockPosts = [
        {
          id: 1,
          name: 'Test Post',
          description: 'Test Description',
          createdAt: new Date(),
        },
      ];

      prisma.post.findMany.mockResolvedValue(mockPosts);

      const response = await request(app).get('/posts');

      expect(response.status).toBe(200);
      // Convert dates to strings for comparison since JSON serialization converts dates to strings
      expect(response.body).toEqual(mockPosts.map(post => ({
        ...post,
        createdAt: post.createdAt.toISOString()
      })));
      expect(prisma.post.findMany).toHaveBeenCalled();
    });

    it('should filter posts by name', async () => {
      const mockPosts = [
        {
          id: 1,
          name: 'Test Post',
          description: 'Test Description',
          createdAt: new Date(),
        },
      ];

      prisma.post.findMany.mockResolvedValue(mockPosts);

      const response = await request(app).get('/posts?name=Test');

      expect(response.status).toBe(200);
      // Convert dates to strings for comparison since JSON serialization converts dates to strings
      expect(response.body).toEqual(mockPosts.map(post => ({
        ...post,
        createdAt: post.createdAt.toISOString()
      })));
      expect(prisma.post.findMany).toHaveBeenCalled();
    });
  });
});
