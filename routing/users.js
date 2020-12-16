const router = require('express').Router()
const controller = require('../controller/usersController')
const authentification = require('../middleware/authentification')



router.post('/register', controller.register)
router.post('/login',controller.login)
router.post('/update/:id',authentification,controller.update)
router.get('/list/:id',authentification,controller.list)
router.get('/all',authentification,controller.all)
router.delete('/delete/:id',authentification,controller.delete)
router.get('/jawabanKecemasan/:id',authentification,controller.jawabanKecemasan)
router.get('/jawabanDepresi/:id',authentification,controller.jawabanDepresi)
router.get('/jawabanPTSD/:id',authentification,controller.jawabanPTSD)
router.get('/jawabanSRQ/:id',authentification,controller.jawabanSRQ)
router.get('/jawabanGgnBelajar/:id',authentification,controller.jawabanGgnBelajar)
router.get('/jawabanGgnControlEmosi/:id',authentification,controller.jawabanGgnControlEmosi)
module.exports=router