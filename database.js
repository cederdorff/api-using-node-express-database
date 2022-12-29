const mysql = require("mysql2"); // using mysql2 - an install npm library
require("dotenv").config(); // Read the environment variables

// using the variables from the .env file
// and creates the connection to database
const mysqlConnection = mysql.createConnection({
    host: process.env.HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.MYSQL_USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    multipleStatements: true
});

// exports database connection
module.exports = mysqlConnection;
