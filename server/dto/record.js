/**
 * git hook 请求记录
 * @author Philip
 */
class Record {
  /**
   * 构造函数
   * @constructor
   */
  construcotr (hookData) {
    this.hookData = hookData
  }

  /**
   * 设置钩子获取的数据
   * @return none
   */
  set (hookData) {
    this.hookData = hookData
  }
  
  /**
   * 获取可存储的日志数据
   * @return {object} 日志数据 
   */
  get () {
    return {
      release: this.hookData.release,
      ref: this.hookData.ref,
      repository: this.hookData.name,
      branch: this.hookData.branch,
      messages: this.hookData.messages,
      modified: this.hookData.modified,
      removed: this.hookData.removed,
      added: this.hookData.added,
    };
  }
}

export.default = Record
