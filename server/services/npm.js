/**
 * 部署构建
 * @author Philip
 */
const shell = require('shelljs')

/**
 * 构建
 * @return none
 */
module.exports.build = (project) => {
  if (shell.exec('npm run build').code !== 0) {
    shell.echo(`Error:\tbuild\t${project}\tfailed`)
    
    return false
  }
  
  return true
}

/**
 * 运行预发格式 lint
 * @return none
 */
module.exports.lint = (project) => {
  if (shell.exec('npm run lint').code !== 0) {
    shell.echo(`Error:\tlint\t${project}\tfailed`)
    
    return false
  }
  
  return true
}
