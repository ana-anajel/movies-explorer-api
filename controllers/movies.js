const Movie = require('../models/movie');
const { CodeSucces } = require('../utils/statusCode');
const BadReqestError = require('../errors/BadReqestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({ owner: req.user._id });
    return res.json(movies);
  } catch (e) {
    return next(e);
  }
};

const createMovie = async (req, res, next) => {
  try {
    const movie = await Movie.create({
      ...req.body,
      owner: req.user._id,
    });
    return res.status(CodeSucces.CREATED).json(movie);
  } catch (e) {
    if (e.name === 'ValidationError') {
      return next(new BadReqestError('Переданы некорректные данные при создании фильма.'));
    }
    return next(e);
  }
};

const deleteMovie = async (req, res, next) => {
  const { _id } = req.params;
  try {
    const movie = await Movie.findById(_id);
    if (movie === null) {
      throw new NotFoundError(`Фильм ${_id} не найден.`);
    }
    if (movie.owner.toHexString() !== req.user._id) {
      throw new ForbiddenError('Можно удалять только свои фильмы.');
    }

    await movie.deleteOne();
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
