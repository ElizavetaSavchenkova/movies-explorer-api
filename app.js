require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { createNewUser, login } = require('./controllers/users');
const { errorVision } = require('./middlewares/errorVision');

const auth = require('./middlewares/auth');
const cors = require('./middlewares/cors');
const { validateCreateNewUser, validateUserLogin } = require('./middlewares/validate');

//const NotFoundError = require('./errors/NotFoundError');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
});

app.use(cors);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

const routerUsers = require('./routes/users');
//const routerMovies = require('./routes/movies');

app.post('/signup', validateCreateNewUser, createNewUser); //создание нового пользователя
app.post('/signin', validateUserLogin, login)  //- логин пользователя
app.use('/users', auth, routerUsers);
//app.use('/movies', auth, routerCards);

app.use((req, res) => {
  res.status(404).send({ message: 'Страница не обнаружена' });
});
//ПОПРАВЬ ЭТУ СТРОКУ . НЕ ЗАБУДЬ

app.use(errorLogger);
app.use(errors());
app.use(errorVision);

app.listen(PORT, () => {
  console.log('Сервер работает корректно');
});
