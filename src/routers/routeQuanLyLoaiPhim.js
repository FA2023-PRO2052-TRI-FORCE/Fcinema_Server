const express=require('express');
const router=express.Router();

const qlLoaiPhim=require('../app/controller/quanLyLoaiPhim');
const authMiddleware=require('../middleware/authMiddleware');

router.get('/quanlyphim/loaiphim',authMiddleware,qlLoaiPhim.getAllLoaiPhim);
router.post('/quanlyphim/loaiphim/them',authMiddleware,qlLoaiPhim.insertLoaiPhim);

router.put('/quanlyphim/loaiphim/xoa/:idTheLoai',qlLoaiPhim.deleteLoaiPhimByIdLoaiPhim)
router.get('/quanlyphim/loaiphim/capnhat/:idTheLoai',qlLoaiPhim.getLoaiPhimByIdLoaiPhim)
router.post('/quanlyphim/loaiphim/capnhat/luu/:idTheLoai',qlLoaiPhim.updateLoaiPhimByIdLoaiPhim)


module.exports=router;