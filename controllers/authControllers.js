const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const User = require('../models/UserModel');


// @ROUTE         GET api/auth
// @DESCRIPTION   Testing authentication
// @ACCESS        Private   
async function TestAuthController(req, res, next) {
  try {
    const user = await User.findById(req.user.id, '-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
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

    jwt.sign(payload, config.get('jwtSecret'), { expiresIn: '20h' }, (err, token) => {
      if (err) {
        throw err;
      }
      res.json({ token });
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
}

module.exports = {
  TestAuthController,
  LoginController
};