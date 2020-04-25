const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  text: { type: String, required: true },
  name: { type: String, required: true },
  avatar: { type: String },
  likes: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  }],
  comments: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: { type: String, required: true },
    name: { type: String, required: true },
    avatar: { type: String },
    date: { type: Date, default: Date.now }
  }],
  date: { type: Date, default: Date.now }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;