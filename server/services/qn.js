/**
 * 发布
 * @author Philip
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
    config = JSON.parse(fs.readFileSync("./qn.config.json", "utf8"))
  } catch (e) {
    throw (e)
  }
  
  return config
}

/**
 * 获取qn客户端
 * @return none
 */
const getClient = () => {
  const qnConfig = getConfigure().qnConfig
  const client = qn.create(qnConfig)
  
  return client
}

module.exports = {
  /**
   * 删除
   * @param {string} 要删除的文件路径
   * @return none
   */
  remove (filepath) {
    const client = getClient()
    
    client.delete(filepath, (err, result) => {
      if (!err) {
        console.log(result)
      }
    })
  },
  
  /**
   * 上传
   * @param {string} 要上传的文件路径
   * @return none
   */
  upload (filepath) {
    const client = getClient()
    
    client.uploadFile(filepath, { key: filepath }, (err, result) => {
      if (!err) {
        console.info(result)
      }
    })
  }
}
