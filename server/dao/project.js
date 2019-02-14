
/**
 * 项目配置
 * @author Philip
 */
const mongoose = require("mongoose")
const Schema = mongoose.Schema

// result schema
const schema = new Schema({
  name: {
    type: String,
    default: "",
    trim: true
  },
  git: {
    type: String,
    default: "",
    trim: true
  },
  oss: {
    type: Object,
    default: ""
  },
  technology: {
    type: Object,
    default: ""
  },
  server: {
    type: String,
    default: "",
    trim: true
  },
  domain: {
    type: String,
    default: "",
    trim: true
  },
  ip: {
    type: String,
    default: "",
    trim: true
  },
  currVersion: {
    type: String,
    default: "",
    trim: true
  },
  versions: {
    type: Array,
    default: ""
  }
})
 
// 校验
schema.path("name").required(true, "name cannot be blank")
schema.path("git").required(true, "git cannot be blank")
schema.path("server").required(true, "server cannot be blank")
schema.path("domain").required(true, "domain cannot be blank")
schema.path("ip").required(true, "ip cannot be blank")
schema.path("versions").required(true, "version cannot be blank")

schema.statics = {
  /**
   * 添加项目
   * @param {object} 部署结果对象
   * @return {array} list
   */
  async create (project) {
    const Project = this.model("project", project)
    const projectEntity = new Project()
    const result = await projectEntity.save()

    return result
  },
  
  /**
   * 更新
   * @param {object} 更新对象
   * @return {array} list
   */
  async update (project) {
    const result = await this.update({ _id: project._id }, project)

    return result
  },

  /**
   * 查询项目
   * @param {object} 过滤条件
   * @param {number} 页码
   * @param {number} 大小
   * @return {object} 查询结果
   */
  async query (filters, pageSize, pageIndex) {
    let query = this.find(filters)
    let total = await query.count()
    let list = await query.skip(pageSize * (pageIndex - 1)).limit(pageSize * pageIndex)
        .sort({ createdAt: -1 })
        .exec('find')

    return {
        code: 200,
        data: {
            list,
            total
        }
    }
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
 
module.exports = mongoose.model("project", schema)
