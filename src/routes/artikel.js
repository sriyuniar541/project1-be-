const express = require('express')
const router = express.Router()
const {ArtikelController} = require('../controller/artikel')
const {protect} = require('../middleware/auth') 
const upload  = require('../middleware/upload') 

 
router.get("/",ArtikelController.getArtikelAll);
router.get("/user",protect,ArtikelController.getArtikelByUser);
router.get("/:id",ArtikelController.getArtikelDetail);
router.post("/",protect,upload.single('bacgroundPhoto'), ArtikelController.insert)
router.put('/:id',protect,upload.single('bacgroundPhoto'),ArtikelController.update)
router.delete('/:id',ArtikelController.delete)


module.exports = router 