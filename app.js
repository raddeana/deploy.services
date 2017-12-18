/**
 * 服务入口文件
 * @author mulbrrey
 */

const path = require('path')
const express = require('express')

const app = express()
const static = express.static(path.join(__dirname, 'www/static'), {
  maxAge: '30d',
})

app.use(static)
 
app.get('/deploy/nodejs', (req, res) => {
  res.send('Hello World')
})

app.get('/deploy/php', (req, res) => {
  res.send('Hello World')
})

app.get('/deploy/java', (req, res) => {
  res.send('Hello World')
})

app.get('/deploy/cpp', (req, res) => {
  res.send('Hello World')
})
 
app.listen(3030)