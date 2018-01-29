/**
 * error
 * @author mulberry
 */
import mongoose from 'mongoose'

const Schema = mongoose.Schema

/**
 * error schema
 */
const schema = new Schema({
  type: {
    type: String,
    default : '',
    trim : true
  },
  message: {
    type: String,
    default : '',
    trim : true
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
schema.path('message').required(true, 'message cannot be blank')
schema.path('type').required(true, 'type cannot be blank')

schema.statics = {
  /**
   * 添加一条日志
   * @param {object} 添加的error对象
   * @return {array} list
   */
  add (error) {
    
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

mongoose.model('error', schema)

