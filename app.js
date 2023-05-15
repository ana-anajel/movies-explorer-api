require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const options = require('./utils/options');
const limiter = require('./middlewares/limiter');
const { PORT, DB_ADDRESS } = require('./utils/constants');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);
app.use(helmet());
app.use(cors(options));
app.use(limiter);
app.use(router);
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
