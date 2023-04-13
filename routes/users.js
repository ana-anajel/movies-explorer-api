const users = require('express').Router();
//const { celebrate, Joi } = require('celebrate');
const { getUser, updateUser } = require('../controllers/users');
//const { url, id } = require('../utils/regularExpressions');

//Создайте контроллер для каждого роута.
//Защитите роуты авторизацией: если клиент не прислал JWT,
//доступ к роутам ему должен быть закрыт.

// возвращает информацию о пользователе (email и имя)GET /users/me
users.get('/me', getUser);
//обновляет информацию о пользователе (email и имя)
users.patch('/me', updateUser);

module.exports = router;
