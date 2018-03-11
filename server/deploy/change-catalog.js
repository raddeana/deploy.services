/**
 * 目录变更
 * @author tmuffin
 */

const shelljs = require('shelljs/global');
const base = require('../config/base');

/**
 * 跳转至项目目录
 * @param {object} 可用配置对象
 * @return none
 */
module.exports.to = function (configure) {
  if (cd(configure.dir).code !== 0) {
    back();
    exit(1);
  }
}

/**
 * 回到部署服务目录
 * @return none
 */
module.exports.back = function () {
  if (cd(base.dir).code !== 0) {
    exit(1);
  }
}