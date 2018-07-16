/**
 * 请求参数解析
 * @author Steudnera
 */

const base = require('../config/base')

/**
 * 请求参数解析
 * @param {object} 请求对象
 * @return {object} 可用配置对象
 */
module.exports = (req) => {
  const data = req.body
  const commits = data.commits;

  const deploy = false

  let modified = []
  let removed = []
  let added = []
  
  commits.forEach(function (commit) {
    if (commit.message !== base.publish && commit.message !== base.ignore) {
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
