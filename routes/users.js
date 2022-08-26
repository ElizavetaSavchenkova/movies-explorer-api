const router = require('express').Router();

const {
  getUser, updateProfile,
} = require('../controllers/users');

router.get('/me', getUser) //возвращает информацию о пользователе
router.patch('/me', updateProfile) //обновляает информацию о пользователе

module.exports = router;
