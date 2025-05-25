const postService = require('../services');
const { BadRequestError, NotFoundError } = require('../models');
const { asyncHandler } = require('../utils/errorHandler');
const { postSchema, idParamSchema, nameFilterSchema } = require('../utils/validationSchemas');

/**
 * Validation rules for post creation/update
 */
exports.validatePost = postSchema;

/**
 * Validation rules for ID parameter
 */
exports.validateId = idParamSchema;

/**
 * Validation rules for name filter
 */
exports.validateNameFilter = nameFilterSchema;

/**
 * Get all posts with optional filtering
 * @route GET /posts
 */
exports.getAll = asyncHandler(async (req, res) => {
  const { name } = req.query;
  const posts = await postService.getAllPosts({ name });
  res.json(posts);
});

/**
 * Get a post by ID
 * @route GET /posts/:id
 */
exports.getById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const post = await postService.getPostById(id);
  
  if (!post) {
    throw new NotFoundError(`Post with id ${id} not found`);
  }
  
  res.json(post);
});

/**
 * Create a new post
 * @route POST /posts
 */
exports.create = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  
  const post = await postService.createPost({
    name,
    description
  });
  
  res.status(201).json(post);
});

/**
 * Update a post
 * @route PUT /posts/:id
 */
exports.update = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  
  const existingPost = await postService.getPostById(id);
  if (!existingPost) {
    throw new NotFoundError(`Post with id ${id} not found`);
  }
  
  const updatedPost = await postService.updatePost(id, {
    name,
    description
  });
  
  res.json(updatedPost);
});

/**
 * Delete a post
 * @route DELETE /posts/:id
 */
exports.remove = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  const existingPost = await postService.getPostById(id);
  if (!existingPost) {
    throw new NotFoundError(`Post with id ${id} not found`);
  }
  
  await postService.deletePost(id);
  
  res.status(204).send();
});
