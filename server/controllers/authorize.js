/**
 * 登录
 * @author Philip
 */
const userDao = require('../dao/user')

/**
 * 登录
 * @Controller
 */
module.exports.login = async (req, res) => {
    let params = req.params
    let condition = {
        username: params.username,
        password: params.password
    }

    let result = userDao.query(condition)

    console.log(result)

    if (result.success) {
        res.json(result.data)
    } else {
        res.send(result.code, { message: result.message })
    }
}

/**
 * 登出
 * @Controller
 */
module.exports.logout = async (req, res) => {
	req.session.user = null
    req.session.error = null
    
	res.redirect("/login")
}
