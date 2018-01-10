/**
 * 服务入口文件
 * @author mulbrrey
 */

const path = require('path');
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const cors = require('./cors');
const statistics = require('./statistics');
const deploy = require('../services/deploy');

const app = express();
const base_dir = __dirname.replace('/server', '');
const static = express.static(path.join(base_dir, 'www/static'), {
  maxAge: '30d',
});

//指定模板引擎
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');

//指定模板位置
app.set('views', base_dir + '/www');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(static);
app.use(statistics);
app.use(cors);

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