const fs = require('fs')

/**
 * 工具类
 * @author Philip
 */
module.exports = {
    /**
     * 读文件
     * @param {string} 文件路径
     * @param {string} 字符编码
     * @return {promise} promise 对象
     */
    read: (filePath, utf) => {
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, utf, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data)
                }
            })
        })
    },

    /**
     * 写文件
     * @param {string} 文件路径
     * @param {string} 写入文本
     * @param {string} 字符编码
     * @return {promise} promise 对象
     */
    write: (filePath, text, utf) => {
        return new Promise((resolve, reject) => {
            fs.writeFile(filePath, text, utf, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data)
                }
            })
        })
    }
}