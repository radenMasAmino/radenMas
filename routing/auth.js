const express = require('express')
const router = express.Router()
const Controller = require('../controller/googleLoginController');


router.get('/google', Controller.authenticateGoogle())

router.get('/google/callback', Controller.authentication(),Controller.callbackGoogle)

module.exports=router