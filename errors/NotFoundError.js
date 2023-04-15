const { CodeError } = require('../utils/statusCode');
// 404
class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CodeError.NOT_FOUND;
  }
}

module.exports = NotFoundError;
