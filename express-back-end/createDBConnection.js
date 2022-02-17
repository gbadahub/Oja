const { Client } = require('pg/lib');

//DB
const createConnection= () => {


  const client = new Client({
    user: 'ojaadmin',
    password: 'ojaadmin',
    host: 'localhost', 
    database: 'oja',
    port: 5432
  })
  console.log(process.env)
  client.connect()
  
  client.query('SELECT NOW()', (err, res) => (
    console.log(err, res)
  ))

  return client;
};

exports.createConnection = createConnection;
