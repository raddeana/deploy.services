/**
 * git 命令
 * @author Philip
 */
const { exec, echo, exit } = require('./shell')

/**
 * 拉取
 * @return none
 */
module.exports.pull = async (args) => {
    let code = await exec('git pull')

    if (code !== 0) {
        echo(`Error:\tpull\t${args[0]}\tfailed`)
        exit(1)

        return false
    }

    return true
}

/**
 * node 推送
 * @return none
 */
module.exports.push = async () => {
    await exec('git add -A && git commit -m\'auto:publish\' && git push')
    return true
}
