var extend = require('util')._extend
var development = require('./env/development')
var production = require('./env/production')

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

module.exports = {
  development: extend(development),
  production: extend(production)
}[process.env.NODE_ENV]
