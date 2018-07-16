/**
 * 用户
 * @Steudnera
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const user = new Schema({
  username: String,
  password: String,
  role: String,
})

export default user
