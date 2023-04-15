const { PORT, DB_ADDRESS } = require('./utils/constants');
const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes');
const auth = require('./middlewares/auth');
const { errors } = require('celebrate');
const { validateSignUp, validateSignIn } = require('./middlewares/validate');
const { createUser, login } = require('./controllers/users');
const errorHandler = require('./middlewares/errorHandler');
const NotFoundError = require('./errors/NotFoundError');

const app = express();
app.use(express.json());

app.post('/signup', validateSignUp, createUser); // создаёт пользователя
app.post('/signin', validateSignIn, login); // авторизирует пользователя

app.use(auth);
app.use(router);
app.use('*', (req, res, next) => next(new NotFoundError('Страница не существует.')));

// // логирование
// app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

mongoose.set('runValidators', true);
mongoose.connect(DB_ADDRESS)
  .then(() => {
    console.log('Connected to MongoDb');
    app.listen(PORT, (error) => (error ? console.error(error) : console.log(`App listening on port ${PORT}`)));
  })
  .catch((e) => console.log('Connection failed'));