/**
 * 权限验证
 * @author Philip
 */
const noAuthentication = require('../constants/no-authentication')

module.exports = (req, res, next) => {
    if (noAuthentication.indexOf(req.url) === -1) {
        if (req.session.user) {
            res.locals.user = req.session.user
            next()
        } else {
            res.redirect('login')
        }
    } else {
        next()
    }
}
