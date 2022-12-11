const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const Movie = require('../models/movie');
const {
  notFoundMovie,
  errorDeleteMovie,
  successfullyDeleteMovie,
  errorDataMovieDelete,
  errorDataNewMovie,
} = require('../utils/const');

const getAllMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((movie) => {
      res.send(movie);
    })
    .catch(next);
};

const createNewMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(errorDataNewMovie));
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(() => next(new NotFoundError(notFoundMovie)))
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        return next(new ForbiddenError(errorDeleteMovie));
      }
      return movie.remove()
        .then((deletedMovie) => {
          res.status(200).send({ data: deletedMovie, message: successfullyDeleteMovie });
        }).catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError(errorDataMovieDelete));
      }
      return next(err);
    });
};

module.exports = {
  getAllMovies, createNewMovie, deleteMovie,
};
