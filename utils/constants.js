const { PORT = 3000 } = process.env;
const { DB_ADDRESS = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;
const { NODE_ENV = 'dev' } = process.env;
const PROD = 'production';
const SECRET_KEY = 'some-secret-key';

module.exports = {
  PORT, DB_ADDRESS, NODE_ENV, PROD, SECRET_KEY,
};
