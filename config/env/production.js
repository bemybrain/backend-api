module.exports = {
  endpoint: '/api',
  db: process.env.OPENSHIFT_MONGODB_DB_URL + 'api',
  port: process.env.OPENSHIFT_NODEJS_PORT || 8080,
  server_ip_address: process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1',
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
