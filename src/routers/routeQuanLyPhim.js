const express=require('express');
const router=express.Router();

const qlPhim=require('../app/controller/quanLyPhim');
const authMiddleware=require('../middleware/authMiddleware');

router.get('/quanlyphim/phim',authMiddleware,qlPhim.getPhims);

router.get('/quanlyphim/phim/them',authMiddleware,qlPhim.getAddNewPhim)
router.post('/quanlyphim/phim/them/luu',authMiddleware,qlPhim.insertNewPhim)
router.put('/quanlyphim/phim/xoa/:idPhim',authMiddleware,qlPhim.deletePhim)
router.get('/quanlyphim/phim/capnhat/:idPhim',authMiddleware,qlPhim.getUpdatePhim)
router.put('/quanlyphim/phim/capnhat/:idPhim',authMiddleware,qlPhim.updatePhim);

module.exports=router;
