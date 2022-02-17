require('dotenv').config();
const Pool = require("pg").Pool;


// IS THIS FILE NECESSARY IF DB_CONNECTIONS FILE EXISTS 


// const client = new Pool({
//   user: process.env.PGUSER,
//   host: process.env.PGHOST,
//   database: process.env.PGDATABASE,
//   password: process.env.PGPASSWORD,
//   port: process.env.PGPORT
// });
// // const client = new pg.Client({
// //   connectionString: process.env.DATABAS_URL || "",
// //   ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
// // });
// // console.log(process.env.DATABASE_URL);

// client
//   .connect()
//   .catch(e => console.log(`Error connecting to Postgres server:\n${e}`));


// module.exports = client;

//DB
const createConnection= () => {

  const client = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
  })
  console.log(process.env)
  client.connect()
  
  client.query('SELECT NOW()', (err, res) => (
    console.log(err, res)
  ))

  return client;
};

exports.createConnection = createConnection;
