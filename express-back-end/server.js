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

App.use(cookieSession({
  name: 'session',
  keys: ['key1'], 
  secure: false
}));


// Express Configuration
App.use(BodyParser.urlencoded({ extended: false }));
App.use(BodyParser.json());

App.use(cors({credentials: true}));
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
  // const mySession= req.session;
  // console.log('mySession------', mySession);
  res.send("🤗");
});

const PORT = 8080;

App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
});
