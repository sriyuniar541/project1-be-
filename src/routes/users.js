const express = require('express')
const router = express.Router()
const {UsersController}= require('./../controller/users')
const upload  = require('../middleware/upload') 
const {protect} = require('../middleware/auth') 
const multer = require('multer')
const uploade = multer()


router.post('/register',upload.single('photo'),UsersController.insert)
router.post('/login',uploade.array(''),UsersController.login)
router.get('/',protect,UsersController.getUser) 

module.exports = router