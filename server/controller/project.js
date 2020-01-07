/**
 * 项目
 * @author Philip
 */
const projectDao = require('../dao/project') 

/**
 * 项目查询
 * @Controller
 */
module.exports.query = async (req, res) => {
    let params = req.query || {}
    let filters = {}

    let { pageIndex, pageSize } = params

    Object.keys(params).forEach((key) => {
        const val = params[key]

        if (key !== 'pageIndex' || key !== 'pageSize') {
            filters[key] = val
        }
    })
  
    let { code, message, data } = await projectDao.query(filters, pageIndex, pageSize)
  
    if (code === 200) {
        res.json(data)
    } else {
        res.send(code, { message })
    }
}

/**
 * 创建新项目
 * @Controller
 */
module.exports.create = async (req, res) => {
    let result = await projectDao.create(req.body)
    
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
module.exports.update = async (req, res) => {
    let result = await projectDao.update(req.body)
  
    if (result.success) {
        res.json(result.data)
    } else {
        res.send(result.code, { message: result.message })
    }
}
