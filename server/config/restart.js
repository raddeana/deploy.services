/**
 * 重启项目
 * @author tmuffin
 */

export default {
  /**
   * 静态资源
   * @return none
   */
  static: function (project) {
    echo('Info: \t' + project + '\tis a app, skip');
  },
  /**
   * 微信 项目
   * @return none
   */
  webchat: function (project) {
    echo('Info: \t' + project + '\tis a app, skip');
  },
  /**
   * cordova 项目
   * @return none
   */
  cordova: function (project) {
    echo('Info:\t' + project + '\tis a app, skip');
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
}
