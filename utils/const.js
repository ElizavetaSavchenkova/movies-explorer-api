const URL = /^https?:\/\/(www\.)?[a-zA-Z\d-]+\.[\w\d\-.~:/?#[\]@!$&'()*+,;=]{2,}#?$/;

const notFoundUser = 'Пользователь с указанным id не найден';
const takenEmailError = 'Данный email уже занят';
const errorDataNewUser = 'Введены некорректные данные для создания нового пользователя';
const errorDataUpdateProfile = 'Указаны некорректные данные при обновлении пользователя';
const notFoundUserProfile = 'Пользователь не найден. Не удалось обновить информацию';
const notFoundMovie = 'Фильм с указанным id не найден';
const errorDeleteMovie = 'Вы не можете удалять чужие фильмы';
const successfullyDeleteMovie = 'Вы успешно удалили выбранный фильм';
const errorDataMovieDelete = 'Введены некорректные данные. Не удалось удалить фильм';
const errorDataNewMovie = 'Введены неккоректные данные для создания нового фильма';
const reqAuthorization = 'Необходимо пройти авторизацию';

module.exports = {
  URL,
  notFoundUser,
  takenEmailError,
  errorDataNewUser,
  errorDataUpdateProfile,
  notFoundUserProfile,
  notFoundMovie,
  errorDeleteMovie,
  successfullyDeleteMovie,
  errorDataMovieDelete,
  errorDataNewMovie,
  reqAuthorization,
};
