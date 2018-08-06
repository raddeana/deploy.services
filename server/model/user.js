/**
 * 用户
 * @author steudnera
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// user
const user = new Schema({
  username: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
  },
  avatar: {
    type: String,
    trim: true,
  },
  createAt: {
    type: Date,
    default: new Date(),
  },
  updateAt: {
    type: Date,
    default: new Date(),
  },
})
 
// 校验
schema.path('username').required(true, 'username cannot be blank')
schema.path('password').required(true, 'password cannot be blank')

schema.statics = {
  /**
   * 登录
   * @author steudnera
   */
  login () {
    
  },
}

module.exports = mongoose.model('user', user)
