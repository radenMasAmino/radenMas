const router = require('express').Router()
const controller = require('../controller/penyakitController')
const authentification = require('../middleware/authentification')

router.post('/register',authentification, controller.register)
router.get('/list/:id',controller.list)
router.get('/all',controller.all)

module.exports=router