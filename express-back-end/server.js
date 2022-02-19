const {createConnection} = require('./db/index');
const db_oja = createConnection();
const createUserRoutes = require('./routes/userRoutes');
const createOjaRoutes = require('./routes/ojaRoutes');

const express = require('express');
const BodyParser = require('body-parser');
const Router = express.Router();


const cors = require("cors");
const cookieSession = require('cookie-session');

const App = express();

// require the db and connection creation function 
// create connection with db 
// pass connection into routes file 

// did I get cookie-session properly?
App.use(cookieSession({
  name: 'session',
  keys: ['key1']
}));


// Express Configuration
App.use(BodyParser.urlencoded({ extended: false }));
App.use(BodyParser.json());

App.use(cors())
App.use(express.static('public'));

// oja endpoints 
const ojaRouter = Router; 
createOjaRoutes(ojaRouter, db_oja);
App.use('/api', ojaRouter);


// /user/endpoints
const userRouter = Router;
createUserRoutes(userRouter, db_oja);
App.use('/users', userRouter);


App.get("/test", (req, res) => {
  res.send("🤗");
});

const PORT = 8080;

App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
});
