/**
 * 日志
 * @author Steudnera
 */

const Log = require('../mongo/log');

module.exports = (req, res, next) => {
  const data = req.body
  const commits = data.commits;

  if (commits) {
    let comment = [];

    commits.forEach(function (commit) {
      comment.push(commit.message)
    })

    const newLog = new Logs({
      type: '',
      action: 'push',
      repository: data.repository.name,
      comment: comment.join(','),
    })

    newLog.save(function (err) {
      if (err) {
        return console.error(err)
      }
    })
  }

  next()
}
