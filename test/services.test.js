/**
 * 服务测试
 * @author Philip
 */
const build = require('../../server/services/build')
const catalog = require('../../server/services/catalog')
const deploy = require('../../server/services/deploy')
const git = require('../../server/services/git')
const parseGitRequest = require('../../server/services/parse-git-request')
const publish = require('../../server/services/publish')
const errorMessages = require('../../server/constants/error-messages')

describe('deploy services', () => {
  it('build should be failed', () => {
    assert.equal(build().errorMsg, errorMessages.buildError)
  })
  
  it('catalog.to should be failed', () => {
    assert.equal(catalog.to().errorMsg, errorMessages.toProjectError)
  })
  
  it('catalog.back should be failed', () => {
    assert.equal(catalog.back().errorMsg, errorMessages.backDeployError)
  })
  
  it('deploy.start should be failed', () => {
    assert.equal(catalog.start().errorMsg, errorMessages.startError)
  })
  
  it('deploy.restart should be failed', () => {
    assert.equal(catalog.restart().errorMsg, errorMessages.restartError)
  })
  
  it('git.pull should be failed', () => {
    assert.equal(git.pull().errorMsg, errorMessages.pullError)
  })
  
  it('git.push should be failed', () => {
    assert.equal(git.push().errorMsg, errorMessages.pushError)
  })
  
  it('parse git request', () => {
    assert.equal(parseGitRequest({}), {})
  })
  
  it('publish.getConfigure', () => {
    assert.equal(publish.getConfigure(), null)
  })
})
