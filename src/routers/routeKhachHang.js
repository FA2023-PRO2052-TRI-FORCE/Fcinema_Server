const express=require('express');
const router=express.Router();

const qlKhachHang=require('../app/controller/quanLyKhachHang');


router.get('/khachhang',qlKhachHang.getAllKhachHang)
router.get('/khachhang/:email',qlKhachHang.getKhachHangByEmail)




module.exports=router;
