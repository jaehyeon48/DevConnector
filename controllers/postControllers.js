const { validationResult } = require('express-validator');

const User = require('../models/UserModel');
const Post = require('../models/PostModel');
const Profile = require('../models/ProfileModel');


// @ROUTE         GET api/posts
// @DESCRIPTION   Get all posts
// @ACCESS        Private
async function GetAllPostsController(req, res, next) {
  try {
    const posts = await Post.find().sort({ date: -1 }); // the most recent one comes first
    res.json(posts);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
}

// @ROUTE         GET api/posts/:postId
// @DESCRIPTION   Get a post by its id
// @ACCESS        Private
async function GetPostController(req, res, next) {
  try {
    const post = await Post.findById(req.params.postId).sort({ date: -1 });

    if (!post) {
      return res.status(404).json({ errorMsg: 'Post not found' });
    }

    res.json(post);
  } catch (err) {
    console.log(err.message);
    if (err.name === 'CastError') {
      return res.status(404).json({ errorMsg: 'Profile Not Found!' });
    }
    return res.status(500).send('Server Error');
  }
}

// @ROUTE         POST api/posts
// @DESCRIPTION   Create a post
// @ACCESS        Private
async function CreatePostController(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findById(req.user.id).select('-password');

    const newPost = new Post({
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id
    });

    const post = await newPost.save();

    res.json(post);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
}

// @ROUTE         POST api/posts/comment/:postId
// @DESCRIPTION   Add a comment on the post
// @ACCESS        Private
async function AddCommentController(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findById(req.user.id).select('-password');
    const post = await Post.findById(req.params.postId);

    const newComment = {
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id
    };

    post.comments.unshift(newComment);

    await post.save();

    res.json(post.comments);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
}

// @ROUTE         PUT api/posts/like/:postId
// @DESCRIPTION   Like a post
// @ACCESS        Private
async function LikePostController(req, res, next) {
  try {
    const post = await Post.findById(req.params.postId);

    // Check if the post has already been liked by the user
    if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
      return res.status(400).json({ msg: 'Post already liked' });
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
}

// @ROUTE         PUT api/posts/unlike/:postId
// @DESCRIPTION   Unlike a post
// @ACCESS        Private
async function UnlikePostController(req, res, next) {
  try {
    const post = await Post.findById(req.params.postId);

    // Check if the post has already been liked by the user
    if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
      return res.status(400).json({ msg: 'Post has not yet been liked' });
    }

    // Get remove index
    const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);

    post.likes.splice(removeIndex, 1);

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
}

// @ROUTE         DELETE api/posts/:postId
// @DESCRIPTION   Delete a post
// @ACCESS        Private
async function DeletePostController(req, res, next) {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ errorMsg: 'Post not found' });
    }

    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ errorMsg: `You're not allowed to delete this post` });
    }

    await post.remove();

    res.json({ msg: 'Post has removed' });
  } catch (err) {
    console.log(err.message);
    if (err.name === 'CastError') {
      return res.status(404).json({ errorMsg: 'Profile Not Found!' });
    }
    return res.status(500).send('Server Error');
  }
}

// @ROUTE         DELETE api/posts/comment/:postId/:commentId
// @DESCRIPTION   Delete a comment on the post
// @ACCESS        Private
async function DeleteCommentController(req, res, next) {
  try {
    const post = await Post.findById(req.params.postId);

    // Pull out comment
    const comment = post.comments.find(comment => comment.id === req.params.commentId);

    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }

    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: `You're not allowed to delete this comment` });
    }

    const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id);

    post.comments.splice(removeIndex, 1);

    await post.save();

    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
}

module.exports = {
  GetAllPostsController,
  GetPostController,
  CreatePostController,
  AddCommentController,
  LikePostController,
  UnlikePostController,
  DeletePostController,
  DeleteCommentController
}