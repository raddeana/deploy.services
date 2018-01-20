/**
 * 一些配置
 * @author mulberry
 */

// 项目开发语言配置
module.exports.type = {
  "blog": "java",
  "deploy.services": "node",
  "blog.images": "static",
  "blog.libs": "static",
  "blog.web": "static",
  "blog.admin.web": "static",
  "blog.app": "cordova",
  "blog.robot": "static",
  "blog.robot.web": "static",
  "blog.app.webchat": "webchat",
  "blog.apis": "php",
  "blog.services": "node",
};

// 重启项目
module.exports.restart = {
  /**
   * 静态资源
   * @return none
   */
  static: function (project) {
    echo('Info: restart\t' + project + '\tsuccess');
  },
  /**
   * 微信
   * @return none
   */
  webchat: function (project) {
    echo('Info: restart\t' + project + '\tsuccess');
  },
  /**
   * cordova
   * @return none
   */
  cordova: function (project) {
    echo('Info: restart\t' + project + '\tsuccess');
  },
  /**
   * java 重启项目
   * @return none
   */
  java: function (project) {
    if (exec('gradle build').code !== 0) {
      echo('Warning: build failed');
      echo('Info: restart\t' + project + '\tsuccess');
    }
  },
  /**
   * php 重启项目
   * @return none
   */
  php: function (project) {
    echo('Info: restart\t' + project + '\tsuccess');
  },
  /**
   * python 重启项目
   * @return none
   */
  python: function (project) {
    if (exec('uwsgi --reload app_uwsgi.pid').code !== 0) {
      echo('Warning: restart failed');
      echo('Warning: try to start the app');

      if(exec('uwsgi --init app_uwsgi.ini').code !== 0) {
        echo('Error: restart\t' + project + '\tfailed');
        return;
      }

      echo('Info: restart\t' + project + '\tsuccess');
    }
  },
  /**
   * node 重启项目
   * @return none
   */
  node: function (project) {
    if (exec('pm2 restart ' + project).code !== 0) {
      echo('Warning: restart failed');
      echo('Warning: try to start the app');

      if(exec('pm2 start --name="' + project + '" npm -- start').code !== 0) {
        echo('Error: restart\t' + project + '\tfailed');
        return;
      }

      echo('Info: restart\t' + project + '\tsuccess');
    }
  },
};

// 项目路径配置
module.exports.path = {
  "blog.images": "~/projects/blog.images",
  "blog.libs": "~/projects/blog.libs",
  "blog.web": "~/projects/blog.web",
  "blog.admin.web": "~/projects/blog.admin.web",
  "blog.app": "~/projects/blog.app",
  "blog": "~/projects/blog",
  "blog.app.webchat": "~/projects/blog.app.webchat",
  "blog.apis": "~/projects/blog.apis",
  "blog.robot": "~/projects/blog.robot",
  "blog.robot.web": "~/projects/blog.robot.web",
  "blog.services": "~/projects/blog.services",
};

const gitMulberryUrl = 'https://github.com/mulberryx';

// 项目路径配置
module.exports.gitHttpUrls = {
  "blog.images": `${gitMulberryUrl}/blog.images`,
  "blog.libs": `${gitMulberryUrl}/blog.libs`,
  "blog.web": `${gitMulberryUrl}/blog.web`,
  "blog.admin.web": `${gitMulberryUrl}/blog.admin.web`,
  "blog.app": `${gitMulberryUrl}/blog.app`,
  "blog": `${gitMulberryUrl}/blog`,
  "blog.app.webchat": `${gitMulberryUrl}/blog.app.webchat`,
  "blog.apis": `${gitMulberryUrl}/blog.apis`,
  "blog.robot": `${gitMulberryUrl}/blog.robot`,
  "blog.robot.web": `${gitMulberryUrl}/blog.robot.web`,
  "blog.services": `${gitMulberryUrl}/blog.services`,
  "deploy.services": `${gitMulberryUrl}/deploy.services`,
};

// 项目静态空间
module.exports.static = {
  "blog.images": {
    
  },
  "blog.libs": {
    
  },
  "blog.web": {
    
  },
  "blog.admin.web": {
    
  },
  "blog.app": {
    
  },
  "blog.app.webchat": {
    
  },
  "blog.robot.web": {
    
  },
};