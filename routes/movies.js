const movies = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { validateCreateMovie, validateDeleteMovie } = require('../middlewares/validate');

// возвращает все сохранённые текущим  пользователем фильмы
movies.get('/', getMovies);
// создаёт фильм с переданными в теле данным
movies.post('/', validateCreateMovie, createMovie);
// удаляет сохранённый фильм по id
movies.delete('/:_id', validateDeleteMovie, deleteMovie);

module.exports = movies;
