const router = require('express').Router()
const users = require('./users')
const depresi = require('./depresi')
const kecemasan = require('./kecemasan')
const ggnControlEmosi = require('./ggnControlEmosi')
const ptsd = require('./ptsd')
const ggnBelajar=require('./ggnBelajar')
const srq=require('./srq')
const poolDepresi=require('./poolDepresi')
const poolKecemasan=require('./poolKecemasan')
const poolPTSD=require('./poolPTSD')
const poolSRQ = require('./poolSRQ')
const poolGgnBelajar=require('./poolGgnBelajar')
const poolGgnControlEmosi=require('./poolGgnControlEmosi')

router.use('/users',users)
router.use('/depresi',depresi)
router.use('/kecemasan',kecemasan)
router.use('/ggnControlEmosi',ggnControlEmosi)
router.use('/ptsd',ptsd)
router.use('/ggnBelajar',ggnBelajar)
router.use('/srq',srq)
router.use('/poolDepresi',poolDepresi)
router.use('/poolKecemasan',poolKecemasan)
router.use('/poolPTSD',poolPTSD)
router.use('/poolSRQ',poolSRQ)
router.use('/poolGgnBelajar',poolGgnBelajar)
router.use('/poolGgnControlEmosi',poolGgnControlEmosi)


module.exports=router
