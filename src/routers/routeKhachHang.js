const express=require('express');
const router=express.Router();

const qlKhachHang=require('../app/controller/quanLyKhachHang');


router.get('/khachHang',qlKhachHang.goToScreen)
router.get('/themKhachHang',qlKhachHang.goToAdd)



module.exports=router;
