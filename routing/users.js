const router = require('express').Router()
const controller = require('../controller/usersController')
const authentification = require('../middleware/authentification')

router.post('/register', controller.register)
router.post('/login',controller.login)
router.post('/update/:id',authentification,controller.update)
router.get('/list/:id',authentification,controller.list)
router.get('/all',authentification,controller.all)
router.delete('/delete/:id',authentification,controller.delete)
router.post('/screening',authentification,controller.screening)
router.get('/details/:id',authentification,controller.details)


module.exports=router