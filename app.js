/**
 * 服务入口文件
 * @author mulbrrey
 */

const path = require('path');
const express = require('express');
const ejs = require('ejs');
const deploy = require('./services/deploy');

const app = express();
const static = express.static(path.join(__dirname, 'www/static'), {
  maxAge: '30d',
});

//指定模板引擎
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');

//指定模板位置
app.set('views', __dirname + '/www');

app.use(static);

app.get('/', (req, res) => {
  res.render('index.html');
});

app.get('/statistics', (req, res) => {
  res.render('statistics.html');
});

app.post('/deploy', (req, res) => {
  deploy(req, res);
});

app.listen(3030);