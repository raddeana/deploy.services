/**
 * 响应数据
 * @author philip
 */
class Result {
  /**
   * 构造函数
   * @constructor
   */
  constructor (data) {
    this.data = data
  }
  
  /**
   * 设置数据
   * @param {object} 数据
   * @return none
   */
  setData (data) {
    this.data = data
  }
  
  /**
   * 获取数据
   * @return {object} 数据
   */
  getData () {
    return this.data
  }
  
  /**
   * 分页
   * @param {number} 分页size
   * @param {number} 分页页码
   * @return {object} 分页结果集
   */
  getPagination (pageSize, pageIndex) {
    var data = this.data
    var listData = null
    
    if (data instanceof Array) {
      listData = Array
    } else {
      listData = [data]
    }
    
    return {
      data: listData.slice((pageIndex - 1) * pageSize, pageIndex * pageSize),
      total: listData.length
    }
  }
  
  /**
   * 错误信息
   * @return { object } 错误对象
   */
  getErrorMsg (errorMsg) {
    return {
      errorMsg
    }
  }
}
