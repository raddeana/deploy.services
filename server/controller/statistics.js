/**
 * 统计控制器
 * @author Philip
 */
const releaseRecordDao = require("../dao/releaseRecord")

/**
 * 提交分类统计
 * @Controller
 */
module.exports.categories = async (req, res) => {
    let params = req.query || {}
    let { startTime, endTime } = params

    let { code, message, data } = await releaseRecordDao.query(filters, pageIndex, pageSize)
}

/**
 * 提交线图统计
 * @Controller
 */
module.exports.commits = async (req, res) => {
    let params = req.query || {}
    let { startTime, endTime } = params

    let { code, message, data } = await releaseRecordDao.query(filters, pageIndex, pageSize)
}