/**
 * commit
 * @author mulberry
 */
import mongoose from 'mongoose'

const Schema = mongoose.Schema

/**
 * commit schema
 */
const schema = new Schema({
  repository: {
    type: String,
    default: '' 
  },
  author: {
    type: String,
    default: '' 
  },
  committer: {
    type: String,
    default: ''
  },
  sha: {
    type: String,
    default: '' 
  },
  modified: [String],
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
schema.path('sha').required(true, 'sha cannot be blank')
schema.path('repository').required(true, 'repository cannot be blank')
schema.path('modified').required(true, 'modified cannot be blank')
schema.path('createdAt').required(true, 'createdAt cannot be blank')
schema.path('updateAt').required(true, 'updateAt cannot be blank')

schema.statics = {
  /**
   * 添加一条日志
   * @param {object} 添加的commit对象
   * @return {array} list
   */
  add (commit) {
    
  },

  /**
   * 获取 commits 列表
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

mongoose.model('commit', schema)

