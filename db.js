const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "todo_db",
    password: "nikhil123",
    port: 5432
});

module.exports = pool;