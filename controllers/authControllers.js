const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const User = require('../models/UserModel');


// @ROUTE         GET api/auth
// @DESCRIPTION   check authentication
// @ACCESS        Private   
async function CheckAuthController(req, res, next) {
  try {
    const user = await User.findById(req.user.id, '-password');
    res.status(200).json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

// @ROUTE         GET api/auth/logout
// @DESCRIPTION   logout
// @ACCESS        Private
function LogOutController(req, res) {
  res.cookie('token', '', { maxAge: '-1' }).sendStatus(200);
}

// @ROUTE         POST api/auth
// @DESCRIPTION   Login user and get token
// @ACCESS        Public
async function LoginController(req, res, next) {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Email or Password is invalid. Please check again!' }] });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({ errors: [{ msg: 'Email or Password is invalid. Please check again!' }] });
    }

    const payload = {
      user: { id: user.id }
    };

    jwt.sign(payload, config.get('jwtSecret'), { expiresIn: '1h' }, (err, token) => {
      if (err) {
        throw err;
      }
      res.cookie('token', token, { httpOnly: true }).sendStatus(200);
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
}

module.exports = {
  CheckAuthController,
  LogOutController,
  LoginController
};