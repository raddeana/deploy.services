/**
 * 路由配置
 * @author tmuffin
 */

/**
 * 路由配置
 * @param {object} express app
 */
module.exports = (app) => {
  app.get('/', (req, res) => {
    res.render('index.html')
  })

  app.get('/logs', (req, res) => {
    getLogs(req, res)
  })

  app.post('/event/push', (req, res) => {
    pushHandler(req, res)
  })

  app.post('/event/release', (req, res) => {
    releaseHandler(req, res)
  })
}
