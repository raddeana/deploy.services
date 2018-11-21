/**
 * git hook 发出的请求
 * @author Philip
 */
const fs = require("fs")
const path = require("../config/path")
const Proxy = require("../services/proxy")
const aliOss = require("../services/ali-oss")
const HookData = require("../dto/hook-data")

/**
 * 遍历文件夹
 * @param {string} 文件夹路径
 * @param {function} 处理函数
 * @return none
 */
const ergodicFolder = (folderPath, handler) => {
  const files = fs.readdirSync(folderPath)
  
  files.forEach((f, index) => {
      const stat = fs.lstatSync(folderPath + '/' + f)
      
      if (stat.isDirectory() === true) { 
        ergodicFolder(folderPath + '/' + f, handler);
      } else {
        handler(folderPath + '/' + f);
      }
  })
}

/**
 * git release
 * @Controller
 */
module.exports.release = (req, res) => {
  const proxy = new Proxy()
  const hookData = new HookData(req.body)

  proxy.call("catalog.to", [`${hookData.project}/${path.web}`])
  proxy.call("git.pull", [])

  // 需要发布至 qn
  if (hookData.isAliOssPublish()) {
    proxy.call("npm.build", [`${hookData.project}`])

    proxy.call("publish.upload", [])
    proxy.call("project.replaceHash", [])

    proxy.call("git.push", [`${hookData.project}`])
  }

  proxy.call("project.restart", [`${hookData.project}`])
  proxy.call("project.start", [`${hookData.project}`])
  proxy.call("catalog.back", [])

  res.send({ message: "hello github" })
  
  ergodicFolder(`${hookData.project}/${path.web}`, (filepath) => {
    aliOss.upload(filepath)
  })
}
