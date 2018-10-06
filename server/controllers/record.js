/**
 * git钩子记录
 * @author Philip
 */
const hookRecordDao = require("../dao/record") 

/**
 * 记录查询
 * @Controller
 */
module.exports.query = (res, req) => {
  const params = req.params
  const condition = {}
  
  Objects.keys(params).forEach((key) => {
    const val = params[key]
    
    if (key !== "pageIndex" || key !== "pageSize") {
      condition[key] = val
    }
  })
  
  const result = hookRecordDao.query(condition, params.pageIndex, params.pageSize)
  
  if (result.success) {
    res.json(result.data)
  } else {
    res.send(result.code, { message: result.message })
  }
}

/**
 * 记录删除
 * @Controller
 */
module.exports.remove = (res, req) => {
  const params = req.params
  const condition = {}
  
  Objects.keys(params).forEach((key) => {
    const val = params[key]
    
    if (key !== "pageIndex" || key !== "pageSize") {
      condition[key] = val
    }
  })
  
  const result = hookRecordDao.query(condition, params.pageIndex, params.pageSize)
  
  if (result.success) {
    res.json(result.data)
  } else {
    res.send(result.code, { message: result.message })
  }
}
