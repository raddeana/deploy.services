/**
 * 部署相关行为代理
 * @author
 */
 
// 行为错误信息
const errorMessages = require('../constants/error-messages');

// 部署行为
const build = require('./build');
const catalog = require('./catalog');
const project = require('./project');
const git = require('./git');
const qn = require('./qn');
const parseGitRequest = require('./parse-git-request');

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
    case 'build':
      return build
    case 'catalog.to':
      return catalog.to
    case 'catalog.back':
      return catalog.back
    case 'project.start':
      return project.start
    case 'project.restart':
      return project.restart
    case 'project.replaceStaticVersion':
      return project.replaceStaticVersion
    case 'git.push':
      return git.push
    case 'git.pull':
      return git.pull
    case 'parse-git-request':
      return parseGitRequest
    case 'qn.remove':
      return qn.remove.bind(qn)
    case 'qn.upload':
      return qn.upload.bind(qn)
    }
  }
  
  /**
   * 获取行为错误信息
   * @param { string } 行为
   * @return { string } 行为错误信息
   */
  getActionErrorMsg (action) {
    switch (action) {
    case 'build':
      return errorMessages.build
    case 'catalog.to':
      return errorMessages['catalog.to']
    case 'catalog.back':
      return errorMessages['catalog.back']
    case 'project.start':
      return errorMessages['project.start']
    case 'project.restart':
      return errorMessages['project.restart']
    case 'project.replaceStaticVersion':
      return errorMessages['project.replaceStaticVersion']
    case 'git.push':
      return errorMessages['git.push']
    case 'git.pull':
      return errorMessages['git.pull']
    case 'parse-git-request':
      return errorMessages['parse-git-request']
    case 'qn.remove':
      return errorMessages['qn.remove']
    case 'qn.upload':
      return errorMessages['qn.upload']
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
          message: 'action execute success',
        }
      } else {
        return {
          success: false,
          message: this.getActionErrorMsg(action),
        }
      }
    } else {
      return {
        success: false,
        message: '未知行为名称',
      }
    }
  }
}

module.exports = Proxy
