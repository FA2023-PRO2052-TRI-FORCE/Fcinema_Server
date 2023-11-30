const express=require('express');
const router=express.Router();

const qlKhachHang=require('../app/controller/quanLyKhachHang');

router.get('/khachhang',qlKhachHang.getListKhachHang)
router.get('/khachhang/:email',qlKhachHang.getKhachHangByEmail)
router.put('/khachhang/:email',qlKhachHang.updateTrangThaiKhachHang)




module.exports=router;
