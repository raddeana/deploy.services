/**
 * 项目重启，替换静态资源版本
 * @author Philip
 */
const fs = require('fs')
const shell = require('shelljs')

/**
 * 启动项目
 * @param {string} 项目名称
 * @return none
 */
module.exports.start = (project) => {
    if (shell.exec(`pm2 start --name="${project}" npm -- start`).code !== 0) {
        shell.echo(`Error:\tstart\t${project}\tfailed`)
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
 * @return none
 */
module.exports.replaceHash = () => {
    const text = fs.readFileSync('./portals.json', 'utf8')
    const portals = JSON.parse(text)

    portals.forEach((portal) => {
        const file = fs.readFileSync(portal, 'utf8')
        const manifest = JSON.parse(fs.readFileSync(`./dist/manifest.json`, 'utf8'))

        Object.keys(manifest).forEach((origin) => {
            file.replace(origin, manifest[origin])
        })
    })
}
