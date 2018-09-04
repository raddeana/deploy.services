/**
 * git请求参数解析
 * @author Philip
 */

const git = require('../config/git')

/**
 * 请求参数解析
 * @param {object} 请求数据
 * @return {object} 可用配置对象
 */
module.exports = (data) => {
  const commits = data.commits
  const deploy = false

  const modified = []
  const removed = []
  const added = []
  const messages = []
  
  commits.forEach((commit) => {
    messages.push(commit.message)
    modified = modified.concat(commit.modified)
    removed = removed.concat(commit.removed)
    added = added.concat(commit.added)
  })

  const configure = {
    release: null,
    ref: data.ref,
    repository: data.repository.name,
    master_branch: data.repository.master_branch,
    default_branch: data.repository.default_branch,
    messages,
    modified,
    removed,
    added,
  }

  return configure
}
