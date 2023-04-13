const movies = require('express').Router();
//const { celebrate, Joi } = require('celebrate');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
//const { url } = require('../utils/regularExpressions');

//Создайте контроллер для каждого роута.
//Защитите роуты авторизацией: если клиент не прислал JWT,
//доступ к роутам ему должен быть закрыт.

//возвращает все сохранённые текущим  пользователем фильмы
movies.get('/', getMovies);
//создаёт фильм с переданными в теле данным
movies.post('/', createMovie);
//удаляет сохранённый фильм по id
movies.delete('/movies/_id', deleteMovie);

module.exports = router;