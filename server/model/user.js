/**
 * 日志
 * @author Steudnera
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// log schema
const schema = new Schema({
  action: {
    type: String,
    trim: true,
  },
  result: {
    type: String,
    trim: true,
  },
  message: {
    type: String,
    trim: true,
  },
  createDate: {
    type: Date,
    default: new Date(),
  },
})
 
// 校验
schema.path('action').required(true, 'action cannot be blank')
schema.path('result').required(true, 'result cannot be blank')
schema.path('message').required(true, 'message cannot be blank')

schema.statics = {
  /**
   * 日志列表
   * @author Steudnera
   */
  getLogList () {
    
  },

  /**
   * 添加日志
   * @author Steudnera
   */
  addLog (log) {
    
  },
}

module.exports = mongoose.model('log', log)
