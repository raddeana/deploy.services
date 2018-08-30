/**
 * 发布
 * @author Philip
 */
const fs = require('fs')
const qn = require('qn')

/**
 * 遍历目录
 * @param {string} 文件夹路径
 * @param {function} 回调函数
 * @return none
 */
const traverseDist = (path, callback) => {
  const items = fs.readdirSync(path)
  
  items.forEach((item, index) => {
    const info = fs.statSync(path + "/" + item)
    
    if (info.isDirectory()) {
      readDirSync(path + "/" + item)
    } else {
      callback(file.path)
    } 
  })
};

/**
 * 获取项目发布配置
 * @return none
 */
const getConfigure = () => {
  let config = null
  
  try {
    config = JSON.parse(fs.readFileSync('./deploy.config.json', 'utf8'))
  } catch (e) {
    throw (e)
  }
  
  return config
};

/**
 * 获取qn客户端
 * @return none
 */
const getClient = () => {
  const qnConfig = getConfigure().qnConfig
  const client = qn.create(qnConfig)
  
  return client
};

module.exports = {  
  /**
   * 删除
   * @return none
   */
  remove (distpath) {
    const client = getClient()
    
    traverseDist(distpath, (filepath) => {
      client.delete(filepath, (err, result) => {
        if (!err) {
          console.log(result)
        }
      });
    });
  },
  
  /**
   * 上传
   * @return none
   */
  upload (distpath) {
    const client = getClient()
    
    traverseDist(distpath, (filepath) => {
      client.uploadFile(filepath, { key: filepath }, (err, result) => {
        if (!err) {
          console.info(result)
        }
      })
    })
  },
}
