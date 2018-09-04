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
  ref: {
    type: String,
    default: '',
    trim: true,
  },
  repository: {
    type: String,
    default: '',
    trim: true,
  },
  branch: {
    type: String,
    default: '',
    trim: true,
  },
  messages: {
    type: Array,
    default: [],
    trim: true,
  },
  modified: {
    type: Array,
    default: [],
    trim: true,
  },
  removed: {
    type: Array,
    default: [],
    trim: true,
  },
  added: {
    type: Array,
    default: [],
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
schema.path('action').required(true, 'action cannot be blank')
schema.path('ref').required(true, 'ref cannot be blank')
schema.path('repository').required(true, 'repository cannot be blank')
schema.path('messages').required(true, 'messages cannot be blank')
schema.path('modified').required(true, 'modified cannot be blank')
schema.path('removed').required(true, 'removed cannot be blank')
schema.path('added').required(true, 'added cannot be blank')

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
