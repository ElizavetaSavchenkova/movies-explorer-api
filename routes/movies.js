const router = require('express').Router();

const {
  getAllMovies, createNewMovie, deleteMovie,
} = require('../controllers/movies');

const {
  validateCreateMovie,
} = require('../middlewares/validate');

const auth = require('../middlewares/auth');

router.use(auth);
router.get('/', getAllMovies);
router.post('/', validateCreateMovie, createNewMovie);
router.delete('/:movieId', deleteMovie);

module.exports = router;
