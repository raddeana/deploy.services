/**
 * 一些配置
 * @author tmuffin
 */

const shelljs = require('shelljs/global');

if (!which('git')) {
  echo('Sorry, this script requires git');
  exit(1);
}

module.exports.exec = function () { 
  if (exec('git pull').code !== 0) {
    echo('Error: pull failed');
    exit(1);
  }
};
