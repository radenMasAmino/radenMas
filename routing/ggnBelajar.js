const router = require('express').Router()
const controller = require('../controller/ggnBelajarController')
const authentification = require('../middleware/authentification')
const {authorizationAdmin} = require('../middleware/authorization')

router.post('/register',authentification,authorizationAdmin, controller.register)
router.post('/update/:id',authentification,authorizationAdmin,controller.update)
router.delete('/delete/:id',authentification,authorizationAdmin,controller.delete)
router.get('/list/:id',authentification,authorizationAdmin,controller.list)
router.get('/all',authentification,controller.all)


module.exports=router