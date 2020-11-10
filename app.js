const express = require('express')
const morgan = require('morgan')
const routing = require('./routing/index')
const cors = require('cors')
const app = express()

app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.use('/', routing)

const port = 3000
app.listen(port, () => {
  console.log(`telah tersambung pada port : ${port}`)
})
