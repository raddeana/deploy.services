/**
 * 统计控制器
 * @author Philip
 */
const recordDao = require("../dao/record")

/**
 * 提交分类统计
 * @Controller
 */
module.exports.categories = async (req, res) => {
    let params = req.query || {}
    let { startTime, endTime } = params

    let { code, message, data } = await recordDao.query(filters, pageIndex, pageSize)
}

/**
 * 提交线图统计
 * @Controller
 */
module.exports.commits = async (req, res) => {
    let params = req.query || {}
    let { startTime, endTime } = params

    let { code, message, data } = await recordDao.query(filters, pageIndex, pageSize)
}