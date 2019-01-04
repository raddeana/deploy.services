/**
 * 权限验证
 * @author Philip
 */

module.exports = async (req, res, next) => {
    if (req.session.user) {
        res.locals.user = req.session.user
    }

    next()
}
