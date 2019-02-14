/**
 * 执行脚本
 * @author Philip
 */
const shell = require('shelljs')

module.exports = {
    exec: (_shell) => {
        return new Promise(function (resolve, reject) {
            try {
                shell.exec(_shell, {
                    silent: true
                }, (code) => {
                    resolve(code)
                })
            } catch (e) {
                resolve('shell error')
            }
        })
    },
    echo: shell.echo,
    exit: shell.exit
}