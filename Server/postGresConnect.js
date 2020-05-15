const pg = require("pg");
const db = new pg.Pool({
  host: process.env.HOST,
  port: process.env.PORT,
  user: process.env.PGUSER,
  password: process.env.PASS,
  database: process.env.DBNAME,
  max: 25,
});

db.connect((err) => {
  if (err) console.log(err);
  else console.log("connect");
});

module.exports = db;
