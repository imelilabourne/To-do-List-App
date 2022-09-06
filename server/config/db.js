const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
const mysql = require('mysql2');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env. DB_PASSWORD
})


module.exports = pool.promise();