const router = require('express').Router()
const controller = require('../controller/kecemasanController')
// const authentification = require('../middleware/authentification')

router.post('/register', controller.register)
router.get('/list/:id',controller.list)
router.get('/all',controller.all)
router.post('/edit/:id',controller.update)
router.delete('/delete/:id',controller.delete)

module.exports=router