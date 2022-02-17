const { Pool, Client } = require('pg/lib');

//DB
const createConnection= () => {


  const client = new Client({
    user: 'ojaadmin',
    password: 'ojaadmin',
    host: 'localhost', 
    database: 'Oja',
    port: 5432
  })

  client.connect()
  
  client.query('SELECT NOW()', (err, res) => (
    console.log(err, res)
  ))

  return client;
};

export createConnection;
