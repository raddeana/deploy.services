/**
 * logs
 * @author mulberry
 */
import mongoose from 'mongoose'

const Schema = mongoose.Schema

/**
 * logs schema
 */
const schema = new Schema({
  type: {
    type: String,
    default: '',
    trim: true
  },
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
    default: '',
    default: '',
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
})

/**
 * 校验
 */
schema.path('type').required(true, 'type cannot be blank')

schema.statics = {
  /**
   * 添加一条日志
   * @param {object} 添加的log对象
   * @return {array} list
   */
  add (log) {

  },

  /**
   * 获取 logs 列表
   * @param {object} options
   * @return {array} list
   */
  list (options) {
    const query = options.query || {}

    return this.find(query)
      .populate('user', 'name username')
      .sort({ createdAt: -1 })
      .exec()
  },
}

mongoose.model('logs', schema)

