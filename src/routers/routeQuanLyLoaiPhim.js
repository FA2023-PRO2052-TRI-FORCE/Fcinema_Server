const express=require('express');
const router=express.Router();

const qlLoaiPhim=require('../app/controller/quanLyLoaiPhim');

router.get('/quanlyphim/loaiphim',qlLoaiPhim.dsLoaiPhim);
router.post('/quanlyphim/loaiphim/them',qlLoaiPhim.themLoaiPhim);
router.put('/quanlyphim/loaiphim/xoa/:idTheLoai',qlLoaiPhim.xoaLoaiPhim)
router.get('/quanlyphim/loaiphim/capnhat/:idTheLoai',qlLoaiPhim.getCapNhatLoaiPhim)
router.post('/quanlyphim/loaiphim/capnhat/luu/:idTheLoai',qlLoaiPhim.capNhatLoaiPhim)


module.exports=router;