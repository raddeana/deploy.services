/**
 * ali oss
 * @author Philip
 */
const fs = require("fs")
const AliOss = require("ali-oss")

module.exports = {
  /**
   * 获取阿里云 Oss 实例
   * @return {AliOss} 阿里云 Oss SDK 实例
   */
  getClient () {
    const client = new AliOss({
      accessKeyId: 'LTAI2PBQSdfLOUme',
      accessKeySecret: 'uMuFXEuK06PGTEmHRiFCvoCNtgx8nb',
      bucket: 'raddeana',
      region: 'oss-cn-beijing',
    })
    
    return client
  },
  /**
   * 获取部署配置
   * @return {object} 部署配置
   */
  getConfig () {
    let config = null
    
    try {
      config = JSON.parse(fs.readFileSync("./deploy.config.json", "utf8"))
    } catch (err) {
      console.error(err);
    }
    
    return config
  },

  /**
   * 删除
   * @param {string} 要删除的文件路径
   * @return none
   */
  async remove (objectname) {
    const client = this.getClient()
    const config = this.getConfig()
    
    try {
      return await client.delete(objectname)
    } catch (err) {
      console.error(err)
    }
  },
  
  /**
   * 上传
   * @param {string} 要上传的文件路径
   * @return none
   */
  async upload (objectname, filepath) {
    const client = this.getClient()
    const config = this.getConfig()
    
    try {
      return await client.put(objectname, filepath)
    } catch (err) {
      console.error(err)
    }
  }
}
