/**
 * mongo db
 * @author Philip
 */
const config = require("../config/mongo")
const Server = require("mongodb").Server
const DataSource = require("mongodb").Db

module.exports = new DataSource(config.databaseName, new Server(config.host, config.port, {
    poolSize: 5
}))