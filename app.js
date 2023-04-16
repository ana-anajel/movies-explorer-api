require('dotenv').config();
const { PORT, DB_ADDRESS } = require('./utils/constants');
const { requestLogger, errorLogger } = require('./middlewares/logger');
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

app.use(requestLogger);

app.post('/signup', validateSignUp, createUser);
app.post('/signin', validateSignIn, login);

app.use(auth);
app.use(router);
app.use('*', (req, res, next) => next(new NotFoundError('Страница не существует.')));

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

mongoose.set('runValidators', true);
mongoose.connect(DB_ADDRESS)
  .then(() => {
    console.log('Connected to MongoDb');
    app.listen(PORT, (error) => (error ? console.error(error) : console.log(`App listening on port ${PORT}`)));
  })
  .catch(() => console.log('Connection failed'));