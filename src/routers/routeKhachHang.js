const express=require('express');
const router=express.Router();

const qlKhachHang=require('../app/controller/quanLyKhachHang');


router.get('/khachHang',qlKhachHang.goToScreen)
router.get('/themKhachHang',qlKhachHang.goToAdd)
router.get('/back/khachHang',qlKhachHang.goToList)



module.exports=router;
