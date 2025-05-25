const postService = require('../../src/services');
const { mockDeep } = require('jest-mock-extended');
const { PrismaClient } = require('@prisma/client');

// Mock the database module
jest.mock('../../src/utils/db', () => {
  const mockPrisma = {
    post: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    }
  };
  
  return {
    getClient: jest.fn(() => mockPrisma),
    disconnect: jest.fn()
  };
});

const db = require('../../src/utils/db');
const prisma = db.getClient();

describe('Post Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllPosts', () => {
    it('should return all posts', async () => {
      const mockPosts = [
        { id: 1, name: 'Post 1', description: 'Description 1', createdAt: new Date() },
        { id: 2, name: 'Post 2', description: 'Description 2', createdAt: new Date() }
      ];
      
      prisma.post.findMany.mockResolvedValue(mockPosts);
      
      const result = await postService.getAllPosts();
      
      expect(result).toEqual(mockPosts);
      expect(prisma.post.findMany).toHaveBeenCalledWith({
        where: {},
        orderBy: {
          createdAt: 'desc'
        }
      });
    });

    it('should filter posts by name', async () => {
      const mockPosts = [
        { id: 1, name: 'Test Post', description: 'Description', createdAt: new Date() }
      ];
      
      prisma.post.findMany.mockResolvedValue(mockPosts);
      
      const result = await postService.getAllPosts({ name: 'Test' });
      
      expect(result).toEqual(mockPosts);
      expect(prisma.post.findMany).toHaveBeenCalledWith({
        where: {
          name: {
            contains: 'Test',
            mode: 'insensitive'
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      });
    });
  });

  describe('getPostById', () => {
    it('should return a post by id', async () => {
      const mockPost = { 
        id: 1, 
        name: 'Test Post', 
        description: 'Description', 
        createdAt: new Date() 
      };
      
      prisma.post.findUnique.mockResolvedValue(mockPost);
      
      const result = await postService.getPostById(1);
      
      expect(result).toEqual(mockPost);
      expect(prisma.post.findUnique).toHaveBeenCalledWith({
        where: { id: 1 }
      });
    });

    it('should return null for non-existent post', async () => {
      prisma.post.findUnique.mockResolvedValue(null);
      
      const result = await postService.getPostById(999);
      
      expect(result).toBeNull();
    });
  });

  describe('createPost', () => {
    it('should create a new post', async () => {
      const postData = { 
        name: 'New Post', 
        description: 'New Description' 
      };
      
      const mockCreatedPost = { 
        id: 1, 
        ...postData, 
        createdAt: new Date() 
      };
      
      prisma.post.create.mockResolvedValue(mockCreatedPost);
      
      const result = await postService.createPost(postData);
      
      expect(result).toEqual(mockCreatedPost);
      expect(prisma.post.create).toHaveBeenCalledWith({
        data: postData
      });
    });
  });
});
