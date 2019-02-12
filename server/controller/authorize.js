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

    if (code === 200) {
        req.session.user = user
        
        res.send(code, {
            token: req.session.id
        })
    } else {
        if (!user) {
            res.send(code, {
                message
            })
        } else {
            res.send(code, {
                message
            })
        }
    }
}

/**
 * 登出
 * @Controller
 */
module.exports.logout = async (req, res) => {
    req.session.regenerate()
    req.session.user = null
    
	res.redirect("/login")
}

/**
 * 修改密码
 * @Controller
 */
module.exports.modifyPassword = async (req, res) => {
    let user = req.body
    let result = await userDao.login(username, password)
    let { code, message } = result

    res.send(code, {
        message
    })
}