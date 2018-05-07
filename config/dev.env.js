var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  MALL_API: '"/api/"',
  COMMON_API: '"/core/"',
  DATA_API: '"/dbcenter/"',
})
