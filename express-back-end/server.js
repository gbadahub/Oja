{createConnection} = require('./createDBConnection');
const db_oja = createConnection();
const createUserLoginRoutes = require('./routes/userRoutes');
const createOjaRoutes = require('./routes/ojaRoutes');

const Express = require('express');
const BodyParser = require('body-parser');
const cookieSession = require('cookie-session');

const App = Express();

// require the db and connection creation function 
// create connection with db 
// pass connection into routes file 

// did I get cookie-session properly?
app.use(cookieSession({
  name: 'session',
  keys: ['key1']
}));


// Express Configuration
App.use(BodyParser.urlencoded({ extended: false }));
App.use(BodyParser.json());

// oja endpoints 
const ojaRouter = express.router();
createOjaRoutes(ojaRouter, db_oja);
app.user('/api' ojaRouter);

// /user/endpoints
const userRouter = express.Router();
createUserLoginRoutes(userRouter, database);
app.use('/users', userRouter);


App.use(Express.static('public'));

app.get("/test", (req, res) => {
  res.send("🤗");
});

const PORT = 8080;
App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
});
