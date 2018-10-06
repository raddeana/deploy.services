/**
 * 版本
 * @author Philip
 */
const mongoose = require("mongoose")
const Schema = mongoose.Schema

// result schema
const schema = new Schema({
  projectId: {
    type: String,
    default: "",
    trim: true
  },
  version: {
    type: String,
    default: "",
    trim: true
  },
  manifest: {
    type: Object,
    default: "",
    trim: true
  }
})
 
// 校验
schema.path("version").required(true, "version cannot be blank")
schema.path("manifest").required(true, "manifest cannot be blank")

schema.statics = {
  /**
   * 添加版本
   * @param {object} 部署结果对象
   * @return {array} list
   */
  async create (version) {
    const Version = this.model("version", version)
    const versionEntity = new Version()
    const result = versionEntity.save()
    
    return result
  },
  
  /**
   * 更新版本
   * @param {object} 更新对象
   * @return {array} list
   */
  async update (version) {
    const result = await this.update({ _id: version._id }, version)

    return result
  },

  /**
   * 查询版本
   * @param {object} 查询对象
   * @return {array} list
   */
  async query (condition, pageSize, pageIndex) {
    const queryResult = await this.find(condition).exec()
    const total = await queryResult.count()
    const list = await queryResult.skip((pageIndex - 1) * pageSize).limit(pageSize).sort({ "_id": -1 }).exec()
    
    return {
      list,
      total
    }
  },

  /**
   * 获取版本
   * @param {string} 项目id
   * @return {object} list
   */
  async getVersion (versionId) {
    const result = await this.findOne({ _id: versionId })

    return result
  },
  
  /**
   * 删除项目
   * @param {string} 项目id
   * @return {array} list
   */
  async delete (projectId) {
    const result = await this.remove({ _id: projectId })

    return result
  }
}

module.exports = mongoose.model("version", schema)
