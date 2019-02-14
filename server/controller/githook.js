/**
 * git hook 发出的请求
 * @author Philip
 */
const fs = require("fs")

// 配置
const path = require("../config/path")

// 服务
const Proxy = require("../service/proxy")
const aliOss = require("../service/ali-oss")

// dao
const Record = require("../dto/ReleaseRecord")

// dto
const RecordDTO = require("../dto/ReleaseRecord")
const HookData = require("../dto/HookData")

/**
 * 遍历文件夹
 * @param {string} 文件夹路径
 * @param {function} 处理函数
 * @return none
 */
let ergodicFolder = async function (folderPath, handler) {
    let files = fs.readdirSync(folderPath)
    
    for (let i = 0, len = files.length; i < len; i++) {
        let fof = files[i]
        let stat = fs.lstatSync(folderPath + '/' + fof)

        if (stat.isDirectory() === true) { 
            await ergodicFolder(folderPath + '/' + fof, handler)
        } else {
            await handler(folderPath + '/' + fof)
        }
    }
}

/**
 * git release
 * @Controller
 */
module.exports.release = async function (req, res) {
    let proxy = new Proxy()
    let hookData = new HookData(req.body)
    let config = aliOss.getConfig()

    let isWeb = /\.web/.test(hookData.repository)
    let catalog = isWeb ? path.web : path.server

    proxy.call("catalog.to", [`${hookData.project}/${catalog}`])
    proxy.call("git.pull", [])

    // 构建可发布版本
    if (isWeb) {
        proxy.call("npm.build", [`${hookData.project}`])
        proxy.call("project.replaceHash", [])

        proxy.call("git.push", [`${hookData.project}`])
    }

    let oss = {
        success: 0,
        fail: 0
    }
    
    if (isWeb) {
        ergodicFolder(`${hookData.project}/${catalog}`, async (filepath) => {
            let result = await aliOss.upload(filepath)
            
            if (result) {
                oss.success++
            } else {
                oss.fail++
            }
        })
    }
    
    await Record.create(new RecordDTO(hookData).get(), oss)

    proxy.call("project.restart", [`${hookData.project}`])
    proxy.call("project.start", [`${hookData.project}`])
    proxy.call("catalog.back", [])

    res.send({
        message: "hello github"
    })
}
