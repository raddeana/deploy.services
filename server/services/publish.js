/**
 * 发布
 * @author Philip
 */
const fs = require('fs')
const qn = require('qn')

module.exports = {
  /**
   * 获取项目发布配置
   * return none
   */
  getConfigure () {
    let config = null
    
    try {
      config = JSON.parse(fs.readFileSync('./deploy.config.json', 'utf8'))
    } catch (e) {
      throw (e)
    }
    
    return config
  },
  
  /**
   * 获取qn客户端
   * return none
   */
  getClient () {
    const configure = this.getConfigure()
    const client = qn.create(configure)
    
    return client
  },

  
  /**
   * 遍历目录
   * @param {string} 文件夹路径
   * @param {function} 回调函数
   * return none
   */
  traverseDist (path, callback) {
  	const items = fs.readdirSync(path)
    
    items.forEach((item, index) => {
      const info = fs.statSync(path + "/" + item)
      
      if (info.isDirectory()) {
        readDirSync(path + "/" + item)
      } else {
        callback(file.path)
      }	
    })
  },
  
  /**
   * 删除
   * return none
   */
  remove (distpath) {
    const client = qn.create(config)
    
    this.traverseDist(distpath, (filepath) => {
      client.delete(filepath, (err, result) => {
        if (!err) {
          console.log(result)
        }
      });
    });
  },
  
  /**
   * 上传
   * return none
   */
  upload (distpath) {
    const client = qn.create(config)
    
    this.traverseDist(distpath, (filepath) => {
      client.uploadFile(filepath, { key: filepath }, (err, result) => {
        if (!err) {
          console.info(result)
        }
      })
    })
  },
}
