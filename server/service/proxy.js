/**
 * 部署相关行为代理
 * @author Philip
 */
 
// 行为错误信息
const errorMessages = require("../constant/errorMessages")

// 部署服务
const npm = require("./npm")
const git = require("./git")
const catalog = require("./catalog")
const project = require("./project")

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
        let result = null

        switch (action) {
            case "npm.build":
                result = npm.build.bind(npm)
            case "catalog.to":
                result = catalog.to.bind(catalog)
            case "catalog.back":
                result = catalog.back.bind(catalog)
            case "project.start":
                result = project.start.bind(project)
            case "project.restart":
                result = project.restart.bind(project)
            case "project.replaceHash":
                result = project.replaceHash.bind(project)
            case "git.push":
                result = git.push.bind(git)
            case "git.pull":
                result = git.pull.bind(git)
        }

        return result
    }
  
    /**
     * 获取行为错误信息
     * @param {string} 行为
     * @return {string} 行为错误信息
     */
    getActionErrorMsg (action) {
        let { 
            BUILDERROR,
            TOPROJECTERROR,
            BACKDEPLOYERROR,
            STARTERROR,
            RESTARTERROR,
            REPLACEHASHERROR,
            PUSHERROR,
            PULLERROR
        } = errorMessages;

        switch (action) {
            case "build":
                return BUILDERROR
            case "catalog.to":
                return TOPROJECTERROR
            case "catalog.back":
                return BACKDEPLOYERROR
            case "project.start":
                return STARTERROR
            case "project.restart":
                return RESTARTERROR
            case "project.replaceHash":
                return REPLACEHASHERROR
            case "git.push":
                return PUSHERROR
            case "git.pull":
                return PULLERROR
        }
    }

  /**
   * 调用部署行为
   * @param {string} 行为
   * @param {array} 调用数组
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
