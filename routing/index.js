const router = require('express').Router()
const users = require('./users')
const depresi = require('./depresi')
const kecemasan = require('./kecemasan')
const ggnControlEmosi = require('./ggnControlEmosi')
const ptsd = require('./ptsd')
const ggnBelajar=require('./ggnBelajar')
const srq=require('./srq')

router.use('/users',users)
router.use('/depresi',depresi)
router.use('/kecemasan',kecemasan)
router.use('/ggnControlEmosi',ggnControlEmosi)
router.use('/ptsd',ptsd)
router.use('/ggnBelajar',ggnBelajar)
router.use('/srq',srq)


module.exports=router
