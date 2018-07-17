/**
 * 命令行操作
 * @author Steudnera
 */
const shelljs = require('shelljs/global')

/**
 * 构建
 * @return none
 */
module.exports.build = (project) => {
  if (exec('npm run build').code !== 0) {
    echo(`Error:\tbuild\t${project}\tfailed`)
    return false
  }
  
  return true
}

/**
 * 拉取
 * @return none
 */
module.exports.pull = (project) => {
  if (exec('git pull').code !== 0) {
    echo(`Error:\tpull\t${project}\tfailed`)
    exit(1)
    
    return false
  }
  
  return true
}

/**
 * node 推送
 * @return none
 */
module.exports.push = (project) => {
  if (exec('git add -A').code !== 0) {
    echo(`Error:\tpull\t${project}\tfailed`)
    exit(1)
    
    return false
  }
  
  return true
}

/**
 * 输出
 * @return none
 */
module.exports.echo = (message) => {
  echo(message)
}

/**
 * 启动项目
 * @return none
 */
module.exports.start = (project) => {
  if(exec(`pm2 start --name="${project}" npm -- start`).code !== 0) {
    echo('Error:\tstart\t${project}\tfailed')
    return false
  }

  echo(`Info: start\t${project}\tsuccess`)
  return true
}

/**
 * 重启项目
 * @return none
 */
module.exports.restart = (project) => {
  if (exec(`pm2 restart ${project}`).code !== 0) {
    echo(`Error:\trestart\t${project}\tfailed`)
    return false
  }
  
  echo(`Error:\trestart\t${project}\tsuccess`)
  return true
}
