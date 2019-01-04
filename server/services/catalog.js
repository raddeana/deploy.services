/**
 * 目录变更
 * @author Philip
 */
const shell = require("shelljs")
const path = require("../config/path")

/**
 * 跳转至项目目录
 * @param {object} 可用配置对象
 * @return none
 */
module.exports.to = (dir) => {
    if (shell.cd(dir).code !== 0) {
        shell.back()
        shell.exit(1)
    }
}

/**
 * 回到部署服务目录
 * @return none
 */
module.exports.back = () => {
    if (shell.cd(path.deploydir_path).code !== 0) {
        shell.exit(1)
    }
}
