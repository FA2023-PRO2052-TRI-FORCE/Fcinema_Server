const express=require('express');
const router=express.Router();
const doAn=require('../app/controller/quanLySanPham');
const authMiddleware=require('../middleware/authMiddleware');

router.get('/sanpham',authMiddleware,doAn.getAllSanPham);
router.get('/sanpham/them',authMiddleware,doAn.getThemSanPham);
router.get('/sanpham/:idDoAn',authMiddleware,doAn.getSanPhamById);
router.post('/sanpham/them/luu',authMiddleware,doAn.addNewSanPham);
router.put('/sanpham/capnhat/:idDoAn',authMiddleware,doAn.updateSanPhamById);
router.put('/sanpham/xoa/:idDoAn',authMiddleware,doAn.deleteSanPham)

module.exports=router;