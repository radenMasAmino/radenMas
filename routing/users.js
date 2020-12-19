const router = require('express').Router()
const controller = require('../controller/usersController')
const authentification = require('../middleware/authentification')
const { authorizationAdmin } = require('../middleware/authorization')



router.post('/register', controller.register)
router.post('/login',controller.login)
router.post('/update',authentification,controller.update)
router.get('/profil',authentification,controller.profil)
router.get('/profilByAdmin/:id',authentification,authorizationAdmin,controller.profilByAdmin)
router.get('/all',authentification,controller.all)
// router.delete('/delete/:id',authentification,controller.delete)
router.get('/jawabanKecemasan',authentification,controller.jawabanKecemasan)
router.get('/jawabanDepresi',authentification,controller.jawabanDepresi)
router.get('/jawabanPTSD',authentification,controller.jawabanPTSD)
router.get('/jawabanSRQ',authentification,controller.jawabanSRQ)
router.get('/jawabanGgnBelajar',authentification,controller.jawabanGgnBelajar)
router.get('/jawabanGgnControlEmosi',authentification,controller.jawabanGgnControlEmosi)
module.exports=router