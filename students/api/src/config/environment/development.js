module.exports = {
  mongo: {
    connection: 'mongodb://localhost:27017/students-development',
  },
  jwtSecret: 'the_secret',
  authCookieName: 'auth',
  pathToUpload: 'src/uploads',
  baseUrl: 'http://localhost:3001',
  imageSize: 512,
  domain: 'localhost',
};
