const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError('Необходимо пройти авторизацию');
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    console.log(process.env.NODE_ENV);
    payload = jwt.verify(token, process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-secret');
    console.log(process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-secret');
  } catch (err) {
    next(new AuthError('Необходимо пройти авторизацию'));
    return;
  }
  req.user = payload;
  next();
};
