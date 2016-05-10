module.exports = {
  endpoint: '/api',
  db: 'mongodb://localhost/bemybrain-api',
  port: 3000,
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
