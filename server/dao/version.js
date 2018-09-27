/**
 * 版本
 * @author Philip
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// result schema
const schema = new Schema({
  version: {
    type: String,
    default: '',
    trim: true,
  },
  manifest: {
    type: Object,
    default: '',
    trim: true,
  },
})
 
// 校验
schema.path('version').required(true, 'version cannot be blank')
schema.path('manifest').required(true, 'manifest cannot be blank')

schema.statics = {
  /**
   * 添加版本
   * @param {object} 部署结果对象
   * @return {array} list
   */
  async create (version) {
    const versionEntity = new this.model('version', version)
    return await versionEntity.save()
  },
  
  /**
   * 更新版本
   * @param {object} 更新对象
   * @return {array} list
   */
  async update (version) {
    return await this.update({ _id: version._id }, project);
  },

  /**
   * 查询版本
   * @param {object} 查询对象
   * @return {array} list
   */
  async query (condition, pageSize, pageIndex) {
    const queryResult = await this.find(condition).exec()
    const total = await queryResult.count()
    const list = await queryResult.skip((pageIndex - 1) * pageSize).limit(pageSize).sort({'_id':-1}).exec()
    
    return {
      list,
      total,
    }
  },

  /**
   * 获取版本
   * @param {string} 项目id
   * @return {object} list
   */
  async getVersion (versionId) {
    return await this.findOne({ _id: versionId })
  },
  
  /**
   * 删除项目
   * @param {string} 项目id
   * @return {array} list
   */
  async delete (projectId) {
    return await this.remove({ _id: projectId });
  },
}

module.exports = mongoose.model('version', schema)
