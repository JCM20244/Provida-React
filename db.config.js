
const mysql  = require('mysql2');
const con = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "root",
  database: "reagent",
}
);
module.exports = con;
