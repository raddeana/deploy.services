/**
 * git hook 请求记录
 * @author Philip
 */
class Record {
    /**
     * 构造函数
     * @constructor
     */
    construcotr (data, result) {
        this.record = Object.assign({}, data, {
            result,
        })
    }
    
    /**
     * 获取可存储的日志数据
     * @return {object} 日志数据 
     */
    get () {
        return this.record
    }
}

module.exports = Record
