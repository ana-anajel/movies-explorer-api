const { CodeError } = require('../utils/statusCode');
// 403
class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CodeError.FORBIDDEN;
  }
}

module.exports = ForbiddenError;
