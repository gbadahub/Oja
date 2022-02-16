const usersDB = {
  users: require('Oja/db/seeds/01_users_seeds.sql'), 
  setUsers: function (data) { this.users = data}
}

const bcrypt = require('bcrypt');

const handleLogin = async (req, res) => {
    const {user, pwd} = req.body; 
  if (!user || !pwd) return res.status(400).json({'Message': 'Username and password are required.'});

  const foundUser = usersDB.find(person => person.first_name === user );
  if (!foundUser) return res.sendStatus(401); //Unauthorized 
  // evaluate pass word 
  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {

    // maybe need JWTs to protect routes in api (normal toke, refreshtoken?)
    res.json({'success': `New user ${user} is logged in!`});
  } else {
    res.sendStatus(401);
  }
}

module.exports = {handleLogin}