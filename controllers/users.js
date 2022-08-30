const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const EmailError = require('../errors/EmailError');
const User = require('../models/user');
const {
  notFoundUser,
  takenEmailError,
  errorDataNewUser,
  errorDataUpdateProfile,
  notFoundUserProfile,
} = require('../utils/const');

const {
  JWT_SECRET,
  JWT_TTL,
  NODE_ENV,
  DEV_JWT_SECRET,
} = require('../utils/config');

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(notFoundUser);
      }
      return res.send(user);
    })
    .catch(next);
};

const createNewUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name, email, password: hash,
      })
        .then((user) => res.send({
          name: user.name,
          email: user.email,
        }))
        .catch((err) => {
          if (err.code === 11000) {
            next(new EmailError(takenEmailError));
          } else if (err.name === 'ValidationError') {
            next(new BadRequestError(errorDataNewUser));
          } else {
            next(err);
          }
        });
    })
    .catch(next);
};

const updateProfile = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .orFail(() => next(new NotFoundError(notFoundUserProfile)))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(errorDataUpdateProfile));
      } else if (err.code === 11000) {
        next(new EmailError(takenEmailError));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : DEV_JWT_SECRET, { expiresIn: JWT_TTL });
      res.status(200).send({ token });
    })
    .catch(next);
};

module.exports = {
  getUser, createNewUser, updateProfile, login,
};
