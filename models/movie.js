const mongoose = require('mongoose');
const isUrl = require('validator/lib/isURL');

const movieSchema = new mongoose.Schema({
  country: {

  },
  director: {

  },
  duration: {

  },
  year: {

  },
  description: {

  },
  image: {

  },
  trailerLink: {

  },
  thumbnail: {

  },
  owner: {

  },
  movieId: {

  },
  nameRU: {

  },
  nameEN: {

  },

});

module.exports = mongoose.model('movie', movieSchema);
