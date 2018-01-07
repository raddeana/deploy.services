/**
 * 一些配置
 * @author philip
 */

const shelljs = require('shelljs/global');

module.exports.exec = function () { 
  if (exec('pm2 restart ' + project).code !== 0) {
    echo('Warning: restart failed');
    echo('Warning: try to start the app');

    if(exec('pm2 start --name="' + project + '" npm -- start').code !== 0) {
      echo('Error: restart ' + project + ' failed');
      return;
    }

    echo('info: restart ' + project + ' success');
  }
};