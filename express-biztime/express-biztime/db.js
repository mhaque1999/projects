/** Database setup for BizTime. */

const {Client} = require("pg")
//import "dotenv/config.js";
require('dotenv').config()

let DB_URI;

if (process.env.NODE_ENV === "test") {
    DB_URI = "postgresql:///biztime_test";
  } 
else {
    DB_URI = "postgresql:///biztime";
  }
  
/* const db = new Client({
    connectionString: DB_URI
}); */

const db = new Client({
  user:"maahin",
  host: "localhost",
  database: "biztime",
  port: 5432,
  password: process.env.PGPASSWORD,

})

if (db.password) {
  console.log('Password is provided:', db.password);
} else {
  console.log('No password is provided.');
}
  
db.connect();
  
module.exports = db;