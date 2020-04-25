const express = require('express');
const { check } = require('express-validator');

const auth = require('../middleware/auth');
const {
  CreatePostController,
  GetPostController,
  GetAllPostsController,
  AddCommentController,
  LikePostController,
  UnlikePostController,
  DeletePostController,
  DeleteCommentController
} = require('../controllers/postControllers');

const router = express.Router();


// @ROUTE         GET api/posts
// @DESCRIPTION   Get all posts
// @ACCESS        Private
router.get('/', auth, GetAllPostsController);

// @ROUTE         GET api/posts/:postId
// @DESCRIPTION   Get a post by its id
// @ACCESS        Private
router.get('/:postId', auth, GetPostController);

// @ROUTE         POST api/posts
// @DESCRIPTION   Create a post
// @ACCESS        Private
router.post('/', [auth, [
  check('text', 'Text is required').not().isEmpty()
]], CreatePostController);

// @ROUTE         POST api/posts/comment/:postId
// @DESCRIPTION   Add a comment on the post
// @ACCESS        Private
router.post('/comment/:postId', [auth, [
  check('text', 'Text is required').not().isEmpty()
]], AddCommentController);

// @ROUTE         PUT api/posts/like/:postId
// @DESCRIPTION   Like a post
// @ACCESS        Private
router.put('/like/:postId', auth, LikePostController);

// @ROUTE         PUT api/posts/unlike/:postId
// @DESCRIPTION   Unlike a post
// @ACCESS        Private
router.put('/unlike/:postId', auth, UnlikePostController);

// @ROUTE         DELETE api/posts/:postId
// @DESCRIPTION   Delete a post
// @ACCESS        Private
router.delete('/:postId', auth, DeletePostController);

// @ROUTE         DELETE api/posts/comment/:postId/:commentId
// @DESCRIPTION   Delete a comment on the post
// @ACCESS        Private
router.delete('/comment/:postId/:commentId', auth, DeleteCommentController);


module.exports = router;