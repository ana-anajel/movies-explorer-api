const { PORT, DB_ADDRESS } = require('./config');
const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes');

//const { createUser, login } = require('./controllers/users');
const errorHandler = require('./middlewares/errorHandler');
const NotFoundError = require('./errors/NotFoundError');

const app = express();

//app.post('/signup', createUser); // создаёт пользователя

//app.post('/signin', login); // авторизирует пользователя

//app.use(auth);

app.use(router);

app.use('*', (req, res, next) => next(new NotFoundError('Страница не существует.')));

// // логирование
// app.use(errorLogger);

// // обработчик ошибок celebrate
// app.use(errors());

app.use(errorHandler);

mongoose.set('runValidators', true);
mongoose.connect(DB_ADDRESS)
  .then(() => {
    console.log('Connected to MongoDb');
    app.listen(PORT, (error) => (error ? console.error(error) : console.log(`App listening on port ${PORT}`)));
  })
  .catch((e) => console.log('Connection failed'));