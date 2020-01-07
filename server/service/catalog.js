/**
 * 目录变更
 * @author Philip
 */
const path = require('path')
const shell = require('shelljs')
const _path = require('../config/path')

/**
 * 跳转至项目目录
 * @param {array} 参数数组
 * @return none
 */
module.exports.to = async (args) => {
    shell.cd(`/root/${args[0]}`)

    return true
}

/**
 * 回到部署服务目录
 * @return none
 */
module.exports.back = async () => {
    shell.cd(`${_path.deploydir_path}`)

    return true
}
