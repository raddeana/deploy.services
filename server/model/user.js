/**
 * 日志
 * @author Steudnera
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// log schema
const schema = new Schema({
  username: {
    type: String,
    default: '',
    trim: true
  },
  password: {
    type: String,
    default: '',
    trim: true
  },
  role: {
    type: String,
    default: 'admin',
    trim: true
  },
})
 
// 校验
schema.path('username').required(true, 'username cannot be blank')
schema.path('password').required(true, 'password cannot be blank')

schema.statics = {
  /**
   * 重置密码
   * @author Steudnera
   */
  resetPassword () {
    
  },

  /**
   * 登录
   * @author Steudnera
   */
  login () {
    
  },
}
 
export default mongoose.model('user', schema)
