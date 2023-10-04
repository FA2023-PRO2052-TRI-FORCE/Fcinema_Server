const express=require('express');
const router=express.Router();

const qlLoaiPhim=require('../app/controller/quanLyLoaiPhim');

router.get('/quanlyphim/loaiphim',qlLoaiPhim.dsLoaiPhim);
router.get('/quanlyphim/loaiphim/them',qlLoaiPhim.themLoaiPhim);



module.exports=router;