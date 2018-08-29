/**
 * 服务入口文件
 * @author Philip
 */

const path = require('path')
const express = require('express')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const mongo = require('./model/mongo')
const corsMiddleware = require('./middlewares/cors')
const logMiddleware = require('./middlewares/log')
const routes = require('./routes')

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
app.use(corsMiddleware)
app.use(logMiddleware)

routes(app)

app.listen(3030)
