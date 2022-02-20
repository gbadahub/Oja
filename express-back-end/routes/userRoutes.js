const bcrypt = require('bcrypt');
<<<<<<< HEAD
const { addUser } = require('../database');
// const cookieSession = require('cookieSession');
const app = require('express')()
=======
const { addUser, getUserFromUserEmail, getUserWithId } = require('../database');
// require the rest of the function after 
>>>>>>> 98aa4fbe440f0a24848ef7e7debcccfc6323808a


// app.use(cookieSession({
//   name: 'session',
//   keys: ['key1']
// }));
// require the rest of the function after 

module.exports = function (router, database) {
  // create a new user in registration page
  router.post('/register', (req, res) => {
    const user = req.body.formDetails;
    console.log(user);
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(user.password, salt);
    addUser(user)
      .then(user => {
        if (!user) {
          res.json({ error: "error" });
          return;
        }
        req.session.userId = user.id;
        res.send("🤗");
      })
      .catch(e => res.send(e.message));
  });

  /**
 * Check if a user exists with a given username and password
 * @param {String} email
 * @param {String} password encrypted
 */
  const login = function (email, password) {
    return (
      // MAKE SURE TO USE NEW USER
      // need help to redirect it to homepage?
      getUserFromUserEmail(email)
      .then(user => {
        console.log('pwd:', user.password)
        console.log('hashPwd:', bcrypt.compareSync(password, user.password))
        if (bcrypt.compareSync(password, user.password)) {
          return user;
        }
        return null;
      })
    );
  }
  // exports.login = login;

  router.post('/login', (req, res) => {
    const { email, password } = req.body.formDetails;
    login(email, password)
      .then(user => {
        if (!user) {
          res.json({ error: "error" });
          return;
        }
        req.session.userId = user.id;
        res.json({ user: { name: user.first_name, email: user.email, id: user.id } });
      })
      .catch(e => res.send(e.message));  
  });

  router.post('/logout', (req, res) => {
    req.session.userId = null;
    res.send({});
  });

  router.get("/me", (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
      res.send({ message: "not logged in" });
      return;
    }

    getUserWithId(userId)
      .then(user => {
        if (!user) {
          res.send({ error: "no user with that id" });
          return;
        }

        res.send({ user: { name: user.first_name, email: user.email, id: user.id } });
      })
      .catch(e => res.send(e));
  });

  return router;
}


// is creating an item a user_query 