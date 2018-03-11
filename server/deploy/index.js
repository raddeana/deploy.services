/**
 * 部署
 * @author tmuffin
 */

const parse = require('./parse');
const gitPull = require('./git/pull');
const gitPush = require('./git/push');
const build = require('./build');
const publish = require('./publish');
const restart = require('./restart');

/**
 * 部署
 * @param {object} 请求对象
 * @param {object} 响应对象
 * @return none
 */
module.exports = (configure) => {
  gitPull(configure)
  build(configure)

  if (configure.type) {
    publish(configure)
    gitPush(configure)
  } else {
    restart(configure)
  }

  res.send('Hello, Github')
}
