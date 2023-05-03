const express = require('express')
var bodyParser = require ('body-parser')
const morgan = require ('morgan');
const cors = require('cors');
require('dotenv').config(); 
const mainRouter = require ('./src/routes/index')
const { response } = require('./src/middleware/common');
const helmet = require ('helmet')
const xss = require('xss-clean')
const port = process.env.PORT || 8080

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.json())
app.use(helmet.crossOriginResourcePolicy({policy:'cross-origin'}))
app.use(xss())


app.use('/',mainRouter)
app.use('/img',express.static('./upload'))
app.post('/artikel', (req,res) =>{
})
app.put('/artikel/:id', (req,res) => {
})
app.delete('/artikel/:id', (req,res) => {
})


app.all('*', (req,res,next) => {
    response (res,404,false,'404 not found')
})

app.listen(port,() => {
    console.log(`Example app listening on port ${port}`)
})
