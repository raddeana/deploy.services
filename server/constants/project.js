/**
 * 项目配置
 * @author Steudnera
 */

const git = 'https://github.com/steudnera'
const path = '/root'

// 项目开发语言配置
module.exports.types = {
  blog: "java",
  "blog.web": "static",
  "blog.admin": "node",
  "blog.admin.web": "static",
  "blog.robot": "python",
  "blog.robot.web": "static",
  "blog.apis": "node",
  "blog.services": "node",
  "blog.games": "node",
  "blog.games.web": "static",
  "blog.portal": "node",
  "blog.portal.web": "static",
  "deploy.services": "node",
}

// 项目路径配置
module.exports.paths = {
  blog: `${path}/blog/server`,
  "blog.web": `${path}/blog/web`,
  "blog.admin.web": `${path}/admin/server`,
  "blog.admin.web": `${path}/admin/web`,
  "blog.robot": `${path}/robot`,
  "blog.robot.web": `${path}/robot/web`,
  "blog.apis": `${path}/apis`,
  "blog.services": `${path}/services`,
  "blog.games": `${path}/games/server`,
  "blog.games.web": `${path}/games/web`,
  "blog.portal": `${path}/portal/server`,
  "blog.portal.web": `${path}/portal/web`,
  "deploy.services": `${path}/deploy.services`,
}

// 仓库地址
module.exports.libraries = {
  blog: `${git}/blog`,
  "blog.web": `${git}/blog.web`,
  "blog.admin": `${git}/blog.admin`,
  "blog.admin.web": `${git}/blog.admin.web`,
  "blog.robot": `${git}/blog.robot`,
  "blog.robot.web": `${git}/blog.robot.web`,
  "blog.apis": `${git}/blog.apis`,
  "blog.services": `${git}/blog.services`,
  "blog.games": `${git}/blog.games`,
  "blog.games.web": `${git}/blog.games.web`,
  "blog.portal": `${git}/blog.portal`,
  "blog.portal.web": `${git}/blog.portal.web`,
  "deploy.services": `${git}/deploy.services`,
}
