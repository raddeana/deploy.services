/**
 * log
 * @author mulberry
 */
import mongoose from 'mongoose'

const Schema = mongoose.Schema

/**
 * log schema
 */
const schema = new Schema({
  commit: {
    type: Schema.ObjectId,
    ref : 'commit'
  },
  error: {
    type: Schema.ObjectId,
    ref : 'error'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updateAt: {
    type: Date,
    default: Date.now
  },
})

/**
 * 校验
 */
schema.path('commit').required(true, 'commit cannot be blank')
schema.path('createdAt').required(true, 'createdAt cannot be blank')

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

mongoose.model('log', schema)

