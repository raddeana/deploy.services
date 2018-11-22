/**
 * git hook 发出的请求
 * @author Philip
 */
const fs = require("fs")
const path = require("../config/path")
const Proxy = require("../services/proxy")
const Record = require("../model/record")
const RecordDTO = require("../dto/record")
const aliOss = require("../services/ali-oss")
const HookData = require("../dto/hook-data")

/**
 * 遍历文件夹
 * @param {string} 文件夹路径
 * @param {function} 处理函数
 * @return none
 */
const ergodicFolder = async function (folderPath, handler) {
  const files = fs.readdirSync(folderPath)
  
  for (let i = 0, len = files.length; i < len; i ++)
    let fof = files[i];
    let stat = fs.lstatSync(folderPath + '/' + fof)

    if (stat.isDirectory() === true) { 
      await ergodicFolder(folderPath + '/' + fof, handler);
    } else {
      await handler(folderPath + '/' + fof);
    }
}

/**
 * git release
 * @Controller
 */
module.exports.release = async function (req, res) {
  const proxy = new Proxy()
  const hookData = new HookData(req.body)
  const config = aliOss.getConfig()

  proxy.call("catalog.to", [`${hookData.project}/${path.web}`])
  proxy.call("git.pull", [])

  // 构建可发布版本
  if (config.type == = 'web') {
    proxy.call("npm.build", [`${hookData.project}`])
    proxy.call("project.replaceHash", [])

    proxy.call("git.push", [`${hookData.project}`])
  }

  proxy.call("project.restart", [`${hookData.project}`])
  proxy.call("project.start", [`${hookData.project}`])
  proxy.call("catalog.back", [])

  res.send({
    message: "hello github", 
  })
  
  let oss = {
    success: 0,
    fail: 0,
  };
  
  if (config.type === 'web') {
    ergodicFolder(`${hookData.project}/${path.web}`, async function (filepath) {
      const result = await aliOss.upload(filepath)
      
      if (result) {
        oss.success ++;
      } else {
        oss.fail ++;
      }
    })
  }
  
  await Record.create(new RecordDTO(hookData).get(), oss)
}
