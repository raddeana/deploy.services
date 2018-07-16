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
    default: '',
    trim: true
  },
  repository: {
    type: String,
    default: '',
    trim: true
  },
  comment: {
    type: String,
    default: '',
    trim: true
  },
  errorMsg: {
    type: String,
    default: '',
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
})
 
// 校验
schema.path('repository').required(true, 'repository cannot be blank')
schema.path('comment').required(true, 'comment cannot be blank')
schema.path('action').required(true, 'action cannot be blank')

schema.statics = {
 /**
  * 获取log列表
  * @param {object} options
  * @return {array} list
  */
  list (options) {
    const query = options.query || {}

    return this.find(query)
               .sort({createdAt: -1})
               .exec()
  },
}
 
export default mongoose.model('log', schema)
