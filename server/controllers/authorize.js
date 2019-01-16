/**
 * 登录
 * @author Philip
 */
const userDao = require("../dao/user")

/**
 * 登录
 * @Controller
 */
module.exports.login = async (req, res) => {
    let { username, password } = req.body
    let { message, user, code } = await userDao.login(username, password)

    if (code === '200') {
        req.session.user = user
        res.send(code, user)
    } else {
        if (!user) {
            res.send(code, { message })
        } else {
            res.send(code, { message })
        }
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
