/**
 * 部署控制器
 * @author Philip
 */
const parseRequest = require('../services/parse-git-request')
const catalog = require('../services/catalog')

module.exports.push = (req, res) => {
  res.json({
    message: 'hooray! welcome to our api!',
  })
}

module.exports.release = (req, res) => {
  const deployConfig = parseRequest(req)
}
