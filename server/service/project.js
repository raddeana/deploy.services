/**
 * 项目重启，替换静态资源版本
 * @author Philip
 */
const { read, write } = require('../utils')
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
 * @param {array} 函数参数
 * @return none
 */
module.exports.restart = async (args) => {
    let code = await exec(`pm2 restart ${args[0]}`)

    if (code !== 0) {
        echo(`Error: \trestart\t${args[0]}\tfailed`)
        exit(1)

        return false
    }
    
    echo(`Info: \trestart\t${args[0]}\tsuccess`)
    return true
}

/**
 * 替换静态资源版本
 * @return none
 */
module.exports.replaceHash = async () => {
    try {
        let deploy = await read('.deploy.json', 'utf8')
        let deployJson = JSON.parse(file)
        
        let manifest = await read('dist/manifest.json', 'utf8')
        let manifestJson = JSON.parse(manifest)

        for (let i = 0, len = deployJson.portals.length; i < len; i ++) {
            let portal = deployJson.portals[i]
            let content = fs.readFileSync(portal, 'utf8')
            
            Object.keys(manifestJson).forEach((origin) => {
                content = content.replace(origin, manifestJson[origin])
            })
    
            await write(portal, content, 'utf8')
        }

        return true
    } catch (e) {
        return false
    }
}

/**
 * 替换
 * @param {array} 函数参数
 * @return {boolean} true
 */
module.exports.replaceVersion = async (args) => {
    try {
        let file = await read('package.json', 'utf8')
        let json = JSON.parse(file)

        json.version = args[0]

        await write('package.json', JSON.stringify(json), 'utf8')
    
        return true
    } catch (e) {
        return false
    }
}