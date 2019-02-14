/**
 * 权限验证
 * @author Philip
 */
const noAuthentication = require('../constant/no-authentication')

module.exports = (req, res, next) => {
    let reg = /\/api\//

    if (noAuthentication.indexOf(req.url) === -1) {
        if (req.session.user) {
            res.locals.user = req.session.user
            next()
        } else {
            if(reg.test(req.url)) {
                res.send(403, {
                    message: '权限已过期'
                })
            } else {
                res.redirect('login')
            }
        }
    } else {
        next()
    }
}
