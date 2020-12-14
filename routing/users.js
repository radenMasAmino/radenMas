const router = require('express').Router()
const controller = require('../controller/usersController')
const authentification = require('../middleware/authentification')
const {authorizationAdmin} = require('../middleware/authorization')


router.post('/register', controller.register)
// router.post('/login',controller.login)
router.post('/login',authorizationAdmin,controller.login)
router.post('/update/:id',authentification,controller.update)
router.get('/list/:id',authentification,controller.list)
router.get('/all',authentification,controller.all)
router.delete('/delete/:id',authentification,controller.delete)
router.get('/details/:id',authentification,controller.details)


module.exports=router