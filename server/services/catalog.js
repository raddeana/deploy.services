/**
 * 目录变更
 * @author Philip
 */
const shell = require('shelljs')
const base = require('../config/base')

/**
 * 跳转至项目目录
 * @param {object} 可用配置对象
 * @return none
 */
module.exports.to = (configure) => {
  if (shell.cd(configure.dir).code !== 0) {
    shell.back();
    shell.exit(1);
  }
}

/**
 * 回到部署服务目录
 * @return none
 */
module.exports.back = () => {
  if (shell.cd(base.dir).code !== 0) {
    shell.exit(1);
  }
}
