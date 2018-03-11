/**
 * mongo 入口
 * @author tmuffin
 */

const config = require('config-lite')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/deploy-logs')

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  console.info('we are connected')
})