const allowedCors = [
  'http://localhost:3000',
  'https://localhost:3000',
  'http://localhost:3001',
  'https://localhost:3001',
  'https://moviesexplorer.dipl.nomoredomains.sbs',
  'http://moviesexplorer.dipl.nomoredomains.sbs',
  'https://api.moviesexplorer.dipl.nomoredomains.sbs/profile',
  'https://moviesexplorer.dipl.nomoredomains.sbs/saved-movies',
  'https://moviesexplorer.dipl.nomoredomains.sbs/movies',
  'https://moviesexplorer.dipl.nomoredomains.sbs/signup',
  'https://moviesexplorer.dipl.nomoredomains.sbs/signin',
  'https://moviesexplorer.dipl.nomoredomains.sbs/profile',

];

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  const requestHeaders = req.headers['access-control-request-headers'];
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  return next();
};
