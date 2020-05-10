const axios = require('axios');
const config = require('config');

const { validationResult } = require('express-validator');

const User = require('../models/UserModel');
const Profile = require('../models/ProfileModel');
const Post = require('../models/PostModel');

// @ROUTE         GET api/profile/me
// @DESCRIPTION   Get current users profile
// @ACCESS        Private
async function GetMyProfileController(req, res, next) {
  try {
    const profile = await Profile.findOne({ user: req.user.id })
      .populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user.' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
}

// @ROUTE         GET api/profile
// @DESCRIPTION   Get all profiles
// @ACCESS        Public
async function GetAllProfileController(req, res, next) {
  try {
    const profiles = await Profile.find().populate('user');
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
}

// @ROUTE         GET api/profile/user/:userId
// @DESCRIPTION   Get a profile by user ID
// @ACCESS        Public
async function GetUserProfileController(req, res, next) {
  try {
    const userId = req.params.userId;
    const profile = await Profile.findOne({ user: userId }).populate('user', ['firstName', 'lastName', 'avatar']);

    if (!profile) {
      return res.status(400).json({ errorMsg: 'Profile Not Found!' });
    }

    res.send(profile);
  } catch (err) {
    console.log(err.message);
    if (err.name === 'CastError') {
      return res.status(404).json({ errorMsg: 'Profile Not Found!' });
    }
    return res.status(500).send('Server Error');
  }
}

// @ROUTE         GET api/profile/github/:username
// @DESCRIPTION   Get user's repo from Github
// @ACCESS        Public
async function GetGithubRepo(req, res, next) {
  try {
    const headers = {
      'user-agent': 'node.js',
      Authorization: `token ${config.get('githubToken')}`
    };

    const response = await axios.get(encodeURI(
      `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
    ), { headers });

    res.json(response.data);
  } catch (err) {
    console.error(err.message);
    if (err.message === 'Request failed with status code 404') {
      return res.status(404).json({ errorMsg: 'No Github profile found!' });
    }
    return res.status(500).send('Server Error');
  }
}

// @ROUTE         POST api/profile
// @DESCRIPTION   Create user profile
// @ACCESS        Private
async function CreateProfileController(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const profileData = {
    company,
    website,
    location,
    bio,
    status,
    githubusername,
    skills,
    youtube,
    facebook,
    twitter,
    instagram,
    linkedin
  } = req.body;

  const personalFields = ['company', 'website', 'location', 'bio', 'status', 'githubusername'];
  const socialFields = ['youtube', 'twitter', 'facebook', 'linkedin', 'instagram'];

  // Build profile object
  const profileFields = { user: req.user.id };

  personalFields.forEach(field => {
    if (profileData[field]) {
      profileFields[field] = profileData[field];
    }
  });

  if (skills) {
    profileFields.skills = skills.split(',').map(skill => skill.trim());
  }

  // Build social object
  profileFields.social = {};

  socialFields.forEach(field => {
    if (profileData[field]) {
      profileFields.social[field] = profileData[field];
    }
  });

  try {
    const profile = new Profile(profileFields);

    await profile.save();
    return res.json(profile);
  } catch (err) {
    console.error('Server Error', 500);
    return res.status(500).send('Server Error');
  }
}

// @ROUTE         PUT api/profile/experience
// @DESCRIPTION   Add profile experience
// @ACCESS        Private
async function AddExperienceController(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const experienceData = {
    title,
    company,
    location,
    from,
    to,
    current,
    description
  } = req.body;

  try {
    const profile = await Profile.findOne({ user: req.user.id });

    if (!profile) {
      return res.status(400).json({ errorMsg: 'Cannot find a profile!' });
    }

    profile.experience.unshift(experienceData);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
}

// @ROUTE         PUT api/profile/education
// @DESCRIPTION   Add profile education
// @ACCESS        Private
async function AddEducationController(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const educationData = {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description
  } = req.body;

  try {
    const profile = await Profile.findOne({ user: req.user.id });

    if (!profile) {
      return res.status(400).json({ errorMsg: 'Cannot find a profile!' });
    }

    profile.education.unshift(educationData);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
}

// @ROUTE         PATCH api/profile/:profileId
// @DESCRIPTION   Update user's profile
// @ACCESS        Private
async function UpdateProfileController(req, res, next) {
  const updatePlaceId = req.params.profileId;
  try {
    let profile = await Profile.findById(updatePlaceId);

    if (!profile) {
      return res.status(404).json({ msg: 'Cannot find the profile.' });
    }

    if (profile.user.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'You are not allowed to update this profile.' });
    }

    // check if the required data is sent

    const errors = [];

    if (!req.body.status || !req.body.status.trim()) {
      errors.push('Status is required.');
    }

    if (!req.body.skills || !req.body.skills.trim()) {
      errors.push('Skills is required.');
    }

    if (!req.body.bio || !req.body.bio.trim()) {
      errors.push('Bio is required.');
    }

    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    const profileData = {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin
    } = req.body;



    const personalFields = ['company', 'website', 'location', 'bio', 'status', 'githubusername'];
    const socialFields = ['youtube', 'twitter', 'facebook', 'linkedin', 'instagram'];

    personalFields.forEach(field => profile[field] = profileData[field]);

    if (skills) {
      profile.skills = skills.split(',').map(skill => skill.trim());
    }

    socialFields.forEach(field => {
      if (profileData[field]) {
        profile.social[field] = profileData[field];
      }
    });

    const updatedProfile = await Profile.findByIdAndUpdate(updatePlaceId, profile, { new: true })

    res.status(201).send(updatedProfile);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
}

// @ROUTE         PATCH api/profile/experience/:experienceId
// @DESCRIPTION   Update experience
// @ACCESS        Private
async function UpdateExperienceController(req, res, next) {
  const experienceId = req.params.experienceId;
  const userId = req.user.id;

  try {
    const profile = await Profile.findOne({ user: userId });

    if (!profile) {
      return res.status(404).json({ msg: 'Cannot find the profile.' });
    }

    const experience = profile.experience.find(exp => exp.id === experienceId);

    if (!experience) {
      return res.status(404).json({ msg: 'The experience does not exist.' });
    }

    const errors = [];

    if (!req.body.title || !req.body.title.trim()) {
      errors.push('Job title is required.');
    }

    if (!req.body.company || !req.body.company.trim()) {
      errors.push('Company is required.');
    }

    if (!req.body.from) {
      errors.push('From date is required.');
    }

    if (req.body.current === false && !req.body.to) {
      errors.push('To date is required.');
    }

    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    const experienceData = {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    } = req.body;


    const expFields = ['title', 'company', 'location', 'from', 'to', 'current', 'description'];

    expFields.forEach(field => {
      experience[field] = experienceData[field];
    });
    await profile.save();

    res.json(profile);
  } catch (err) {
    console.log(err);
    return res.status(500).send('Server Error');
  }
}

// @ROUTE         PATCH api/profile/education/:educationId
// @DESCRIPTION   Update education
// @ACCESS        Private
async function UpdateEducationController(req, res, next) {
  const educationId = req.params.educationId;
  const userId = req.user.id;

  try {
    const profile = await Profile.findOne({ user: userId });

    if (!profile) {
      return res.status(404).json({ msg: 'Cannot find the profile.' });
    }

    const education = profile.education.find(edu => edu.id === educationId);

    if (!education) {
      return res.status(404).json({ msg: 'The education does not exist.' });
    }

    const errors = [];

    if (!req.body.school || !req.body.school.trim()) {
      errors.push('School (or boot camp) is required.');
    }

    if (!req.body.degree || !req.body.degree.trim()) {
      errors.push('Degree (or certificate) is required.');
    }

    if (!req.body.fieldofstudy || !req.body.fieldofstudy.trim()) {
      errors.push('Field of study is required.');
    }

    if (!req.body.from) {
      errors.push('From date is required.');
    }

    if (req.body.current === false && !req.body.to) {
      errors.push('To date is required.');
    }

    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    const educationData = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    } = req.body;

    const eduFields = ['school', 'degree', 'fieldofstudy', 'from', 'to', 'current', 'description'];

    eduFields.forEach(field => {
      education[field] = educationData[field];
    });
    await profile.save();

    res.json(profile);
  } catch (err) {
    console.log(err);
    return res.status(500).send('Server Error');
  }
}

// @ROUTE         DELETE api/profile
// @DESCRIPTION   Delete user and user's profile
// @ACCESS        Private
async function DeleteProfileAndUserController(req, res, next) {
  try {
    await Post.deleteMany({ user: req.user.id });
    await Profile.findOneAndRemove({ user: req.user.id });
    await User.findByIdAndRemove({ _id: req.user.id });

    res.cookie('token', '', { maxAge: '-1' });
    res.json({ message: 'User has deleted!' });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
}

// @ROUTE         DELETE api/profile/experience/:experienceId
// @DESCRIPTION   Delete an experience from profile
// @ACCESS        Private
async function DeleteExperienceController(req, res, next) {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    if (!profile) {
      return res.status(400).json({ errorMsg: 'Cannot find a profile!' });
    }

    const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.experienceId);

    profile.experience.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
}

// @ROUTE         DELETE api/profile/experience/:educationId
// @DESCRIPTION   Delete an education from profile
// @ACCESS        Private
async function DeleteEducationController(req, res, next) {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    if (!profile) {
      return res.status(400).json({ errorMsg: 'Cannot find a profile!' });
    }

    const removeIndex = profile.education.map(item => item.id).indexOf(req.params.educationId);

    profile.education.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
}

module.exports = {
  GetMyProfileController,
  GetAllProfileController,
  GetUserProfileController,
  GetGithubRepo,
  CreateProfileController,
  AddExperienceController,
  AddEducationController,
  UpdateProfileController,
  UpdateExperienceController,
  UpdateEducationController,
  DeleteProfileAndUserController,
  DeleteExperienceController,
  DeleteEducationController
}