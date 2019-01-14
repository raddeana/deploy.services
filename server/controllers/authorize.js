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
    let { username, password } = req.body
    let { success, user, message } = await userDao.login(username, password)

    if (success) {
        req.session.user = user
    } else {
        res.send('403', { message })
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
