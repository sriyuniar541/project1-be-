const express = require('express')
const router = express.Router()
const UsersRouter = require('../routes/users')
const ProductRouter = require('./artikel')


router
.use('/users',UsersRouter)
.use('/artikel',ProductRouter)


module.exports = router