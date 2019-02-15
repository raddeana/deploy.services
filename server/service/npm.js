/**
 * 部署构建
 * @author Philip
 */
const { exec, echo, exit } = require('./shell')

/**
 * 构建
 * @return none
 */
module.exports.build = async (args) => {
    let code = await exec('npm run build')
    
    if (code !== 0) {
        echo(`Error:\tbuild\t${args[0]}\tfailed`)
        exit(1)

        return false
    }

    return true
}
