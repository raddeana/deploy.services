/**
 * 命令行操作
 * @author Steudnera
 */
const fs = require('fs');
const shell = require('shelljs')

/**
 * 启动项目
 * @param {string} 项目名称
 * @return none
 */
module.exports.start = (project) => {
  if (shell.exec(`pm2 start --name="${project}" npm -- start`).code !== 0) {
    shell.echo('Error:\tstart\t${project}\tfailed')
    return false
  }

  shell.echo(`Info: start\t${project}\tsuccess`)
  return true
}

/**
 * 重启项目
 * @param {string} 项目名称
 * @return none
 */
module.exports.restart = (project) => {
  if (shell.exec(`pm2 restart ${project}`).code !== 0) {
    shell.echo(`Error:\trestart\t${project}\tfailed`)
    return false
  }
  
  shell.echo(`Error:\trestart\t${project}\tsuccess`)
  return true
}

/**
 * 替换静态资源版本
 * @param {object} 上一版本 manifest
 * @param {object} 当前版本 manifest
 * @param {array} 入口列表
 * @return none
 */
module.exports.replaceStaticVersion = (lastVersion, currVersion, portalList) => {
  portalList.forEach((portal) => {
    const file = fs.readFileSync('./deploy.config.json', 'utf8')
    const currVersionManifest = fs.readFileSync(`./dist/${currVersion}/manifest.json`, 'utf8')
    
    if (lastVersion) {
      const lastVersionManifest = fs.readFileSync(`./dist/${lastVersion}/manifest.json`, 'utf8')

      Object.keys(lastVersionManifest).forEach((file) => {
        const lastHashFileName = lastVersionManifest[file]
        const currHashFileName = currVersionManifest[file]

        file.replace(lastHashFileName, currHashFileName)
      })
    } else {
      Object.keys(currVersionManifest).forEach((file) => {
        file.replace(file, currVersionManifest[file])
      })
    }
  })
}
