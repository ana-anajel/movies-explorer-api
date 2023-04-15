const users = require('express').Router();
const { getUser, updateUser } = require('../controllers/users');
const { validateUpdateUser } = require('../middlewares/validate');

// возвращает информацию о пользователе (email и имя)
users.get('/me', getUser);
//обновляет информацию о пользователе (email и имя)
users.patch('/me', validateUpdateUser, updateUser);

module.exports = users;
