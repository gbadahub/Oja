require('dotenv').config();
const Pool = require("pg").Pool;

const client = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT
});
// const client = new pg.Client({
//   connectionString: process.env.DATABAS_URL || "",
//   ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
// });
// console.log(process.env.DATABASE_URL);

client
  .connect()
  .catch(e => console.log(`Error connecting to Postgres server:\n${e}`));


module.exports = client;