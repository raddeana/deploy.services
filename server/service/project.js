/**
 * 项目重启，替换静态资源版本
 * @author Philip
 */
const fs = require('fs')
const { exec, echo, exit } = require('./shell')

/**
 * 启动项目
 * @param {string} 项目名称
 * @return none
 */
module.exports.start = async (args) => {
    let code = await exec(`pm2 start --name="${args[0]}" npm -- start`)

    if (code !== 0) {
        echo(`Error:\tstart\t${args[0]}\tfailed`)
        exit(1)
        
        return false
    }

    echo(`Info: start\t${args[0]}\tsuccess`)
    return true
}

/**
 * 重启项目
 * @param {string} 项目名称
 * @return none
 */
module.exports.restart = async (args) => {
    let code = await exec(`pm2 restart ${args[0]}`)

    if (code !== 0) {
        echo(`Error:\trestart\t${args[0]}\tfailed`)
        exit(1)

        return false
    }
    
    echo(`Error:\trestart\t${args[0]}\tsuccess`)
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
