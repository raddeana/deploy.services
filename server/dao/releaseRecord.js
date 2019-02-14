/**
 * release 记录列表
 * @author Philip
 */
const mongoose = require("mongoose")
const Schema = mongoose.Schema

// 发布记录
const schema = new Schema({
    release: {
        type: Boolean,
        default: false
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
        default: []
    },
    modified: {
        type: Array,
        default: []
    },
    removed: {
        type: Array,
        default: []
    },
    added: {
        type: Array,
        default: []
    },
    errorMsg: {
        type: String,
        default: "",
        trim: true
    },
    result: {
        type: Object,
        default: {}
    },
    userId:{
        type: Schema.Types.ObjectId, 
        ref: 'project' 
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
    * 获取release 记录列表
    * @param {object} 过滤条件
    * @param {number} 页码
    * @param {number} 大小
    * @return {object} 查询结果
    */
    async query (filters, pageIndex, pageSize) {
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
     * 添加日志
     * @param {object} release 记录
     * @return {array} list
     */
    async create (_record) {
        let Record = this.model("record")
        let record = new Record(_record)
        let result = await record.save()
        
        return result
    },
    
    /**
     * 删除日志
     * @param {string} 记录id
     * @return {array} list
     */
    async delete (id) {
        let result = await this.remove({ _id: id })

        return result
    }
}
 
module.exports = mongoose.model("record", schema)
