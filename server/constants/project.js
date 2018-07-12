/**
 * 一些配置
 * @author steudnera
 */

const git = 'https://github.com/steudnera'
const path = '~/'

// 项目开发语言配置
export const type = {
  blog: "java",
  "blog.materials": "static",
  "blog.libs": "static",
  "blog.web": "static",
  "blog.admin.web": "static",
  "blog.app": "cordova",
  "blog.robot": "python",
  "blog.robot.web": "static",
  "blog.apis": "node",
  "blog.services": "node",
  "deploy.services": "node",
}

// 项目路径配置
export const path = {
  blog: `${path}/blog`,
  "blog.materials": `${path}/blog.images`,
  "blog.libs": `${path}/blog.libs`,
  "blog.web": `${path}/blog.web`,
  "blog.admin.web": `${path}/blog.admin.web`,
  "blog.apis": `${path}/blog.apis`,
  "blog.robot": `${path}/blog.robot`,
  "blog.robot.web": `${path}/blog.robot.web`,
  "blog.services": `${path}/blog.services`,
}

// 项目路径配置
export const libraries = {
  blog: `${git}/blog`,
  "blog.materials": `${git}/blog.materials`,
  "blog.libs": `${git}/blog.libs`,
  "blog.web": `${git}/blog.web`,
  "blog.admin.web": `${git}/blog.admin.web`,
  "blog.app": `${git}/blog.admin.app`,
  "blog.apis": `${git}/blog.apis`,
  "blog.robot": `${git}/blog.robot`,
  "blog.robot.web": `${git}/blog.robot.web`,
  "blog.services": `${git}/blog.services`,
  "deploy.services": `${git}/deploy.services`,
}
