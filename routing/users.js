const router = require('express').Router()
const controller = require('../controller/userscontroller')


router.post('/register', controller.register)
router.post('/login',controller.login)

module.exports=router