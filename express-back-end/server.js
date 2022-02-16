const Express = require('express');
const App = Express();
const BodyParser = require('body-parser');
const { application } = require('express');
const PORT = 8080; 
const router = Express.Router();
const db = require("./db")
const userRouter = require ("./routes/users")
const userQueries = require("./Queries/user_queries")
const cors = require("cors")


// Express Configuration
App.use(BodyParser.urlencoded({ extended: false }));
App.use(BodyParser.json());
App.use(Express.static('public'));
App.use(cors())

userRouter(router, userQueries)
App.use("/api/v1/users", router)

// Sample GET route
App.get('/api/data', (req, res) => res.json({
  message: "Seems to work!",
}));


// App.post("/register", (req, res)=>{
//   console.log("paylo", req.body)
//   const abc = {
//     name: "xyz",
//   };
//   res.json(abc);
// })

// // registration page 
// App.post("/register", (req , res) => {
//   if (user){
//     return res.status(400).json({"User":" This user exists"})
//   }
  

// })

App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
});
