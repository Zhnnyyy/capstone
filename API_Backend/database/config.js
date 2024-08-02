const mysql = require("mysql2");
const fs = require("fs");
require("dotenv").config();
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.HOST,
  user: process.env.user,
  port: process.env.port,
  password: process.env.pass,
  database: process.env.db,
});

// const pool = mysql.createPool({
//   connectionLimit: 10,
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "clddigitals",
// });

const startQuery = (sql, params, transaction = null) => {
  return new Promise((resolve, reject) => {
    const connection = transaction || pool;
    connection.query(sql, params, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
module.exports = { startQuery };
