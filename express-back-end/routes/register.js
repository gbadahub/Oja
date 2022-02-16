const express = require('express');
const router = express.router(); 
const registerController = require('Oja/express-back-end/controllers/registerController.js');

router.post('/', registerController.handleNewUser );


module.exports = router;
 