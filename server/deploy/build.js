/**
 * 构建
 * @author tmuffin
 */
const shelljs = require('shelljs/global')

/**
 * 执行
 * @return none
 */
module.exports.exec = () => {
  if (exec('npm run build').code !== 0) {
    echo('Error: publish failed')
    return false
  } else {
    return true
  }
}
