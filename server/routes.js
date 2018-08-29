/**
 * 路由配置
 * @author Philip
 */

const authController = require('./controllers/auth')
const deployController = require('./controllers/deploy')
const logController = require('./controllers/log')

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.render('index.html')
  })

  app.get('/admin', (req, res) => {
    res.render('admin.html')
  })

  app.post('/api/admin/login', (req, res) => {
    authController.login(req, res)
  })

  app.post('/api/admin/resetpassword', (req, res) => {
    authController.resetPassword(req, res)
  })

  app.get('/api/logs', (req, res) => {
    logController.query(req, res)
  })

  app.delete('/api/log/:id', (req, res) => {
    logController.remove(req, res)
  })

  app.post('/api/event/push', (req, res) => {
    deployController.push(req, res)
  })

  app.post('/api/event/release', (req, res) => {
    deployController.release(req, res)
  })
}
