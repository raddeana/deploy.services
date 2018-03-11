/**
 * 页面配置
 * @author tmuffin
 */

module.exports.types = {
  css: "text/css",
  gif: "image/gif",
  html: "text/html",
  ico: "image/x-icon",
  jpeg: "image/jpeg",
  jpg: "image/jpeg",
  js: "text/javascript",
  json: "application/json",
  pdf: "application/pdf",
  png: "image/png",
  svg: "image/svg+xml",
  swf: "application/x-shockwave-flash",
  tiff: "image/tiff",
  txt: "text/plain",
  wav: "audio/x-wav",
  wma: "audio/x-ms-wma",
  wmv: "video/x-ms-wmv",
  xml: "text/xml",
}

module.exports.expires = {
  fileMatch: /^(gif|png|jpg|js|css)$/ig,
  maxAge: 60 * 60 * 24 * 365
}

module.exports.compress = {
  match: /css|js|html/ig
}

module.exports.welcome = {
  file: "index.html"
}
