/**
 * 请求参数解析
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
  
  commits.forEach((commit) => {
    if (commit.message !== git.release && commit.message !== git.ignore) {
      deploy = true
    }

    modified = modified.concat(commit.modified)
    removed = removed.concat(commit.removed)
    added = added.concat(commit.added)
  })

  const configure = {
    deploy,
    ref: data.ref,
    project: data.repository.name,
    master_branch: data.repository.master_branch,
    modified,
    removed,
    added,
  }

  return configure
}
