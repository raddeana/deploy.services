/**
 * 七牛
 * @author tmuffin
 */

export const accessKey = "KcH25vxJ8THYo9ExNp_-Kobr-TebdAZLss-JuLvD"
export const secretKey = "y82r6nTrPeQpjs5UXRdHlwePZh_9nFKIS-6gJFEn"

export const adminBucket = "blog-admin"
export const webBucket = "blog-web"
export const libsBucket = "blog-libs"
export const appBucket = "blog-app"
export const materialsBucket = "blog-materials"

export const adminDomain = "p4i7ftd65.bkt.clouddn.com"
export const webDomain = "p4i7qqywc.bkt.clouddn.com"
export const libsDomain = "p4i8e3nz8.bkt.clouddn.com"
export const appDomain = "p4i8x9qcb.bkt.clouddn.com"
export const materialsDomain = "p4i8d5jo9.bkt.clouddn.com"

export const buckets = {
  "blog.materials": materialsBucket,
  "blog.libs": libsBucket,
  "blog.web": webBucket,
  "blog.admin.web": adminBucket,
  "blog.app": appBucket,
  "blog.app.webchat": appBucket,
  "blog.robot.web": webBucket,
}

export const domains = {
  "blog.materials": adminDomain,
  "blog.libs": libsDomain,
  "blog.web": webDomain,
  "blog.admin.web": adminDomain,
  "blog.app": appDomain,
  "blog.app.webchat": appDomain,
  "blog.robot.web": webDomain,
}

/**
 * 获取项目bucket
 */
export function getBucket (project) {
  return buckets[project]
}

/**
 * 获取项目domain
 */
export function getDomain (project) {
  return domains[project]
}