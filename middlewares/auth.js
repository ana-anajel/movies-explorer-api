const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports = (req, res, next) => {
  let payload;
  try {
    const token = req.cookies.jwt;
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
  } catch (e) {
    next(new UnauthorizedError('Необходима авторизация.'));
    return;
  }
  req.user = payload;
  next();
};
