const express=require('express');
const router=express.Router();
const baner=require('../app/controller/banerController');
const authMiddleware=require('../middleware/authMiddleware');

router.get('/baner',authMiddleware,baner.getAllBaner);
router.post('/baner/them',authMiddleware,baner.insertNewBaner);
router.put('/baner/capnhat/:idBaner',authMiddleware,baner.updateBaner);
router.put('/baner/delete/:idBaner',authMiddleware,baner.deleteBaner);

// App
router.get('/app/baners',baner.getBaners);


module.exports=router;