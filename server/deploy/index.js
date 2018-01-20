/**
 * 部署
 * @author mulberry
 */

const parse = require('./parse');
const pull = require('./git/pull');
const push = require('./git/push');
const build = require('./build');
const publish = require('./publish');
const restart = require('./restart');

/**
 * 部署
 * @param {object} 请求对象
 * @param {object} 响应对象
 * @return none
 */
module.exports = function (req, res) {
  const configure = parse(req);
  
  pull(configure);
  build(configure);

  if (configure.type) {
    publish(configure);
    push(configure);
  } else {
    restart(configure);
  }

  res.send('Hello, Github');
};
