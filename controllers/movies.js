const Movie = require('../models/movie');
// const { CodeSucces } = require('../statusCode');
// const BadReqestError = require('../errors/BadReqestError');
// const NotFoundError = require('../errors/NotFoundError');
// const ForbiddenError = require('../errors/ForbiddenError');

//*
const getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({});
    return res.json(movies);
  } catch (e) {
    console.log(e);
    //return next(e);
  }
};

const createMovie = async (req, res, next) => {
  try {
    const owner = req.user._id;
    const { country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId } = req.body;

    const card = await Card.create({ name, link, owner });
    return res.status(CodeSucces.CREATED).json(card);
  } catch (e) {
    if (e.name === 'ValidationError') {
      return next(new BadReqestError('Переданы некорректные данные при создании карточки.'));
    }
    return next(e);
  }
};

const deleteMovie = async (req, res, next) => {
  const { cardId } = req.params;
  const admin = req.user._id;
  try {
    const card = await Card.findById(cardId);
    if (card === null) {
      throw new NotFoundError(`Карточка ${cardId} не найдена.`);
    }

    const owner = card.owner.toHexString();

    if (owner !== admin) {
      throw new ForbiddenError('Можно удалять только свои карточки.');
    }

    await Card.findByIdAndRemove(cardId);
    return res.send({ message: `Карточка ${cardId} удалена.` });
  } catch (e) {
    if (e.name === 'CastError') {
      return next(new BadReqestError('Передан некорректный id карточки.'));
    }
    return next(e);
  }
};

module.exports = { getMovies, createMovie, deleteMovie };
