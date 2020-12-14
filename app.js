const express = require('express')
const morgan = require('morgan')
const routing = require('./routing/index')
const cors = require('cors')
const app = express()
const passport = require('passport')

app.use(passport.initialize());
app.use(passport.session());
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.use('/', routing)

const port = 8805
app.listen(port, () => {
  console.log(`telah tersambung pada port : ${port}`)
})
