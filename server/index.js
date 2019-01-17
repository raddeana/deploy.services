/**
 * 服务入口文件
 * @author Philip
 */
const path = require("path")
const express = require("express")
const session = require("express-session")
const cookieParser = require("cookie-parser")
const ejs = require("ejs")
const bodyParser = require("body-parser")
const mongoose = require('mongoose')
const { url, secret } = require("./config/mongo")
const connect = require("./services/mongo")
const corsMiddleware = require("./middlewares/cors")
const authMiddleware = require("./middlewares/auth")
const routes = require("./routes")

const app = express()
const baseDir = __dirname.replace(/(\\|\/)server/, "")
const midStatic = express.static(path.join(baseDir, `www${path.sep}static`), {
    maxAge: "30d"
})

// 连接数据库
mongoose.connect(url, { useNewUrlParser: true });

// 指定模板引擎
app.engine(".html", require("ejs").__express)
app.set("view engine", "html")

// 指定模板位置
app.set("views", baseDir + `${path.sep}www`)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(midStatic)

const db = require("./services/mongo")
const MongoStore = require("connect-mongo")(session)

app.use(cookieParser(secret))
app.use(session({
    secret,
    store: new MongoStore({
        url,
        db
    }),
    saveUninitialized: false,
    httpOnly: true,
    cookie: {
        maxAge: 1000 * 60 * 30
    }
}))

app.use(corsMiddleware)
app.use(authMiddleware)

routes(app)

app.listen(3030)
