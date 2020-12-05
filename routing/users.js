const router = require('express').Router()
const controller = require('../controller/usersController')


router.post('/register', controller.register)
router.post('/login',controller.login)

module.exports=router