/**
 * 日志
 * @author Philip
 */
const mongoose = require("mongoose")
const Schema = mongoose.Schema

// log schema
const schema = new Schema({
  release: {
    type: Boolean,
    default: "",
    trim: true
  },
  ref: {
    type: String,
    default: "",
    trim: true
  },
  repository: {
    type: String,
    default: "",
    trim: true
  },
  branch: {
    type: String,
    default: "",
    trim: true
  },
  messages: {
    type: Array,
    default: [],
    trim: true
  },
  modified: {
    type: Array,
    default: [],
    trim: true
  },
  removed: {
    type: Array,
    default: [],
    trim: true
  },
  added: {
    type: Array,
    default: [],
    trim: true
  },
  errorMsg: {
    type: String,
    default: "",
    trim: true
  },
  result: { 
    type: Schema.Types.ObjectId,
    ref: "result" 
  }
})
 
// 校验
schema.path("ref").required(true, "ref cannot be blank")
schema.path("repository").required(true, "repository cannot be blank")
schema.path("messages").required(true, "messages cannot be blank")
schema.path("modified").required(true, "modified cannot be blank")
schema.path("removed").required(true, "removed cannot be blank")
schema.path("added").required(true, "added cannot be blank")

schema.statics = {
/**
  * 获取log列表
  * @param {object} options
  * @return {array} list
  */
  async list (options) {
    const query = options.query || {}
    const result = await this.find(query)
      .sort({ createdAt: -1 })
      .exec()

    return result
  },
  
  /**
   * 添加日志
   * @param {object} log 对象
   * @return {array} list
   */
  async create (log) {
    const Record = this.model("record", log)
    const logEntity = new Record()
    const result = await logEntity.save()

    return result
  },
  
  /**
   * 删除日志
   * @param {string} log id
   * @return {array} list
   */
  async delete (logId) {
    const result = await this.remove({ _id: logId })
    return result
  }
}
 
module.exports = mongoose.model("record", schema)
