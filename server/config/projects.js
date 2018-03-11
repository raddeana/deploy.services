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
  "blog.apis": "node",
  "blog.services": "node",
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
  "blog.app.android": "~/projects/blog.app.android",
  "blog.apis": "~/projects/blog.apis",
  "blog.robot": "~/projects/blog.robot",
  "blog.robot.web": "~/projects/blog.robot.web",
  "blog.services": "~/projects/blog.services",
};

const gitUrl = 'https://github.com/tmuffin';

// 项目路径配置
module.exports.gitHttpUrls = {
  "blog.materials": gitUrl + 'blog.materials',
  "blog.libs": gitUrl + '/blog.libs',
  "blog.web": gitUrl + '/blog.web',
  "blog.admin.web": gitUrl + '/blog.admin.web',
  "blog.app": gitUrl + '/blog.app',
  "blog": gitUrl + '/blog',
  "blog.app.webchat": gitUrl + '/blog.app.webchat',
  "blog.app.android": gitUrl + '/blog.app.android',
  "blog.apis": gitUrl + '/blog.apis',
  "blog.robot": gitUrl + '/blog.robot',
  "blog.robot.web": gitUrl + '/blog.robot.web',
  "blog.services": gitUrl + '/blog.services',
  "deploy.services": gitUrl + '/deploy.services',
};