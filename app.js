require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { limiter } = require('./middlewares/limiter');
const { PORT, URL_MONGO } = require('./utils/config');
const cors = require('./middlewares/cors');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errorVision } = require('./middlewares/errorVision');

const app = express();

mongoose.connect(URL_MONGO, {
  useNewUrlParser: true,
});

app.use(cors);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(limiter);
app.use(helmet());
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorVision);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.listen(PORT, () => {
  console.log('Сервер работает корректно');
});
