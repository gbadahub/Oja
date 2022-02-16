const express = require('express');
const router = express.router(); 
const authController = require('Oja/express-back-end/controllers/authController.js');

router.post('/', authController.handleLogin );


module.exports = router;
 