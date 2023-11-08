const express=require('express');
const router=express.Router();
const doAn=require('../app/controller/quanLyDoAn');
const authMiddleware=require('../middleware/authMiddleware');

router.get('/doan',authMiddleware,doAn.getAllDoAn);
router.get('/doan/them',authMiddleware,doAn.getThemDoAn);
router.get('/doan/:idDoAn',authMiddleware,doAn.getDoAnById);
router.post('/doan/them/luu',authMiddleware,doAn.addNewDoAn);
router.put('/doan/capnhat/:idDoAn',authMiddleware,doAn.updateDoAnById);
router.put('/doan/xoa/:idDoAn',authMiddleware,doAn.deleteDoAn)

module.exports=router;