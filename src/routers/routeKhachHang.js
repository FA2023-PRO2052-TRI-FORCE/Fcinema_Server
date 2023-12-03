const express=require('express');
const router=express.Router();

const qlKhachHang=require('../app/controller/quanLyKhachHang');
const authMiddleware=require('../middleware/authMiddleware');

router.get('/khachhang',authMiddleware,qlKhachHang.getListKhachHang)
router.get('/khachhang/:email',authMiddleware,qlKhachHang.getKhachHangByEmail)
router.put('/khachhang/:email',authMiddleware,qlKhachHang.updateTrangThaiKhachHang)




module.exports=router;
