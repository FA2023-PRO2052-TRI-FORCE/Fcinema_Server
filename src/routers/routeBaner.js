const express=require('express');
const router=express.Router();
const baner=require('../app/controller/quanLyBaner');
const authMiddleware=require('../middleware/authMiddleware');

router.get('/baner',authMiddleware,baner.getAllBaner);
router.post('/baner/them',authMiddleware,baner.insertNewBaner);
router.put('/baner/capnhat/:idBaner',authMiddleware,baner.updateBaner);
router.put('/baner/delete/:idBaner',authMiddleware,baner.deleteBaner);


module.exports=router;