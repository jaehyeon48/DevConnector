const jwt = require('jsonwebtoken');
const config = require('config');
const { validationResult } = require('express-validator');

function auth(req, res, next) {
  const token = req.header('Authorization').split(' ')[1]; // extract token from 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is invalid.' });
  }
}



module.exports = auth;