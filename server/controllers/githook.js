/**
 * git hook 发出的请求
 * @author Philip
 */

const qn = require('../config/qn')
const npm = require('../config/npm')
const git = require('../config/git')
const catalog = require('../config/catalog')
const project = require('../config/project')
const proxy = require('../config/proxy')

/**
 * @git提交钩子
 * @param {object} 已编译的请求数据
 * @param {string} 日志 id
 * @controller
 */
module.exports.githook = (parsed, logId, req, res) => {
    
}
