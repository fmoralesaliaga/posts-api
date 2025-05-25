const db = require('../utils/db');

/**
 * Get all posts with optional filtering
 */
const getAllPosts = async (filters = {}) => {
  const { name } = filters;
  const whereClause = {};
  
  if (name) {
    whereClause.name = {
      contains: name,
      mode: 'insensitive'
    };
  }
  
  const prisma = db.getClient();
  const posts = await prisma.post.findMany({
    where: whereClause,
    orderBy: { createdAt: 'desc' }
  });
  
  return posts;
};

/**
 * Get a post by ID
 */
const getPostById = async (id) => {
  const prisma = db.getClient();
  const post = await prisma.post.findUnique({
    where: { id: Number(id) }
  });
  
  return post;
};

/**
 * Create a new post
 */
const createPost = async (data) => {
  const prisma = db.getClient();
  const post = await prisma.post.create({ data });
  return post;
};

/**
 * Update an existing post
 */
const updatePost = async (id, data) => {
  const prisma = db.getClient();
  const post = await prisma.post.update({
    where: { id: Number(id) },
    data
  });
  
  return post;
};

/**
 * Delete a post
 */
const deletePost = async (id) => {
  const prisma = db.getClient();
  await prisma.post.delete({
    where: { id: Number(id) }
  });
  
  return { success: true };
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
};