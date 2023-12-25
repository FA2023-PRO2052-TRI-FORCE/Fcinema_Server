const express=require('express');
const router=express.Router();

const genre=require('../app/controller/genreController');
const authMiddleware=require('../middleware/authMiddleware');

router.get('/quanlyphim/loaiphim',authMiddleware,genre.getAllLoaiPhim);
router.post('/quanlyphim/loaiphim/them',authMiddleware,genre.insertLoaiPhim);

router.put('/quanlyphim/loaiphim/xoa/:idTheLoai',genre.deleteLoaiPhimByIdLoaiPhim)
router.get('/quanlyphim/loaiphim/capnhat/:idTheLoai',genre.getLoaiPhimByIdLoaiPhim)
router.post('/quanlyphim/loaiphim/capnhat/luu/:idTheLoai',genre.updateLoaiPhimByIdLoaiPhim)


module.exports=router;