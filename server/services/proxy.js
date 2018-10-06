/**
 * 部署相关行为代理
 * @author
 */
 
// 行为错误信息
const errorMessages = require("../constants/error-messages")

// 部署服务
const npm = require("./npm")
const git = require("./git")
const catalog = require("./catalog")
const project = require("./project")
const publish = require("./publish")

class Proxy {
  /**
   * 构造函数
   * @contructor
   */
  contructor (context) {
    this.context = context
  }
  
  /**
   * 获取行为处理函数
   * @param {string} 行为
   * @return {function} 获取行为处理函数
   */
  getActionHandler (action) {
    switch (action) {
      case "npm.build":
        return npm.build.bind(npm)
      case "npm.lint":
        return npm.lint.bind(npm)
      case "catalog.to":
        return catalog.to.bind(catalog)
      case "catalog.back":
        return catalog.back.bind(catalog)
      case "project.start":
        return project.start.bind(project)
      case "project.restart":
        return project.restart.bind(project)
      case "project.replaceHash":
        return project.replaceHash.bind(project)
      case "git.push":
        return git.push.bind(git)
      case "git.pull":
        return git.pull.bind(git)
      case "publish.upload":
        return publish.upload.bind(publish)
    }
  }
  
  /**
   * 获取行为错误信息
   * @param { string } 行为
   * @return { string } 行为错误信息
   */
  getActionErrorMsg (action) {
    switch (action) {
      case "build":
        return errorMessages.buildError
      case "catalog.to":
        return errorMessages.catalogToError
      case "catalog.back":
        return errorMessages.catalogBackError
      case "project.start":
        return errorMessages.startError
      case "project.restart":
        return errorMessages.restartError
      case "project.replaceHash":
        return errorMessages.replaceHashError
      case "git.push":
        return errorMessages.gitPushError
      case "git.pull":
        return errorMessages.gitPullError
      case "publish.upload":
        return errorMessages.publishUploadError
    }
  }

  /**
   * 调用部署行为
   * @param { string } 行为
   * @param { array } 调用数组
   * @return {object} 调用结果
   */
  call (action, args) {
    const actionHandler = this.getActionHandler(action)
    
    if (actionHandler) {
      const success = actionHandler.apply(this.context, args)

      if (success) {
        return {
          success: true,
          message: "execute success"
        }
      } else {
        return {
          success: false,
          message: this.getActionErrorMsg(action)
        }
      }
    } else {
      return {
        success: false,
        message: "未知行为名称"
      }
    }
  }
}

module.exports = Proxy
