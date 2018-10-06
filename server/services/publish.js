/**
 * 发布
 * @author philip
 */
const fs = require("fs")
const qn = require("qn")

/**
 * 获取项目发布配置
 * @return none
 */
const getConfigure = () => {
  let config = null
  
  try {
    config = JSON.parse(fs.readFileSync("deploy.json", "utf8"))
  } catch (e) {
    throw (e)
  }
  
  return config
}

/**
 * 遍历目录
 * @param {string} 文件夹路径
 * @param {function} 处理函数
 * @return none
 */
const traverseDist = (path, handler) => {
  const items = fs.readdirSync(path)
  
  items.forEach((item, index) => {
    const info = fs.statSync(path + "/" + item)
    
    if (info.isDirectory()) {
      traverseDist(path + "/" + item, handler)
    } else {
      handler(item.path)
    } 
  })
}

/**
 * 发布至qn
 * @param {string} 构建好的目录
 * @return none
 */
module.exports.upload = () => {
  const qnConfig = getConfigure().qn
  const client = qn.create(qn.config)

  traverseDist(qn.distPath, (filepath) => {
    client.uploadFile(filepath, { key: filepath }, (err, result) => {
      if (!err) {
        console.info(result)
      }
    })
  })
}
