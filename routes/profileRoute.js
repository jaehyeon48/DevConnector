const express = require('express');
const { check } = require('express-validator');

const auth = require('../middleware/auth');
const {
  GetMyProfileController,
  GetAllProfileController,
  GetUserProfileController,
  GetGithubRepo,
  CreateProfileController,
  AddExperienceController,
  AddEducationController,
  UpdateProfileController,
  DeleteProfileAndUserController,
  DeleteExperienceController,
  DeleteEducationController
} = require('../controllers/profileControllers');

const router = express.Router();


// @ROUTE         GET api/profile/me
// @DESCRIPTION   Get current users profile
// @ACCESS        Private
router.get('/me', auth, GetMyProfileController);

// @ROUTE         GET api/profile
// @DESCRIPTION   Get all profiles
// @ACCESS        Public
router.get('/', GetAllProfileController);

// @ROUTE         GET api/profile/user/:userId
// @DESCRIPTION   Get a profile by user ID
// @ACCESS        Public
router.get('/user/:userId', GetUserProfileController);

// @ROUTE         GET api/profile/github/:username
// @DESCRIPTION   Get user's repo from Github
// @ACCESS        Public
router.get('/github/:username', GetGithubRepo);

// @ROUTE         POST api/profile
// @DESCRIPTION   Create user profile
// @ACCESS        Private
router.post('/', [auth, [
  check('status', 'Status is required').not().isEmpty(),
  check('skills', 'Skills is required').not().isEmpty()
]], CreateProfileController);

// @ROUTE         PUT api/profile/experience
// @DESCRIPTION   Add profile experience
// @ACCESS        Private
router.put('/experience', [auth, [
  check('title', 'Title is required').not().isEmpty(),
  check('company', 'Company is required').not().isEmpty(),
  check('from', 'From date is required').not().isEmpty()
]], AddExperienceController);

// @ROUTE         PUT api/profile/education
// @DESCRIPTION   Add profile education
// @ACCESS        Private
router.put('/education', [auth, [
  check('school', 'School is required').not().isEmpty(),
  check('degree', 'Degree is required').not().isEmpty(),
  check('fieldofstudy', 'Field of study is required').not().isEmpty(),
  check('from', 'From is required').not().isEmpty()

]], AddEducationController);

// @ROUTE         PATCH api/profile/:profileId
// @DESCRIPTION   Update user's profile
// @ACCESS        Private
router.patch('/:profileId', [auth, [
  check('status', 'Status is required').not().isEmpty(),
  check('skills', 'Skills is required').not().isEmpty()
]], UpdateProfileController);

// @ROUTE         DELETE api/profile
// @DESCRIPTION   Delete user and user's profile
// @ACCESS        Private
router.delete('/', auth, DeleteProfileAndUserController);

// @ROUTE         DELETE api/profile/experience/:experienceId
// @DESCRIPTION   Delete an experience from profile
// @ACCESS        Private
router.delete('/experience/:experienceId', auth, DeleteExperienceController);

// @ROUTE         DELETE api/profile/experience/:educationId
// @DESCRIPTION   Delete an education from profile
// @ACCESS        Private
router.delete('/experience/:experienceId', auth, DeleteEducationController);

module.exports = router;