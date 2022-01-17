const express = require('express')
const cors = require('cors')
const database = require('./config/db')
const consign = require('consign')

const app = express()
app.db = database

app.use(cors())
app.use(express.json())

consign()
    .then('./config/validation.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app)


app.listen(process.env.PORT || 3000, () => {
    console.log('Executando backend...')
})

