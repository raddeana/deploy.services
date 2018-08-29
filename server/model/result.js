/**
 * 结果
 * @author Philip
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// result schema
const schema = new Schema({
  code: {
    type: Number,
    trim: true,
  },
  message: {
    type: String,
    trim: true,
  },
  retry: {
    type: Number,
    default: 0,
    trim: true,
  },
})
 
// 校验
schema.path('code').required(true, 'code cannot be blank')
schema.path('message').required(true, 'message cannot be blank')
schema.path('retry').required(true, 'retry cannot be blank')

schema.statics = {  
  /**
   * 添加部署结果
   * @param {object} 部署结果对象
   * @return {array} list
   */
  async create (result) {
    const resultEntity = new this.model('result', result)
    return await resultEntity.save()
  },
}
 
module.exports = mongoose.model('result', schema)
