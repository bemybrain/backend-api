module.exports = {
  endpoint: '',
  db: 'mongodb://bemybrain:bmb102030@ds019956.mlab.com:19956/bemybrain',
  port: 80,
  auth: {
    password: {
      saltWorkFactor: 10
    },
    token: {
      secret: 'bemybrainsecret',
      options: {
        // expiresInMinutes: 1440
      }
    }
  }
}
