const {
  URL_MONGO = 'mongodb://localhost:27017/bitfilmsdb',
  PORT = 3000,
  JWT_SECRET,
  DEV_JWT_SECRET = 'dev-secret',
  JWT_TTL = '7d',
  NODE_ENV,
} = process.env;

module.exports = {
  URL_MONGO, PORT, JWT_SECRET, JWT_TTL, NODE_ENV, DEV_JWT_SECRET,
};
