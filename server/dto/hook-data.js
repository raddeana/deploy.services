/**
 * 解析过的 git hook 数据
 * @author chenxiangyu
 */

class HookData {
  constructor (data) {
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

    const _data = {
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

    this.data = _data
  }

  /**
   * 获取
   * @return {object} 
   */
  get () {
    return this.data
  }
  
  /**
   * 设置
   * @param {string} 
   * @param {string} 
   * @return none
   */
  set (key, value) {
    this.data[key] = value
  }
}

module.exports = HookData
