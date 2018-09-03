/**
 * 日志
 * @author Philip
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// log schema
const schema = new Schema({
  action: {
    type: String,
    default: '',
    trim: true,
  },
  repository: {
    type: String,
    default: '',
    trim: true,
  },
  messages: {
    type: Array,
    default: '',
    trim: true,
  },
  modified: {
    type: Array,
    default: '',
    trim: true,
  },
  removed: {
    type: Array,
    default: '',
    trim: true,
  },
  added: {
    type: Array,
    default: '',
    trim: true,
  },
  errorMsg: {
    type: String,
    default: '',
    trim: true,
  },
  result: { 
    type: Schema.Types.ObjectId, 
    ref: 'result' 
  },
})
 
// 校验
schema.path('action').required(true, 'repository cannot be blank')
schema.path('repository').required(true, 'repository cannot be blank')
schema.path('comment').required(true, 'comment cannot be blank')
schema.path('result').required(true, 'result cannot be blank')

schema.statics = {
 /**
  * 获取log列表
  * @param {object} options
  * @return {array} list
  */
  async list (options) {
    const query = options.query || {}

    return await this.find(query)
                     .sort({ createdAt: -1 })
                     .exec()
  },
  
  /**
   * 添加日志
   * @param {object} log 对象
   * @return {array} list
   */
  async create (log) {
    const logEntity = new this.model('log', log)
    return await logEntity.save()
  },
}
 
module.exports = mongoose.model('log', schema)
