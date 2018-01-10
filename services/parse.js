/**
 * 请求参数解析
 * @author mulberry
 */

const url = require('url');

/**
 * 请求参数解析
 * @param {object} 请求对象
 * @return {object} 可用配置对象
 */
module.exports = function (request) {
  const pathname = url.parse(request.url).pathname;
  const configure = {};

  configure.project = '';
};