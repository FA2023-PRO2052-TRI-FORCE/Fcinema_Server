const express=require('express');
const router=express.Router();
const popcorn=require('../app/controller/popcornController');
const authMiddleware=require('../middleware/authMiddleware');

router.get('/sanpham',authMiddleware,popcorn.getAllSanPham);
router.get('/sanpham/them',authMiddleware,popcorn.getThemSanPham);
router.get('/sanpham/:idDoAn',authMiddleware,popcorn.getSanPhamById);
router.post('/sanpham/them/luu',authMiddleware,popcorn.insertNewSanPham);
router.put('/sanpham/capnhat/:idDoAn',authMiddleware,popcorn.updateSanPhamById);
router.put('/sanpham/xoa/:idDoAn',authMiddleware,popcorn.deleteSanPham)

module.exports=router;