/**
 * 七牛
 * @author tmuffin
 */

// keys
module.exports.accessKey = "KcH25vxJ8THYo9ExNp_-Kobr-TebdAZLss-JuLvD"
module.exports.secretKey = "y82r6nTrPeQpjs5UXRdHlwePZh_9nFKIS-6gJFEn"

// buckets
module.exports.adminBucket = "blog-admin"
module.exports.webBucket = "blog-web"
module.exports.libsBucket = "blog-libs"
module.exports.appBucket = "blog-app"
module.exports.materialsBucket = "blog-materials"

// domains
module.exports.adminDomain = "p4i7ftd65.bkt.clouddn.com"
module.exports.webDomain = "p4i7qqywc.bkt.clouddn.com"
module.exports.libsDomain = "p4i8e3nz8.bkt.clouddn.com"
module.exports.appDomain = "p4i8x9qcb.bkt.clouddn.com"
module.exports.materialsDomain = "p4i8d5jo9.bkt.clouddn.com"

// qn bukect
module.exports.buckets = {
  "blog.materials": module.exports.materialsBucket,
  "blog.libs": module.exports.libsBucket,
  "blog.web": module.exports.webBucket,
  "blog.admin.web": module.exports.adminBucket,
  "blog.app": module.exports.appBucket,
  "blog.app.webchat": module.exports.appBucket,
  "blog.robot.web": module.exports.webBucket,
}

// qn域
module.exports.domains = {
  "blog.materials": module.exports.adminDomain,
  "blog.libs": module.exports.libsDomain,
  "blog.web": module.exports.webDomain,
  "blog.admin.web": module.exports.adminDomain,
  "blog.app": module.exports.appDomain,
  "blog.app.webchat": module.exports.appDomain,
  "blog.robot.web": module.exports.webDomain,
}

// 服务器文件路径映射
module.exports.server = {
  "blog.app": "",
  "blog.web": "",
  "blog.libs": "",
  "blog.admin.web": "",
  "blog.app.webchat": "",
  "blog.robot.web": "",
  "blog.materials": "",
}

/**
 * 获取项目 bucket
 * @return {string} bucket
 */
module.exports.getBucket = (project) => {
  return buckets[project]
}

/**
 * 获取项目 domain
 * @return {string} domain
 */
module.exports.getDomain = (project) => {
  return domains[project]
}
