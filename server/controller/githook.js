/**
 * git hook 发出的请求
 * @author Philip
 */
const fs = require("fs")
const path = require('path')

// 配置
const _path = require("../config/path")

// 服务
const Proxy = require("../service/proxy")
const aliOss = require("../service/ali-oss")

// dao
const releaseRecordDao = require("../dao/releaseRecord")

// dto
const ReleaseRecordDto = require("../dto/ReleaseRecord")
const HookData = require("../dto/HookData")

/**
 * 遍历文件夹
 * @param {string} 文件夹路径
 * @param {function} 处理函数
 * @return none
 */
let ergodicFolder = async (folderPath, handler) => {
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
module.exports.release = async (req, res) => {
    let proxy = new Proxy()
    let data = new HookData(req.body)
    let { repository } = data.get()
    let { web_dir, server_dir } = _path
    let isWeb = /\.web/.test(repository)

    repository = repository.replace('blog.', '').replace('.web', '')

    let catalog = isWeb ? web_dir : server_dir
    let result = {
        catalogTo: '',
        gitPull: '',
        npmBuild: '',
        projectReplaceHash: '',
        gitPush: ''
    }

    result.catalogTo = await proxy.call("catalog.to", [`${repository}${path.sep}${catalog}`])
    result.gitPull = await proxy.call("git.pull", [])

    // 构建可发布版本
    if (isWeb) {
        result.npmBuild = await proxy.call("npm.build", [`${repository}`])
        result.projectReplaceHash = proxy.call("project.replaceHash", [])

        result.gitPush = await proxy.call("git.push", [`${repository}`])
    }
    
    if (isWeb && proxy.nonBlocking) {
        let manifestTest = /manifest\.json/
        let wwwTest = /www/

        ergodicFolder('dist', (filePath) => {
            if (manifestTest.test(filePath) && wwwTest.test(filePath)) {
                aliOss.upload(filePath)
            }
        })
    }

    await proxy.call("project.restart", [`${data.project}`])
    await proxy.call("project.start", [`${data.project}`])
    await proxy.call("catalog.back", [])

    if (proxy.nonBlocking) {
        await releaseRecordDao.create(new ReleaseRecordDto(data).get(), result) 
    }

    res.send({
        message: "hello github"
    })
}
