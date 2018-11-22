/**
 * 路由配置
 * @author Philip
 */

const recordController = require("./controllers/record")
const githookController = require("./controllers/githook")
const projectController = require("./controllers/project")

module.exports = (app) => {
  app.get("/", (req, res) => {
    res.render("index.html")
  })

  app.get("/login", (req, res) => {
    res.render("login.html")
  })
  
  app.get("/admin", (req, res) => {
    res.render("admin.html")
  })

  app.get("/api/record", (req, res) => {
    recordController.query(req, res)
  })
  
  app.delete("/api/delete", (req, res) => {
    recordController.delete(req, res)
  })

  app.get("/api/projects", (req, res) => {
    projectController.query(req, res)
  })

  app.put("/api/projects/:id", (req, res) => {
    projectController.update(req, res)
  })
  
  app.post("/api/projects/:id", (req, res) => {
    projectController.create(req, res)
  })

  app.post("/api/git/release", (req, res) => {
    githookController.release(req, res)
  })
}
