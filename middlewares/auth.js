const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');
const { reqAuthorization } = require('../utils/const');
const { NODE_ENV, JWT_SECRET, DEV_JWT_SECRET } = require('../utils/config');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError(reqAuthorization);
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    console.log(NODE_ENV);
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : DEV_JWT_SECRET);
    console.log(NODE_ENV === 'production' ? JWT_SECRET : DEV_JWT_SECRET);
  } catch (err) {
    next(new AuthError(reqAuthorization));
    return;
  }
  req.user = payload;
  next();
};
