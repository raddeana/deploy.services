/**
 * release 记录列表
 * @author Philip
 */
const mongoose = require("mongoose")
const Schema = mongoose.Schema

// 发布记录
const schema = new Schema({
    url: {
        type: String,
        default: "",
        trim: true
    },
    tag_name: {
        type: String,
        default: "",
        trim: true
    },
    repository: {
        type: String,
        default: "",
        trim: true
    },
    published_at: {
        type: String,
        default: "",
        trim: true
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
schema.path("url").required(true, "url cannot be blank")
schema.path("repository").required(true, "repository cannot be blank")
schema.path("tag_name").required(true, "tag name cannot be blank")
schema.path("published_at").required(true, "published time cannot be blank")

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
    async create (record) {
        let ReleaseRecord = this.model("releaseRecord")
        let releaseRecord = new ReleaseRecord(record)
        let result = await releaseRecord.save()
        
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
 
module.exports = mongoose.model("releaseRecord", schema)
