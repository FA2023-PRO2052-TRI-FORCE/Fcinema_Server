const express=require('express');
const router=express.Router();

const qlLoaiPhim=require('../app/controller/quanLyLoaiPhim');
const authMiddleware=require('../middleware/authMiddleware');

router.get('/quanlyphim/loaiphim',authMiddleware,qlLoaiPhim.dsLoaiPhim);
router.get('/quanlyphim/loaiphim/them',authMiddleware,qlLoaiPhim.themLoaiPhim);

router.put('/quanlyphim/loaiphim/xoa/:idTheLoai',qlLoaiPhim.xoaLoaiPhim)
router.get('/quanlyphim/loaiphim/capnhat/:idTheLoai',qlLoaiPhim.getCapNhatLoaiPhim)
router.post('/quanlyphim/loaiphim/capnhat/luu/:idTheLoai',qlLoaiPhim.capNhatLoaiPhim)


module.exports=router;