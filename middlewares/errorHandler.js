const { CodeError } = require('../statusCode');

const errorHandler = (err, req, res, next) => {
  const { statusCode = CodeError.SERVER_ERROR, message } = err;
  res.status(statusCode).send({
    message: statusCode === CodeError.SERVER_ERROR
      ? 'На сервере произошла ошибка'
      : message,
  });
  next();
};

module.exports = errorHandler;
