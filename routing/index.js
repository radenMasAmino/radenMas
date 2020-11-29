const router = require('express').Router()
const users = require('./users')
const penyakit = require('./penyakit')

router.use('/users',users)
router.use('/penyakit',penyakit)


module.exports=router
