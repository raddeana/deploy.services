/**
 * 项目
 * @author Philip
 */
const projectModel = require('../model/project') 

/**
 * 项目查询
 * @Controller
 */
module.exports.query = (req, res) => {
  const params = req.params
  const condition = {}
  
  Objects.keys(params).forEach((key) => {
    const val = params[key]
    
    if (key !== 'pageIndex' || key !== 'pageSize') {
      condition[key] = val
    }
  })
  
  const result = projectModel.query(condition, params.pageIndex, params.pageSize)
  
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
  const result = projectModel.create(req.body)
  
  if (result.success) {
    res.json(result.data)
  } else {
    res.send(result.code, { message: result.message })
  }
}

/**
 * 新项目更新
 * @Controller
 */
module.exports.update = (req, res) => {
  const result = projectModel.update(req.body)
  
  if (result.success) {
    res.json(result.data)
  } else {
    res.send(result.code, { message: result.message })
  }
}
