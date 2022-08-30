const mongoose = require('mongoose');
const isUrl = require('validator/lib/isURL');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Данное поле обязательно для заполнения'],
  },
  director: {
    type: String,
    required: [true, 'Данное поле обязательно для заполнения'],
  },
  duration: {
    type: Number,
    required: [true, 'Данное поле обязательно для заполнения'],
  },
  year: {
    type: String,
    required: [true, 'Данное поле обязательно для заполнения'],
  },
  description: {
    type: String,
    required: [true, 'Данное поле обязательно для заполнения'],
  },
  image: {
    type: String,
    required: true,
    validate: [isUrl, 'Error image URL'],
  },
  trailerLink: {
    type: String,
    required: true,
    validate: [isUrl, 'error URL'],
  },
  thumbnail: {
    type: String,
    required: true,
    validate: [isUrl, 'error URL'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: [true, 'Данное поле обязательно для заполнения'],
  },
  nameEN: {
    type: String,
    required: [true, 'Данное поле обязательно для заполнения'],
  },

});

module.exports = mongoose.model('movie', movieSchema);
