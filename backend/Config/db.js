const mysql = require("mysql2/promise");

const db = mysql.createPool({
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    waitForConnections: true,
    connexionLimit: 10,
    queueLimit: 0,
})

console.log("Mysql connectés");

module.exports = db;