/**
 * 路由配置
 * @author Philip
 */

const recordController = require("./controllers/record")
const projectController = require("./controllers/project")
const githookController = require("./controllers/githook")
const authorizeController = require("./controllers/authorize")
const csrf = require('csurf')

// csrf
const csrfProtection = csrf({ cookie: true })

module.exports = (app) => {
  // 首页
  app.get("/", (req, res) => {
    res.render("index.html")
  })

  // 登陆页
  app.get("/login", (req, res) => {
    res.render("login.html")
  })

  // 管理员
  app.get("/admin", csrfProtection, (req, res) => {
    res.render("admin/index.html", { 
      csrfToken: req.csrfToken(),
      name: 'index'
    })
  })

  // 图表
  app.get("/charts", csrfProtection, (req, res) => {
    res.render("admin/charts.html", { 
      csrfToken: req.csrfToken(),
      name: 'charts'
    })
  })

  // 项目
  app.get("/projects", csrfProtection, (req, res) => {
    res.render("admin/projects.html", { 
      csrfToken: req.csrfToken(),
      name: 'projects'
    })
  })

  // 记录
  app.get("/records", csrfProtection, (req, res) => {
    res.render("admin/records.html", { 
      csrfToken: req.csrfToken(),
      name: 'records'
    })
  })

  // 查询发布记录
  app.post("/api/login", (req, res) => {
    authorizeController.login(req, res)
  })

  // 查询发布记录
  app.post("/logout", (req, res) => {
    authorizeController.logout(req, res)
  })

  // 查询发布记录
  app.get("/api/record", (req, res) => {
    recordController.query(req, res)
  })
  
  // 删除发布记录
  app.delete("/api/record/:id", csrfProtection, (req, res) => {
    recordController.delete(req, res)
  })

  // 查询项目
  app.get("/api/projects", (req, res) => {
    projectController.query(req, res)
  })

  // 更新项目ID
  app.put("/api/project/:id", csrfProtection, (req, res) => {
    projectController.update(req, res)
  })
  
  // 创建项目
  app.post("/api/project", csrfProtection, (req, res) => {
    projectController.create(req, res)
  })

  // 删除项目
  app.delete("/api/project/:id", csrfProtection, (req, res) => {
    projectController.delete(req, res)
  })

  // github hook 接口
  app.post("/api/git/release", (req, res) => {
    githookController.post(req, res)
  })
}
