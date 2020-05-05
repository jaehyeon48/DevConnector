const { validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../models/UserModel');

// @ROUTE         POST api/users
// @DESCRIPTION   Register user
// @ACCESS        Public
async function RegisterController(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { name, email, password } = req.body;

  try {
    const isUserExist = await User.findOne({ email });

    if (!!isUserExist) {
      res.status(400).json({ errorMsg: 'user already exists.' });
    }

    const avatar = gravatar.url(email, {
      s: '200',
      r: 'pg',
      d: 'mm'
    });

    const newUser = new User({
      name,
      email,
      avatar,
      password
    });

    newUser.password = await bcrypt.hash(password, 10);

    await newUser.save();

    const payload = {
      user: { id: newUser.id }
    };

    jwt.sign(payload, config.get('jwtSecret'), { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.cookie('token', token, { httpOnly: true }).sendStatus(200);
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }

}

module.exports = {
  RegisterController
}