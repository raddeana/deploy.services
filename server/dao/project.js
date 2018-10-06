
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
  qn: {
    type: Object,
    default: "",
    trim: true
  },
  web: {
    type: String,
    default: "",
    trim: true
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
    default: "",
    trim: true
  }
})
 
// 校验
schema.path("name").required(true, "name cannot be blank")
schema.path("git").required(true, "git cannot be blank")
schema.path("web").required(true, "web cannot be blank")
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
   * @param {object} 查询对象
   * @return {array} list
   */
  async query (condition, pageSize, pageIndex) {
    const queryResult = await this.find(condition).exec()
    const total = await queryResult.count()
    const list = await queryResult.skip((pageIndex - 1) * pageSize).limit(pageSize).sort({"_id": -1}).exec()
    
    return {
      list,
      total
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
