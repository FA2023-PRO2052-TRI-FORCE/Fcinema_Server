const express=require('express');
const router=express.Router();

const qlLoaiPhim=require('../app/controller/quanLyLoaiPhim');
const authMiddleware=require('../middleware/authMiddleware');

router.get('/quanlyphim/loaiphim',authMiddleware,qlLoaiPhim.dsLoaiPhim);
router.get('/quanlyphim/loaiphim/them',authMiddleware,qlLoaiPhim.themLoaiPhim);



module.exports=router;