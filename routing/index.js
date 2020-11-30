const router = require('express').Router()
const users = require('./users')
const penyakit = require('./penyakit')
const kecemasan = require('./kecemasan')

router.use('/users',users)
router.use('/penyakit',penyakit)
router.use('/kecemasan',kecemasan)


module.exports=router
