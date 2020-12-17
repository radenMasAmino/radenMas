const router = require('express').Router()
const controller = require('../controller/poolGgnBelajarController')
const authentification = require('../middleware/authentification')
const {authorizationGuest} = require('../middleware/authorization')

router.post('/register',authentification,authorizationGuest, controller.register)
router.post('/update/:id',authentification,authorizationGuest,controller.update)
router.delete('/delete',authentification,authorizationGuest,controller.delete)
router.get('/list/:id',authentification,authorizationGuest,controller.list)
router.get('/all',authentification,authorizationGuest,controller.all)
router.post('/screening',authentification,authorizationGuest,controller.screening)
 
module.exports=router