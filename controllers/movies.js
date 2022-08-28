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
  Movie.find({})
    .then((movies) => {
      res.send({ movies });
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
  const { movieId } = req.params;
  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(notFoundMovie);
      }
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError(errorDeleteMovie);
      } else {
        Movie.findByIdAndRemove(movieId)
          .then(() => {
            res.send(successfullyDeleteMovie);
          });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(errorDataMovieDelete));
        return;
      }
      next(err);
    });
};

module.exports = {
  getAllMovies, createNewMovie, deleteMovie,
};
