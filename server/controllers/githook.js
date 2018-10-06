/**
 * git hook 发出的请求
 * @author Philip
 */
const path = require("../config/path")
const Proxy = require("../services/proxy")
const HookData = require("../dto/hook-data")

/**
 * git release
 * @controller
 */
module.exports.release = (req, res) => {
  const proxy = new Proxy()
  const hookData = new HookData(req.body)

  proxy.call("catalog.to", [`${hookData.project}/${path.web}`])
  proxy.call("git.pull", [])

  // 需要发布至 qn
  if (hookData.isQnPublish()) {
    proxy.call("npm.build", [`${hookData.project}`])

    proxy.call("publish.upload", [])
    proxy.call("project.replaceHash", [])

    proxy.call("git.push", [`${hookData.project}`])
  }

  proxy.call("project.restart", [`${hookData.project}`])
  proxy.call("project.start", [`${hookData.project}`])
  proxy.call("catalog.back", [])

  res.send({ message: "hello github" })
}
