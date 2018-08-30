/**
 * 路由配置
 * @author Philip
 */

const logController = require('./controllers/log')
const deployController = require('./controllers/deploy')
const projectController = require('./controllers/project')

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.render('index.html')
  })

  app.get('/admin', (req, res) => {
    res.render('admin.html')
  })

  app.get('/api/logs', (req, res) => {
    logController.query(req, res)
  })
  
  app.get('/api/projects', (req, res) => {
    projectController.query(req, res)
  })

  app.put('/api/projects/:id', (req, res) => {
    projectController.update(req, res)
  })
  
  app.post('/api/projects/:id', (req, res) => {
    projectController.create(req, res)
  })
  
  app.post('/api/event/push', (req, res) => {
    deployController.push(req, res)
  })

  app.post('/api/event/release', (req, res) => {
    deployController.release(req, res)
  })
}
