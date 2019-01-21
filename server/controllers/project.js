/**
 * 项目
 * @author Philip
 */
const projectDao = require("../dao/project") 

/**
 * 项目查询
 * @Controller
 */
module.exports.query = (req, res) => {
  const params = req.params
  const condition = {}
  
  Objects.keys(params).forEach((key) => {
    const val = params[key]
    
    if (key !== "pageIndex" || key !== "pageSize") {
      condition[key] = val
    }
  })
  
  const result = projectDao.query(condition, params.pageIndex, params.pageSize)
  
  if (result.success) {
    res.json(result.data)
  } else {
    res.send(result.code, { message: result.message })
  }
}

/**
 * 创建新项目
 * @Controller
 */
module.exports.create = (req, res) => {
    const result = projectDao.create(req.body)
    
    if (result.success) {
        res.json(result.data)
    } else {
        res.send(result.code, { 
            message: result.message 
        })
    }
}

/**
 * 新项目更新
 * @Controller
 */
module.exports.update = (req, res) => {
    const result = projectDao.update(req.body)
  
    if (result.success) {
        res.json(result.data)
    } else {
        res.send(result.code, { message: result.message })
    }
}
