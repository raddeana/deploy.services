const config = require("../config/session")
const DataSource = require("mongodb").Db
const Server = require("mongodb").Server

const db = new DataSource(config.db, new Server(config.host, config.port, { 
    auto_reconnect: true, 
    native_parser: true
}), { safe: false })

module.exports = db
