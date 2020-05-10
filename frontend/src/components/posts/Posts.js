import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getAllPosts } from '../../actions/post';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import PostForm from './PostForm';

const Posts = ({
  getAllPosts,
  post: {
    posts,
    loading
  } }) => {
  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);

  return (
    loading ? <Spinner /> : (
      <React.Fragment>
        <h1 className="large text-primary">Posts</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Welcome to the community!
        </p>
        <PostForm />
        <div className="posts">
          {posts.map(post => (
            <PostItem key={post._id} post={post} />
          ))}
        </div>
      </React.Fragment>
    )
  );
};

Posts.propTypes = {
  getAllPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getAllPosts })(Posts);
