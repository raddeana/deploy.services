/**
 * 目录变更
 * @author Philip
 */
const { exec, echo, exit } = require('./shell')
const path = require("../config/path")

/**
 * 跳转至项目目录
 * @param {array} 参数数组
 * @return none
 */
module.exports.to = async (args) => {
    let code = await exec(`cd ${args[0]}`)

    if (code !== 0) {
        return true
    } else {
        return false
    }
}

/**
 * 回到部署服务目录
 * @return none
 */
module.exports.back = async () => {
    let code = await exec(`cd ${path.deploydir_path}`)

    if (code !== 0) {
        return true
    } else {
        return false
    }
}
