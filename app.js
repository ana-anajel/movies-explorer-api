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

// обработчик ошибки
app.use(errorHandler);




// включаем валидацию базы
mongoose.set('runValidators', true);
// соединяемся с базой
mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
}, () => {
  console.log('Connected to MongoDb');

  // Слушаем порт, подключаем апи
  app.listen(PORT, (error) => (error ? console.error(error) : console.log(`App listening on port ${PORT}`)));
});