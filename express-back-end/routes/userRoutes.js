const bcrypt = require('bcrypt'); 

module.exports = function(router, database)  {
  

  // create a new user in registration page
  router.post('/register', (req, res) => {
    const user = req.body;
    user.password = bcrypt.hashSync(user.password, 12);
    database.addUser(user)
    .then(user => {
      if (!user) {
        res.json({error: "error"});
        return;
      }
      req.session.userId = user.id;
      res.json("🤗");
    })
    .catch(e => res.json(e));
  });
  
    /**
   * Check if a user exists with a given username and password
   * @param {String} email
   * @param {String} password encrypted
   */
  const login =  function(email, password) {
    return database.getUserFromUserEmail(email) 
    .then(user => {
      if (bcrypt.compareSync(password, user.password)) {
        return user;
      }
      return null;
    });
  }
  exports.login = login;

  router.post('/login', (req, res) => {
    const {email, password} = req.body;
    login(email, password)
      .then(user => {
        if (!user) {
          res.json({error: "error"});
          return;
        }
        req.session.userId = user.id;
        res.json({user: {name: user.first_name, email: user.email, id: user.id}});
      })
      .catch(e => res.json(e));
  });
  
  router.post('/logout', (req, res) => {
    req.session.userId = null;
    res.send({});
  });
  
   router.get("/me", (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
      res.send({message: "not logged in"});
      return;
    }

    database.getUserWithId(userId)
      .then(user => {
        if (!user) {
          res.send({error: "no user with that id"});
          return;
        }
    
        res.send({user: {name: user.first_name, email: user.email, id: user.id}});
      })
      .catch(e => res.send(e));
  });

  return router;
}


// is creating an item a user_query 