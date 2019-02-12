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
