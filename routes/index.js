const router = require('express').Router();

const routerUsers = require('./users');
const routerMovies = require('./movies');
const { createNewUser, login } = require('../controllers/users');
const { validateCreateNewUser, validateUserLogin } = require('../middlewares/validate');
const NotFoundError = require('../errors/NotFoundError');
const auth = require('../middlewares/auth');

router.post('/signup', validateCreateNewUser, createNewUser);
router.post('/signin', validateUserLogin, login);

router.use(auth);
router.use('/users', routerUsers);
router.use('/movies', routerMovies);
router.use((req, res, next) => {
  next(new NotFoundError('Указанная страница не найдена'));
});

module.exports = router;
