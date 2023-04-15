const mongoose = require('mongoose');
const { isURL } = require('validator');

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
    },

    director: {
      type: String,
      required: true,
    },

    duration: {
      type: Number,
      required: true,
    },

    year: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
      validate: {
        validator: (url) => isURL(url),
        message: 'Передан невалидный url адрес.',
      },
    },

    trailerLink: {
      type: String,
      required: true,
      validate: {
        validator: (url) => isURL(url),
        message: 'Передан невалидный url адрес.',
      },
    },

    thumbnail: {
      type: String,
      required: true,
      validate: {
        validator: (url) => isURL(url),
        message: 'Передан невалидный url адрес.',
      },
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },

    movieId: {
      type: mongoose.Schema.Types.Number,
      required: true,
    },

    nameRU: {
      type: String,
      required: true,
    },

    nameEN: {
      type: String,
      required: true,
    }
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('movie', movieSchema);
