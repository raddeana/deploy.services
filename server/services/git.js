/**
 * 命令行操作
 * @author Steudnera
 */
const shell = require('shelljs')

/**
 * 拉取
 * @return none
 */
module.exports.pull = (project) => {
  if (shell.exec('git pull').code !== 0) {
    shell.echo(`Error:\tpull\t${project}\tfailed`)
    shell.exit(1)
    
    return false
  }
  
  return true
}

/**
 * node 推送
 * @return none
 */
module.exports.push = (project) => {
  if (shell.exec('git add -A').code !== 0) {
    shell.echo(`Error:\tpull\t${project}\tfailed`)
    shell.exit(1)
    
    return false
  }
  
  return true
}
