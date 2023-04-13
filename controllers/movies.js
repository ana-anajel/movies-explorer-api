const Movie = require('../models/movie');
const { CodeSucces } = require('../statusCode');
const BadReqestError = require('../errors/BadReqestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

//*
const getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({});
    return res.json(movies);
  } catch (e) {
    console.log(e);
    return next(e);
  }
};

const createMovie = async (req, res, next) => {
  try {
    const owner = req.user._id;
    const {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailer,//*
      thumbnail,
      movieId,
      nameRU,
      nameEN,
    } = req.body;

    const movie = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailer,//*
      thumbnail,
      movieId,
      nameRU,
      nameEN,
      owner
    });
    return res.status(CodeSucces.CREATED).json(movie);
  } catch (e) {
    if (e.name === 'ValidationError') {
      return next(new BadReqestError('Переданы некорректные данные при создании фильма.'));
    }
    console.log(e);
    return next(e);
  }
};

const deleteMovie = async (req, res, next) => {
  const { _id } = req.params;
  const admin = req.user._id;
  try {
    const movie = await Movie.findById(_id);
    if (movie === null) {
      throw new NotFoundError(`Фильм ${_id} не найден.`);
    }
    const owner = movie.owner.toHexString();

    if (owner !== admin) {
      throw new ForbiddenError('Можно удалять только свои фильмы.');
    }

    await Movie.findByIdAndRemove(_id);
    return res.send({ message: `Фильм ${_id} удалён.` });
  } catch (e) {
    console.log(e);
    if (e.name === 'CastError') {
      return next(new BadReqestError('Передан некорректный id фильма.'));
    }
    return next(e);
  }
};

module.exports = { getMovies, createMovie, deleteMovie };
