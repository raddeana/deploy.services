/**
 * 一些配置
 * @author philip
 */

var restart = require('./restart');
var publish = require('./publish');
var synchronization = require('./synchronization');

var back = function () {
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