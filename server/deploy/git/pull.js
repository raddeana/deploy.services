/**
 * 拉取代码
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

const back = function () {
  return cd('../deploy-services');
};

module.exports.exec = function (project, lng, cdn) { 
  if(cd('../' + project).code === 0){
    if (exec('git checkout -- . && git clean -df').code !== 0) {
      echo('Error: clean failed');
      return back();
    }

    synchronization.exec();  

    if (cdn) {
      publish.exec();
    }
      
    restart.exec(lng, project);      

    if (exec('git clean -f && git add -A && git commit -m"auto@publish" && git push').code !== 0) {
      echo('Error: commit failed');
      return back();
    }
  } else {
    echo('Error: No project found');
    return back();
  }
};