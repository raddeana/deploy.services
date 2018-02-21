/**
 * 服务入口文件
 * @author tmuffin
 */

import path from 'path'
import express from 'express'
import ejs from 'ejs'
import bodyParser from 'body-parser'
import multer from 'multer'
import cors from './middlewares/cors'
import statistics from './middlewares/statistics'
import deploy from './deploy'
import './mongo'

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
app.use(multer())

app.use(static);
app.use(statistics);
app.use(cors);

app.get('/', (req, res) => {
  res.render('index.html');
})

app.post('/deploy', (req, res) => {
  deploy(req, res);
})

app.listen(3030)
