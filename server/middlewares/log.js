/**
 * 日志中间件
 * @author Philip
 */
const Log = require('../dao/log')
const parseGitRequest = require('../services/parse-git-request')
const gitConfig = require('../config/git')
const gitHookApisMap = require('../config/git-hook-apis-map')

module.exports = async (req, res, next) => {
  const data = req.body
  
  if (gitHookApisMap.release !== req.url && gitHookApisMap.release !== req.url) {
    next()
    return
  }
  
  const parsed = parseGitRequest(data)
  
  let release = false
  
  parsed.messages.forEach((message) => {
    if (!gitConfig.autopush.test(message) && 
        !gitConfig.autorelease.test(message) && 
        !gitConfig.autoignore.test(message) && 
        (gitConfig.feature.test(message) || gitConfig.optimize.test(message) || gitConfig.bug.test(message))) {
      release = true
    }
  })
  
  parsed.release = release
  
  const log = await Log.create({
    release,
    ref: parsed.ref,
    repository: parsed.repository,
    messages: parsed.messages,
    modified: parsed.modified,
    removed: parsed.removed,
    added: parsed.added,
  })

  next(parsed, log._id)
}
