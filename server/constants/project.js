/**
 * 项目配置
 * @author Steudnera
 */

const git = 'https://github.com/steudnera'
const path = '~/'

// 项目开发语言配置
export const types = {
  blog: "java",
  "blog.web": "static",
  "blog.admin": "node",
  "blog.admin.web": "static",
  "blog.robot": "python",
  "blog.robot.web": "static",
  "blog.apis": "node",
  "blog.services": "node",
  "blog.games": "node",
  "blog.portal": "node",
  "deploy.services": "node",
}

// 项目路径配置
export const paths = {
  blog: `${path}/blog`,
  "blog.web": `${path}/blog.web`,
  "blog.admin.web": `${path}/admin`,
  "blog.admin.web": `${path}/admin/www`,
  "blog.robot": `${path}/blog.robot`,
  "blog.robot.web": `${path}/blog.robot.web`,
  "blog.apis": `${path}/blog.apis`,
  "blog.services": `${path}/blog.services`,
  "blog.games": "node",
  "blog.portal": "node",
  "deploy.services": "node",
}

// 仓库地址
export const libraries = {
  blog: `${git}/blog`,
  "blog.web": `${git}/blog.web`,
  "blog.admin": `${git}/blog.admin`,
  "blog.admin.web": `${git}/blog.admin.web`,
  "blog.robot": `${git}/blog.robot`,
  "blog.robot.web": `${git}/blog.robot.web`,
  "blog.apis": `${git}/blog.apis`,
  "blog.services": `${git}/blog.services`,
  "blog.games": "node",
  "blog.portal": "node",
  "deploy.services": `${git}/deploy.services`,
}
