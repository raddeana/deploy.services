/**
 * cors 跨域中间件
 * @author mulbrrey
 */

module.exports = function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', false);
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Access-Token");
  res.setHeader("Access-Control-Expose-Headers", "*");

  next();
};