const config = require('config-lite')
const mongoose = require('mongoose')


mongoose.Promise = global.Promise
mongoose.connect(config.mongodb)