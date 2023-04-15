const { celebrate, Joi } = require('celebrate');
const { url } = require('../utils/regularExpressions');

const validateSignUp = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  })
});

const validateSignIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  })
});

const validateUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  })
});

const validateDeleteMovie = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().pattern(/[a-f0-9]{24,24}/).length(24),
  })
});

const validateCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),

    image: Joi.string().required().pattern(url),
    trailerLink: Joi.string().required().pattern(url),
    thumbnail: Joi.string().required().pattern(url),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    //movieId: Joi.number().required()
  })
});

module.exports = {
  validateSignUp,
  validateSignIn,
  validateUpdateUser,
  validateDeleteMovie,
  validateCreateMovie
}