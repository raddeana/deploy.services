/**
 * 服务入口文件
 * @author tmuffin
 */

const path = require('path')
const express = require('express')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const expressMongoose = require('express-mongoose')
const mongo = require('./mongo')
const cors = require('./middlewares/cors')
const logs = require('./middlewares/logs')
const deploy = require('./controllers/deploy')
const getLogs = require('./controllers/logs')

const app = express()
const base_dir = __dirname.replace('/server', '')
const static = express.static(path.join(base_dir, 'www/static'), {
  maxAge: '30d',
})

// 指定模板引擎
app.engine('.html', require('ejs').__express)
app.set('view engine', 'html')

// 指定模板位置
app.set('views', base_dir + '/www')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(static)
app.use(cors)
app.use(logs)

app.get('/', (req, res) => {
  res.render('index.html')
})

app.post('/deploy', (req, res) => {
  deploy(req, res)
})

app.post('/logs', (req, res) => {
  getLogs(req, res)
})

app.listen(3030)
